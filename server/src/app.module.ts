import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThongtinModule } from './app/thongtin/thongtin.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { PhimModule } from './app/phim/phim.module';
import { BDModule } from './app/bd/bd.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === 'dev',
    }),
    ThongtinModule,
    PhimModule,BDModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
