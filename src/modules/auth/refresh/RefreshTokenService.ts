import { verify } from "jsonwebtoken";

import { User } from './../../users/entities/User';
import { AppDataSource } from './../../../data-source';
import { AppError } from './../../../errors/AppError';
import { Auth, Tokens } from "../Auth";


export class RefreshTokenService {
  async execute(refresh_token: string): Promise<Tokens | AppError>{
    const result = Auth.validRefreshToken(refresh_token);
    
    if(result instanceof AppError) {
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

    // Check if it's necessary update the refresh token (after 12h it's good generate a new refresh token)
    const timeAfter12h = Math.floor(Date.now() / 1000) + (60 * 60 * 12);

    if (timeAfter12h > result.exp) {
      const new_refresh_token = Auth.generateRefreshToken(user.id);

      return { access_token, refresh_token: new_refresh_token };
    }
    
    return { access_token, refresh_token };
  }
}