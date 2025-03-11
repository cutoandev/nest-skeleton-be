import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas';
import { BaseRepository } from './_base.repository';
import { Model } from 'mongoose';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
