import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IService } from './interfaces';
import { I18nService } from 'nestjs-i18n';
import { MappingModel } from 'src/common/helpers';

export class BaseService<T> implements IService<T> {
  /**
   *
   */
  constructor(
    private readonly baseModel: Model<T>,
    protected readonly i18n: I18nService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(model: T): Promise<T> {
    try {
      const newUser = new this.baseModel(model);
      await newUser.save();
      return newUser;
    } catch (e) {
      throw e;
    }
  }
  async update(modelId: string, model: T): Promise<T> {
    try {
      let updateModel = await this.baseModel.findById(modelId).exec();
      if (!updateModel) {
        throw new NotFoundException(
          await this.i18n.translate('common.notFoundData'),
        );
      }
      updateModel = MappingModel(updateModel, model);
      await updateModel?.save();
      return updateModel as T;
    } catch (e) {
      throw e;
    }
  }
  async delete(modelId: string): Promise<boolean> {
    try {
      const result = await this.baseModel.findByIdAndDelete(modelId).exec();
      if (!result) {
        throw new NotFoundException(
          await this.i18n.translate('common.notFoundData'),
        );
      }

      if (result.$isDeleted()) {
        return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
  async findOne(propId: string): Promise<T> {
    let model;
    try {
      model = await this.baseModel.findById(propId).exec();
    } catch (error) {
      throw new NotFoundException(
        await this.i18n.translate('common.notFoundData'),
      );
    }
    if (!model) {
      throw new NotFoundException(
        await this.i18n.translate('common.notFoundData'),
      );
    }
    return model;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(locale?: string): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}
