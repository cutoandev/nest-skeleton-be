import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { User } from 'src/core/schemas';
import { BaseService } from 'src/core/services';

@Injectable()
export class UserService extends BaseService<User> {
  /**
   *
   */
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    protected readonly i18n: I18nService,
  ) {
    super(userModel, i18n);
  }

  // Example for extend method
  async bulkCreate(data: User[]): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
