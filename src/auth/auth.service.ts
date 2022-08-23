import { NewUserDTO } from './../users/dtos/new-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/users/interface/user-details.interface';
import { loginUserDTO } from 'src/users/dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {

  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | string> {
    const { username, fullname, email, password, birthdate } = user;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) throw new NotAcceptableException('User already exists!')

    const hashedPassword = await this.__hashPassword(password);
    const newUser = await this.userService.create(username, fullname, email, hashedPassword, birthdate);

    console.log(newUser);


    return this.userService._getUserDetails(newUser);
  }


  async login(user: Readonly<loginUserDTO>): Promise<any> {

    const existingUser = await this.__validateUser(user.email, user.password);

    if (!existingUser) throw new NotFoundException('Email or password incorrect');

    const jwt = await this.jwtService.signAsync({ id: existingUser.id, roles: existingUser.roles })

    return {
      token: jwt
    };
  }


  //#region internal functions

  private async __hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 11);
  }

  private async __validateUser(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser && this.__checkPassword(password, existingUser.password)) {
      return this.userService._getUserDetails(existingUser);
    }

    return null;
  }

  private async __checkPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword).then(
      (result) => result
    );
  }

  //#endregion

}
