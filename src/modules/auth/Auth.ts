import { JsonWebTokenError, NotBeforeError, sign, TokenExpiredError, verify } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";

interface AccessToken {
  id: number;
  name: string;
  email: string;
  cpf_cnpj: string;
  cellphone: string;
  type: string;
}

interface MigrateUserToken {
  cpf_cnpj: string;
  email: string;
}

interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface DecodedAccessToken {
  user: {
    id: number;
    name: string;
    email: string;
    cpf_cnpj: string;
    type: string;
    cellphone: string;
  }
  exp: number;
}

interface DecodedRefreshToken {
  user_id: number;
  exp: number;
}

interface DecodedResetPassword {
  user_id: number;
}

interface DecodedMigrateUser {
  cpf_cnpj: string;
  email: string;
}

const KEY_ACCESS_TOKEN = "24176e3fc59c20fba3764d244f7f7324";
const KEY_REFRESH_TOKEN = "5AUZo0jaoziuUsZTBzC3on2Z5Lzt9tFv";
const KEY_RESET_PASSWORD_TOKEN = "xKtWDf5mqRUc3Xa0TzncppiHpobHPdog";
const KEY_MIGRATE_USER_TOKEN = "RVXA1qf8nPZIXbTkqKCHpTLjFgk7Ys5y";

function decodToken(token: string, key_token: string, name_token: string) {
  if (!token) {
    return new AppError("Token is necessary!");
  }

  try {
    const decoded = verify(token, key_token);

    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
      return new AppError(error.name, 401, name_token);
    }

    return new AppError("Access Token error", 401, name_token);
  }
}


const Auth = {
  generateAccessToken: ({ id, name, email, cpf_cnpj, cellphone, type }: AccessToken): string => {
    const access_token = sign({
      user: {
        id, name, email, cpf_cnpj, cellphone, type
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 15)
    }, KEY_ACCESS_TOKEN);

    return access_token;
  },
  generateRefreshToken: (user_id: number): string => {
    const refresh_token = sign({
      user_id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, KEY_REFRESH_TOKEN); 

    return refresh_token;
  },
  generateResetPasswordToken: (user_id: number): string => {
    const reset_password_token = sign({ user_id, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, KEY_RESET_PASSWORD_TOKEN);

    return reset_password_token;
  },
  generateMigrateUserToken: ({ cpf_cnpj, email }: MigrateUserToken): string => {
    const migrate_user_token = sign({ cpf_cnpj, email, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, KEY_MIGRATE_USER_TOKEN);

    return migrate_user_token;
  },
  generateTokens: ({ id, name, email, cpf_cnpj, cellphone, type }: AccessToken): Tokens => {
    const access_token = Auth.generateAccessToken({ id, name, email, cpf_cnpj, cellphone, type });
    const refresh_token = Auth.generateRefreshToken(id);

    return { access_token, refresh_token };
  },
  validAccessToken: (access_token: string): AppError | DecodedAccessToken => {
    const result = decodToken(access_token, KEY_ACCESS_TOKEN, 'access_token');

    if(result instanceof AppError) {
      return result;
    }

    const decoded = result as DecodedAccessToken;

    if (!decoded.user.id) {
      return new AppError("User not exists at token!", 401);
    }

    return decoded;
  },
  validRefreshToken: (refresh_token: string): AppError | DecodedRefreshToken => {
    const result = decodToken(refresh_token, KEY_REFRESH_TOKEN, 'refresh_token');

    if (result instanceof AppError) {
      return result;
    }

    const decoded = result as DecodedRefreshToken;

    if (!decoded.user_id) {
      return new AppError("User not exists at token!", 401);
    }

    return decoded;
  },
  validResetPasswordToken: (reset_password_token: string): DecodedResetPassword | AppError => {
    const result = decodToken(reset_password_token, KEY_RESET_PASSWORD_TOKEN, 'reset_token');

    if (result instanceof AppError) {
      return new AppError(result.message);
    }

    const decoded = result as DecodedResetPassword;

    if (!decoded.user_id) {
      return new AppError("User not exists at token!");
    }

    return decoded;
  },
  validMigrateUserToken: (migrate_user_token: string): DecodedMigrateUser | AppError => {
    const result = decodToken(migrate_user_token, KEY_MIGRATE_USER_TOKEN, 'migrate_token');

    if (result instanceof AppError) {
      return new AppError(result.message);
    }

    const decoded = result as DecodedMigrateUser;

    if (!decoded.cpf_cnpj || !decoded.email) {
      return new AppError("Token invalid!");
    }
  },
  nearToExpired: (expiration: number): boolean => {
    const actualTime = Math.floor(Date.now() / 1000) + (60 * 60 * 12);

    return expiration < actualTime;
  }
}

export { Auth, Tokens, AccessToken };

