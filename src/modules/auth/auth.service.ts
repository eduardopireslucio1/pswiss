import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await this.usersService.create(name, email, hashedPassword);

    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    console.log({ email, password, userPassword: user.password });

    const isMatch = bcrypt.compareSync(password, user.password);

    console.log({ isMatch });

    if (!isMatch) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
