import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import { Role } from 'src/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  fullname: string;

  @Prop({required: true})
  birthdate: Date;

  @Prop({required: true, unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User);
