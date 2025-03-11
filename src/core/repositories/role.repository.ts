import { InjectModel } from '@nestjs/mongoose';
import { UserRole, UserRoleDocument } from '../schemas';
import { BaseRepository } from './_base.repository';
import { Model } from 'mongoose';

export class UserRoleRepository extends BaseRepository<UserRoleDocument> {
  constructor(
    @InjectModel(UserRole.name)
    private readonly roleModel: Model<UserRoleDocument>,
  ) {
    super(roleModel);
  }
}
