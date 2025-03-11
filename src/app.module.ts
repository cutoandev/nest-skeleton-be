import 'dotenv/config';
import { Module } from '@nestjs/common';
import { I18nModule, HeaderResolver, I18nService } from 'nestjs-i18n';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'vn',
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [new HeaderResolver(['x-locale'])],
    }),
    CoreModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [I18nService, AppService],
})
export class AppModule {}
