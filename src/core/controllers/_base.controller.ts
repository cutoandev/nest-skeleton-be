import {
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { IController } from './interfaces';
import { IService } from '../services/interfaces';

export class BaseController<T> implements IController<T> {
  /**
   *
   */
  constructor(private readonly baseService: IService<T>) {}
  @Get(':id')
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const modelId = req.params?.id;
      const result = await this.baseService.findOne(modelId);
      res.status(HttpStatus.OK).json(result).send();
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e).send();
    }
  }

  @Post()
  async create(@Body() model: T, @Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.baseService.create(model);
      res.status(HttpStatus.CREATED).json(result).send();
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e).send();
    }
  }

  @Patch(':id')
  async update(@Body() model: T, @Req() req: Request, @Res() res: Response) {
    try {
      const modelId = req.params?.id;
      const result = await this.baseService.update(modelId, model);
      res.status(HttpStatus.ACCEPTED).json(result).send();
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e).send();
    }
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const modelId = req.params?.id;
      const result = await this.baseService.delete(modelId);
      res.status(HttpStatus.OK).json(result).send();
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e).send();
    }
  }
}
