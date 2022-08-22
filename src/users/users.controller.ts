import { Controller, Get, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/enums/role.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard('loggedIn'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard('loggedIn'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('username') newUsername: string,
    @Body('fullname') newFullname: string,
    @Body('email') newEmail: string,
    @Body('password') newPassword: string,
    @Body('birthdate') newBirthdate: Date,
    @Body('roles') newRoles: Role[],
  ) {
    return this.usersService.update(id, newUsername, newFullname, newBirthdate, newEmail, newPassword, newRoles);
  }

  @UseGuards(AuthGuard('loggedIn'))
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
