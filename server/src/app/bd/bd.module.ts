import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BD } from './../../entities/bd.entity';
import { ThongtinModule } from './../thongtin/thongtin.module';
import { BDController } from './bd.controller';
import { BDService } from './bd.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BD
    ]),
    ThongtinModule,
  ],
  providers: [BDService],
  controllers: [BDController],
})
export class BDModule {}
