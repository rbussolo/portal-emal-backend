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
  id: number;
  name: string;
  email: string;
  cpf_cnpj: string;
  type: string;
  cellphone: string;
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
    if (!access_token) {
      return new AppError("Access token not found!");
    }

    try {
      const decoded = verify(access_token, KEY_ACCESS_TOKEN) as DecodedAccessToken;

      if (!decoded.id) {
        return new AppError("User not exists at token!", 401);
      }

      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        return new AppError(error.name, 401);
      }

      return new AppError("Access Token error", 401);
    }
  },
  validRefreshToken: (refresh_token: string): AppError | DecodedRefreshToken => {
    if (!refresh_token) {
      return new AppError("Refresh token not found!");
    }

    try {
      const decoded = verify(refresh_token, KEY_REFRESH_TOKEN) as DecodedRefreshToken;

      if (!decoded.user_id) {
        return new AppError("User not exists at token!", 401);
      }

      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        return new AppError(error.name, 401);
      }

      return new AppError("Refresh Token error", 401);
    }
  },
  validResetPasswordToken: (reset_password_token: string): DecodedResetPassword | AppError => {
    if (!reset_password_token) {
      return new AppError("Token not found!");
    }

    try {
      const decoded = verify(reset_password_token, KEY_RESET_PASSWORD_TOKEN) as DecodedResetPassword;

      if (!decoded.user_id) {
        return new AppError("User not exists at token!", 401);
      }

      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        return new AppError(error.name, 401);
      }

      return new AppError("Refresh Token error", 401);
    }
  },
  validMigrateUserToken: (migrate_user_token: string): DecodedMigrateUser | AppError => {
    if (!migrate_user_token) {
      return new AppError("Token not found!");
    }

    try {
      const decoded = verify(migrate_user_token, KEY_MIGRATE_USER_TOKEN) as DecodedMigrateUser;

      if (!decoded.cpf_cnpj || !decoded.email) {
        return new AppError("Token invalid!", 401);
      }

      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
        return new AppError(error.name, 401);
      }

      return new AppError("Refresh Token error", 401);
    }
  }
}

export { Auth, Tokens, AccessToken };

