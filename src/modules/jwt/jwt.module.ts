import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [JwtModule],
  exports: [JwtModule],
})
export class JWTModule {}
