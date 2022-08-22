import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type SportDocument = Sport & Document;

export class Sport {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}
