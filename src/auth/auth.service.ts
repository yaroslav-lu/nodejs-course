import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOneByLogin(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authUserDto: AuthUserDto) {
    const payload = { login: authUserDto.login, sub: authUserDto.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
