import { Role } from 'src/enums/role.enum';
import { UserDetails } from './interface/user-details.interface';
import { UserDocument } from './entities/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) { }

  async create(
    username: string,
    fullname: string,
    email: string,
    hashedPassword: string,
    birthdate: Date
  ): Promise<UserDocument> {

    const newUser = new this.userModel(
      { username, fullname, email, password: hashedPassword, birthdate }
    )

    return await newUser.save();
  }

  async update(id: string,
    newUsername: string,
    newFullname: string,
    newBirthdate: Date,
    newEmail: string,
    newPassword: string,
    newRoles: Role[],
  ) {
    const user = await this.userModel.findByIdAndUpdate(id, {
      username: newUsername,
      fullname: newFullname,
      birthdate: newBirthdate,
      email: newEmail,
      password: newPassword,
      roles: newRoles,
    }, {new: true});

    return await this._getUserDetails(user);
  }

  remove(id: string) {
    return this.userModel.deleteOne(
      this.userModel.findById(id)
    );
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) return null;
    return await this._getUserDetails(user);
  }

  async _getUserDetails(user: UserDocument): Promise<UserDetails> {
    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      birthdate: user.birthdate,
      email: user.email,
      roles: user.roles
    }
  }

  async _isAdmin(id: string) {
    return (await this.findById(id)).roles.includes(Role.Admin);
  }
}
