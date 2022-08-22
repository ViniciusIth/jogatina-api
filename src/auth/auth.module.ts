import { JwtGuard } from './guards/jwt.guard';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { config } from "dotenv";
config();

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({useFactory: () => ({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRATION
      }
    })})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy]
})
export class AuthModule {}
