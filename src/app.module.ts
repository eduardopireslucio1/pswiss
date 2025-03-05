import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthService } from './modules/auth/auth.service';
import { ClientController } from './modules/client/client.controller';
import { ClientService } from './modules/client/client.service';
import { ClientModule } from './modules/client/client.module';
import { Client } from './entities/client';
import { Product } from './entities/product';
import { ProductController } from './modules/product/product.controller';
import { ProductService } from './modules/product/product.service';
import { OrderModule } from './modules/order/order.module';
import { Order } from './entities/order';
import { OrderController } from './modules/order/order.controller';
import { OrderService } from './modules/order/order.service';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [User, Client, Product, Order],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Client, Product, Order]),
    AuthModule,
    UsersModule,
    ClientModule,
    OrderModule,
  ],
  controllers: [
    AuthController,
    ClientController,
    ProductController,
    OrderController,
  ],
  providers: [AuthService, ClientService, ProductService, OrderService],
})
export class AppModule {}
