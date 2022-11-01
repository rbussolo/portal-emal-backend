import { User } from './../../users/entities/User';
import { AppDataSource } from './../../../data-source';
import { AppError } from './../../../errors/AppError';
import { Auth, Tokens } from "../Auth";


export class RefreshTokenService {
  async execute(refresh_token: string): Promise<Tokens | AppError>{
    const result = Auth.validRefreshToken(refresh_token);
    
    if (result instanceof AppError) {
      return result;
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: result.user_id } });
    
    const access_token = Auth.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf_cnpj: user.cpf_cnpj,
      cellphone: user.cellphone,
      type: user.type
    });

    const nearToExpired = Auth.nearToExpired(result.exp);

    if (nearToExpired) {
      refresh_token = Auth.generateRefreshToken(user.id);
    }
    
    return { access_token, refresh_token };
  }
}