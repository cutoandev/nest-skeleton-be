import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, select: false })
  password: string;

  @Prop({ default: null })
  profileImage: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ type: Date, default: null })
  lastLogin: Date;

  @Prop({
    default: 'new',
  })
  role: string;

  @Prop({ default: null, select: false })
  twoFactorSecret?: string;

  @Prop({ default: false })
  isTwoFactorEnabled: boolean;

  @Prop({
    type: [{ credentialId: String, publicKey: String, transports: [String] }],
    default: [],
  })
  passkeys: { credentialId: string; publicKey: string; transports: string[] }[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
