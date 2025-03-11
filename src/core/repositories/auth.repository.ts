import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schemas';
import { BaseRepository } from './_base.repository';
import { Model } from 'mongoose';

export class AuthRepository extends BaseRepository<AuthDocument> {
  constructor(
    @InjectModel(Auth.name) private readonly baseModel: Model<AuthDocument>,
  ) {
    super(baseModel);
  }
}
