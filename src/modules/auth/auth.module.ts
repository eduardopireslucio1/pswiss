import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
