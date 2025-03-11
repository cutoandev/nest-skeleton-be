import { MongooseModule } from '@nestjs/mongoose';

// App imports
import dbConfig from '../../config/database.config';
import {
  Auth,
  AuthSchema,
  User,
  UserRole,
  UserRoleSchema,
  UserSchema,
} from '../schemas';
import { DynamicModule, Provider } from '@nestjs/common';
import { UserRepository, UserRoleRepository } from '../repositories';
import { AuthRepository } from '../repositories/auth.repository';

export const databaseProviders: DynamicModule[] = [
  MongooseModule.forRoot(dbConfig.getDBUrl()),
  MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Auth.name, schema: AuthSchema },
    { name: UserRole.name, schema: UserRoleSchema },
  ]),
];

export const databaseRepositoryProviders: Provider[] = [
  UserRepository,
  AuthRepository,
  UserRoleRepository,
];
