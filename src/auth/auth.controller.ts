import { loginUserDTO } from 'src/users/dtos/login-user.dto';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDetails } from 'src/users/interface/user-details.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() user: NewUserDTO): Promise<UserDetails | string> {
    return this.auth.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: loginUserDTO): Promise<{ user: UserDetails, token: string } | string> {
    return this.auth.login(user);
  }
}
