import { Phim_tuongtu } from './../../entities/phim_tuongtu';
import { ERROR } from './../../../constants';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Dienvien } from './../../entities/dienvien.entity';
import { Phim } from './../../entities/phim.entity';
import { Phim_dienvien } from './../../entities/phim_dienvien';
import { Phim_linkstream } from './../../entities/phim_linkstream';
import { Phim_theloai } from './../../entities/phim_theloai.entity';
import { Phim_tv_season } from './../../entities/phim_tv_season';
import { Phim_tv_season_episode } from './../../entities/phim_tv_season_episode';
import { ThongtinService } from './../thongtin/thongtin.service';
import { getImageURL } from 'src/utils/tmdb';

@Injectable()
export class GetPhimService {
  constructor(
    @InjectRepository(Phim)
    private phimRepository: Repository<Phim>,
    @InjectRepository(Phim_theloai)
    private phim_theloaiRepository: Repository<Phim_theloai>,
    @InjectRepository(Dienvien)
    private dienvienRepository: Repository<Dienvien>,
    @InjectRepository(Phim_dienvien)
    private phim_dienvienRepository: Repository<Phim_dienvien>,
    @InjectRepository(Phim_tv_season)
    private phim_seasonRepository: Repository<Phim_tv_season>,
    @InjectRepository(Phim_tv_season_episode)
    private phim_season_episodeRepository: Repository<Phim_tv_season_episode>,
    @InjectRepository(Phim_linkstream)
    private phim_linkstreamRepository: Repository<Phim_linkstream>,
    @InjectRepository(Phim_tuongtu)
    private phim_tuongtuRepository: Repository<Phim_tuongtu>,
    private thongtinService: ThongtinService,
    private dataSource: DataSource,
  ) {}
  async get_phim(id_phim: number) {
    const phim = await this.phimRepository
      .createQueryBuilder('phim')
      .leftJoinAndSelect('phim.quocgia', 'quocgia')
      .leftJoinAndSelect('phim.loaiphim', 'loaiphim')
      .where('phim.id = :id', { id: id_phim })
      .getOne();
    if (!phim) {
      throw new BadRequestException(
        ERROR.PHIM.NOT_EXIST.msg,
        ERROR.PHIM.NOT_EXIST.code,
      );
    }
    phim.background = getImageURL(phim.background, 'backdrop');
    phim.avatar = getImageURL(phim.avatar, 'poster');
    const dienvien = await this.phim_dienvienRepository
      .createQueryBuilder('phim_dienvien')
      .leftJoinAndSelect('phim_dienvien.dienvien', 'dienvien')
      .where('phim_dienvien.phim = :id', { id: id_phim })
      .getMany();
    dienvien.map((v, i) => {
      dienvien[i].dienvien.profile_path = getImageURL(
        dienvien[i].dienvien.profile_path,
        'profile_dienvien_movie',
      );
    });
    const theloai = await this.phim_theloaiRepository
      .createQueryBuilder('phim_theloai')
      .leftJoinAndSelect('phim_theloai.theloai', 'theloai')
      .where('phim_theloai.phim = :id', { id: id_phim })
      .getMany();
    const linkstream = await this.phim_linkstreamRepository
      .createQueryBuilder('a')
      .where('a.phim = :id', { id: id_phim })
      .getOne();
    // const tuongtu = await this.phim_tuongtuRepository
    //   .createQueryBuilder('phim_tuongtu')
    //   .where('phim_tuongtu.phim = :id', { id: id_phim })
    //   .getMany();
    return { phim, dienvien, theloai, linkstream };
  }
  async get_phim_movie_home(num_page: number = 0) {
    const phim = await this.phimRepository
      .createQueryBuilder('phim')
      // .select('phim.')
      .where('phim.tmdb_type = :tmdb_type', { tmdb_type: 'movie' })
      .limit(20)
      .offset(num_page)
      .getMany();
    return { phim };
  }
  async get_phim_tv_home(num_page: number = 0) {
    const phim = await this.phimRepository
      .createQueryBuilder('phim')
      // .select('phim.')
      .where('phim.tmdb_type = :tmdb_type', { tmdb_type: 'tv' })
      .limit(20)
      .offset(num_page)
      .getMany();
    return { phim };
  }
}
