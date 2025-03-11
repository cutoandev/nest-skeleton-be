import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserRole {
  @Prop({ required: true, unique: true })
  roleName: string;

  @Prop({ required: true, default: 'xxx' })
  permissions: string;
}

export type UserRoleDocument = UserRole & Document;
export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
