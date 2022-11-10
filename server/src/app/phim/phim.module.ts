import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dienvien } from './../../entities/dienvien.entity';
import { Phim } from './../../entities/phim.entity';
import { Phim_dienvien } from './../../entities/phim_dienvien';
import { Phim_linkstream } from './../../entities/phim_linkstream';
import { Phim_theloai } from './../../entities/phim_theloai.entity';
import { Phim_tuongtu } from './../../entities/phim_tuongtu';
import { Phim_tv_season } from './../../entities/phim_tv_season';
import { Phim_tv_season_episode } from './../../entities/phim_tv_season_episode';
import { ThongtinModule } from './../thongtin/thongtin.module';
import { GetPhimService } from './get-phim.service';
import { PhimController } from './phim.controller';
import { PhimService } from './phim.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Phim,
      Dienvien,
      Phim_dienvien,
      Phim_theloai,
      Phim_tuongtu,
      Phim_tv_season,
      Phim_tv_season_episode,
      Phim_linkstream,
    ]),
    ThongtinModule,
  ],
  providers: [PhimService, GetPhimService],
  controllers: [PhimController],
})
export class PhimModule {}
