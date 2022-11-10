import { Loaiphim } from './../../entities/loaiphim.entity';
import { Quocgia } from './../../entities/quocgia.entity';
import { Module } from '@nestjs/common';
import { ThongtinService } from './thongtin.service';
import { ThongtinController } from './thongtin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theloai } from 'src/entities/theloai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theloai, Quocgia, Loaiphim])],
  providers: [ThongtinService],
  controllers: [ThongtinController],
  exports: [ThongtinService],
})
export class ThongtinModule {}
