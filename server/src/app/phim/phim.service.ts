import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getYear } from 'date-fns';
import {
  tmdb_get_movie,
  tmdb_get_movie_tv_dienvien,
  tmdb_get_movie_tv_tuongtu,
  tmdb_get_tv,
  tmdb_get_tv_season_episode,
} from 'src/utils/tmdb';
import {
  DataSource,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
} from 'typeorm';
import { limit_so_luong_dv } from './../../../config';
import { ERROR } from './../../../constants';
import { Dienvien } from './../../entities/dienvien.entity';
import { Loaiphim } from './../../entities/loaiphim.entity';
import { Phim } from './../../entities/phim.entity';
import { Phim_dienvien } from './../../entities/phim_dienvien';
import { Phim_linkstream } from './../../entities/phim_linkstream';
import { Phim_theloai } from './../../entities/phim_theloai.entity';
import { Phim_tuongtu } from './../../entities/phim_tuongtu';
import { Phim_tv_season } from './../../entities/phim_tv_season';
import { Phim_tv_season_episode } from './../../entities/phim_tv_season_episode';
import { Quocgia } from './../../entities/quocgia.entity';
import { Theloai } from './../../entities/theloai.entity';
import { isNullUndefined, stringToDate } from './../../utils/util';
import { ThongtinService } from './../thongtin/thongtin.service';
import { addLinkstreamInput, addPhimInput, findPhimInput } from './phim.dto';

@Injectable()
export class PhimService {
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
  convert_where_phim(input?: findPhimInput) {
    const where_query: FindOptionsWhere<Phim> = {};
    if (input) {
      const { id, ten } = input || {};
      if (id) where_query.id = id;
      if (ten) where_query.ten = ten;
    }
    return where_query;
  }
  async find_phim(input?: findPhimInput) {
    const where = this.convert_where_phim(input);
    return this.phimRepository.find({ where });
  }

  async add_phim(input?: addPhimInput) {
    const { tmdb_id, type } = input;
    //kiem tra ton tai phim
    if (tmdb_id) {
      const check_existing = await this.phimRepository.findOne({
        where: { tmdb_id, tmdb_type: type },
      });
      if (check_existing) {
        throw new BadRequestException(
          ERROR.PHIM.TMDB_EXIST.msg,
          ERROR.PHIM.TMDB_EXIST.code,
        );
      }
    }
    if (type === 'movie') return this.add_phim_movie(input);
    return this.add_phim_tv(input);
  }

  async add_phim_tv(input: addPhimInput) {
    const { tmdb_id, quocgiaId, theloaiId, loaiphimId, type } = input;
    const tmdb = await tmdb_get_tv(tmdb_id);
    const theloai: Theloai[] =
      await this.thongtinService.get_list_the_loai_by_id(theloaiId);
    const quocgia: Quocgia = await this.thongtinService.find_quocgia_by_id(
      quocgiaId,
    );
    if (!quocgia)
      throw new BadRequestException(
        ERROR.QUOCGIA.NOT_EXIST.msg,
        ERROR.QUOCGIA.NOT_EXIST.code,
      );
    const loaiphim: Loaiphim = await this.thongtinService.find_loaiphim_by_id(
      loaiphimId,
    );
    if (!loaiphim)
      throw new BadRequestException(
        ERROR.LOAIPHIM.NOT_EXIST.msg,
        ERROR.LOAIPHIM.NOT_EXIST.code,
      );
    const release_date = stringToDate(tmdb.first_air_date);
    const nam = getYear(release_date);
    //them phim
    const item_phim = new Phim();
    item_phim.ten = tmdb.name;
    item_phim.ten_en = tmdb.original_name;
    item_phim.mota = tmdb.overview;
    item_phim.quocgia = quocgia;
    item_phim.avatar = tmdb.poster_path;
    item_phim.background = tmdb.backdrop_path;
    item_phim.tagline = tmdb.tagline;
    item_phim.release_date = release_date;
    item_phim.nam = nam;
    item_phim.loaiphim = loaiphim;
    item_phim.tmdb_id = tmdb.id;
    item_phim.tmdb_type = 'tv';
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const new_phim = await queryRunner.manager.save(item_phim);
      // const new_phim = await this.phimRepository.save(item_phim, {
      //   transaction: false,
      // });
      //the loai - phim
      await this.add_phim_theloai(new_phim, theloai, queryRunner);
      //dien vien - phim
      await this.add_phim_dienvien(new_phim, tmdb.id, 'tv', queryRunner);
      //tuong tu - phim
      await this.add_phim_tuongtu(new_phim, tmdb.id, 'tv', queryRunner);
      //season - phim
      await this.add_phim_tv_season(new_phim, tmdb.seasons, queryRunner);
      await queryRunner.commitTransaction();
      return new_phim;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
  async add_phim_movie(input: addPhimInput) {
    const { tmdb_id, quocgiaId, theloaiId, loaiphimId, type } = input;
    const tmdb = await tmdb_get_movie(tmdb_id);
    const theloai: Theloai[] =
      await this.thongtinService.get_list_the_loai_by_id(theloaiId);
    const quocgia: Quocgia = await this.thongtinService.find_quocgia_by_id(
      quocgiaId,
    );
    if (!quocgia)
      throw new BadRequestException(
        ERROR.QUOCGIA.NOT_EXIST.msg,
        ERROR.QUOCGIA.NOT_EXIST.code,
      );
    const loaiphim: Loaiphim = await this.thongtinService.find_loaiphim_by_id(
      loaiphimId,
    );
    if (!loaiphim)
      throw new BadRequestException(
        ERROR.LOAIPHIM.NOT_EXIST.msg,
        ERROR.LOAIPHIM.NOT_EXIST.code,
      );
    const release_date = stringToDate(tmdb.release_date);
    const nam = getYear(release_date);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    //them phim
    const item_phim = new Phim();
    item_phim.ten = tmdb.title;
    item_phim.ten_en = tmdb.original_title;
    item_phim.quocgia = quocgia;
    item_phim.mota = tmdb.overview;
    item_phim.avatar = tmdb.poster_path;
    item_phim.background = tmdb.backdrop_path;
    item_phim.tagline = tmdb.tagline;
    item_phim.release_date = release_date;
    item_phim.nam = nam;
    item_phim.loaiphim = loaiphim;
    item_phim.imdb_id = tmdb.imdb_id;
    item_phim.tmdb_id = tmdb.id;
    item_phim.tmdb_type = 'movie';
    try {
      const new_phim = await queryRunner.manager.save(item_phim);
      // const new_phim = await this.phimRepository.save(item_phim, {
      //   transaction: false,
      // });
      //the loai - phim
      await this.add_phim_theloai(new_phim, theloai, queryRunner);
      //dien vien - phim
      await this.add_phim_dienvien(new_phim, tmdb.id, 'movie', queryRunner);
      //tuong tu - phim
      await this.add_phim_tuongtu(new_phim, tmdb.id, 'movie', queryRunner);
      await queryRunner.commitTransaction();
      return new_phim;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
  async add_phim_theloai(
    phim: Phim,
    theloai: Theloai[],
    queryRunner?: QueryRunner,
  ) {
    try {
      for (let index = 0; index < theloai.length; index++) {
        const element = theloai[index];
        const item_phim_theloai = new Phim_theloai();
        item_phim_theloai.phim = phim;
        item_phim_theloai.theloai = element;
        if (queryRunner) {
          await queryRunner.manager.save(item_phim_theloai);
        } else {
          await this.phim_theloaiRepository.save(item_phim_theloai, {
            transaction: false,
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw new BadRequestException(
        ERROR.PHIM_THELOAI.ERROR_INSERT.msg,
        ERROR.PHIM_THELOAI.ERROR_INSERT.code,
      );
    }
  }

  async add_dienvien_by_id_tmdb(
    id_tmdb: number,
    type: TTypeGetMovieTV = 'movie',
    queryRunner?: QueryRunner,
  ) {
    const tmdb_dienvien = await tmdb_get_movie_tv_dienvien(id_tmdb, type);
    if (typeof tmdb_dienvien === 'object') {
      const { cast: casts } = tmdb_dienvien;
      const arr_sql: string[] = [];
      arr_sql.push(`SELECT -1 tmdb_id, '' ten, '' profile_path`);
      const arr_id_tmdb: number[] = [];
      const obj_dienvien_character: {
        [key: number]: { character: string; tmdb_credit_id: string };
      } = {};
      const params: any[] = [];
      let sql = '';
      let sl = 0;
      let alias = 1;
      for (let index = 0; index < casts.length; index++) {
        sl++;
        const {
          id: tmdb_id,
          name,
          profile_path,
          character,
          credit_id: tmdb_credit_id,
        } = casts[index];
        obj_dienvien_character[tmdb_id] = { character, tmdb_credit_id };
        if (sl < limit_so_luong_dv) {
          arr_id_tmdb.push(tmdb_id);
          arr_sql.push(`SELECT $${alias++}, $${alias++}, $${alias++}`);
          params.push(tmdb_id);
          params.push(name);
          params.push(profile_path);
        }
      }
      if (arr_sql.length) {
        sql = arr_sql.join(' UNION ');
        sql = `INSERT INTO dienvien(tmdb_id,ten,profile_path) 
        SELECT a.tmdb_id, a.ten, a.profile_path
        FROM (
          ${sql}
          ) a
          LEFT JOIN dienvien b ON b."tmdb_id" = a."tmdb_id"
          WHERE b."id" IS NULL AND a.tmdb_id <> -1`;
        //insert
        try {
          let ds_dienvien: Dienvien[];
          if (queryRunner) {
            queryRunner.manager.query(sql, params);
            ds_dienvien = await queryRunner.manager.find(Dienvien, {
              where: {
                tmdb_id: In(arr_id_tmdb),
              },
            });
          } else {
            await this.dienvienRepository.query(sql, params);
            ds_dienvien = await this.dienvienRepository.find({
              where: {
                tmdb_id: In(arr_id_tmdb),
              },
            });
          }
          return { ds_dienvien, obj_dienvien_character };
        } catch (error) {
          console.log(error, 'error');
          if (queryRunner) {
            await queryRunner.rollbackTransaction();
          }
          throw new BadRequestException(
            ERROR.DIENVIEN.ERROR_INSERT.msg,
            ERROR.DIENVIEN.ERROR_INSERT.code,
          );
        }
      }
    }
    return {};
  }
  async add_phim_dienvien(
    phim: Phim,
    id_tmdb: number,
    type: TTypeGetMovieTV = 'movie',
    queryRunner?: QueryRunner,
  ) {
    try {
      const { ds_dienvien, obj_dienvien_character } =
        await this.add_dienvien_by_id_tmdb(id_tmdb, type, queryRunner);
      let stt_phim_dienvien = 0;
      for (let index = 0; index < ds_dienvien.length; index++) {
        const element = ds_dienvien[index];
        const item_phim_dienvien = new Phim_dienvien();
        const dienvien_character = obj_dienvien_character[element.tmdb_id];
        item_phim_dienvien.dienvien = element;
        item_phim_dienvien.phim = phim;
        item_phim_dienvien.vai_dien = dienvien_character.character;
        item_phim_dienvien.tmdb_credit_id = dienvien_character.tmdb_credit_id;
        item_phim_dienvien.stt = stt_phim_dienvien++;
        if (queryRunner) {
          await queryRunner.manager.save(item_phim_dienvien);
        } else {
          await this.phim_dienvienRepository.save(item_phim_dienvien, {
            transaction: false,
          });
        }
      }
    } catch (error) {
      console.log(error, 'error');
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw new BadRequestException(
        ERROR.PHIM_DIENVIEN.ERROR_INSERT.msg,
        ERROR.PHIM_DIENVIEN.ERROR_INSERT.code,
      );
    }
  }
  async add_phim_tuongtu(
    phim: Phim,
    id_tmdb: number,
    type: TTypeGetMovieTV = 'movie',
    queryRunner?: QueryRunner,
  ) {
    try {
      const { results } = await tmdb_get_movie_tv_tuongtu(id_tmdb, type);
      console.log({ results });
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        const phim_tuongtu = await this.phimRepository.findOne({
          where: { tmdb_id: element.id },
        });
        if (phim_tuongtu) {
          const item_phim_tuongtu = new Phim_tuongtu();
          item_phim_tuongtu.phim = phim;
          item_phim_tuongtu.phim_tuongtu = phim_tuongtu;
          if (queryRunner) {
            await queryRunner.manager.save(item_phim_tuongtu);
          } else {
            await this.phim_tuongtuRepository.save(item_phim_tuongtu, {
              transaction: false,
            });
          }
        }
      }
    } catch (error) {
      console.log(error, 'error');
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw new BadRequestException(
        ERROR.PHIM_TUONGTU.ERROR_INSERT.msg,
        ERROR.PHIM_TUONGTU.ERROR_INSERT.code,
      );
    }
  }
  async add_phim_tv_season(
    phim: Phim,
    ds_season: ITmdb_tv_season[],
    queryRunner?: QueryRunner,
  ) {
    try {
      for (let index = 0; index < ds_season.length; index++) {
        const {
          air_date,
          episode_count,
          id,
          name,
          overview,
          poster_path,
          season_number,
        } = ds_season[index];
        const phim_tv_season = await this.phim_seasonRepository.findOne({
          where: { tmdb_id: id },
        });
        if (!phim_tv_season) {
          const item_phim_season = new Phim_tv_season();
          item_phim_season.phim = phim;
          item_phim_season.air_date = air_date ? stringToDate(air_date) : null;
          item_phim_season.episode_count = episode_count;
          item_phim_season.tmdb_id = id;
          item_phim_season.name = name;
          item_phim_season.overview = overview;
          item_phim_season.poster_path = poster_path;
          item_phim_season.season_number = season_number;
          let new_phim_season: Phim_tv_season;
          if (queryRunner) {
            new_phim_season = await queryRunner.manager.save(item_phim_season);
          } else {
            new_phim_season = await this.phim_seasonRepository.save(
              item_phim_season,
            );
          }
          //add Phim_tv_season_episode
          await this.add_phim_tv_season_episode(
            phim.tmdb_id,
            new_phim_season,
            queryRunner,
          );
        }
      }
    } catch (error) {
      console.log(error, 'error');
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw new BadRequestException(
        ERROR.PHIM_TUONGTU.ERROR_INSERT.msg,
        ERROR.PHIM_TUONGTU.ERROR_INSERT.code,
      );
    }
  }
  async add_phim_tv_season_episode(
    id_tmdb: number,
    phim_season: Phim_tv_season,
    queryRunner?: QueryRunner,
  ) {
    const { episodes } = await tmdb_get_tv_season_episode(
      id_tmdb,
      phim_season.season_number,
    );
    try {
      for (let index = 0; index < episodes.length; index++) {
        const { air_date, episode_number, id, name, overview, runtime } =
          episodes[index];
        const phim_tv_season_episode = await this.phim_seasonRepository.findOne(
          {
            where: { tmdb_id: id },
          },
        );
        if (!phim_tv_season_episode) {
          const item_phim_season_episode = new Phim_tv_season_episode();
          item_phim_season_episode.tmdb_id = id;
          item_phim_season_episode.air_date = air_date
            ? stringToDate(air_date)
            : null;
          item_phim_season_episode.episode_number = episode_number;
          item_phim_season_episode.name = name;
          item_phim_season_episode.overview = overview;
          item_phim_season_episode.runtime = runtime;
          item_phim_season_episode.phim_tv_season = phim_season;

          let new_phim_season_episode: Phim_tv_season_episode;
          if (queryRunner) {
            new_phim_season_episode = await queryRunner.manager.save(
              item_phim_season_episode,
            );
          } else {
            new_phim_season_episode =
              await this.phim_season_episodeRepository.save(
                item_phim_season_episode,
              );
          }
        }
      }
    } catch (error) {
      console.log(error, 'error');
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw new BadRequestException(
        ERROR.PHIM_TUONGTU.ERROR_INSERT.msg,
        ERROR.PHIM_TUONGTU.ERROR_INSERT.code,
      );
    }
  }

  async add_link_stream(input: addLinkstreamInput) {
    const { id_phim_or_episode, link_stream, type } = input;
    const item_phim_linkstream = new Phim_linkstream();
    item_phim_linkstream.linkstream = link_stream;
    if (type === 'movie') {
      const phim = await this.phimRepository.findOne({
        where: { id: id_phim_or_episode },
      });
      if (!phim) {
        throw new BadRequestException(
          ERROR.PHIM.NOT_EXIST.msg,
          ERROR.PHIM.NOT_EXIST.code,
        );
      }
      const check_linkstream = await this.phim_linkstreamRepository.findOne({
        where: { phim },
      });
      if (check_linkstream) {
        check_linkstream.linkstream = link_stream;
        this.phim_linkstreamRepository.save(check_linkstream);
      } else {
        item_phim_linkstream.phim = phim;
        this.phim_linkstreamRepository.save(item_phim_linkstream);
      }
    } else {
      const phim_episode = await this.phim_season_episodeRepository.findOne({
        where: { id: id_phim_or_episode },
      });
      if (!phim_episode) {
        throw new BadRequestException(
          ERROR.PHIM.NOT_EXIST.msg,
          ERROR.PHIM.NOT_EXIST.code,
        );
      }
      const check_linkstream = await this.phim_linkstreamRepository.findOne({
        where: { phim_tv_season_episode: phim_episode },
      });
      if (check_linkstream) {
        check_linkstream.linkstream = link_stream;
        this.phim_linkstreamRepository.save(check_linkstream);
      } else {
        item_phim_linkstream.phim_tv_season_episode = phim_episode;
        this.phim_linkstreamRepository.save(item_phim_linkstream);
      }
    }
    return true;
  }

  async delete_phim(id: number) {
    const check_phim = await this.phimRepository.findOne({ where: { id } });
    if (isNullUndefined(check_phim?.id)) {
      throw new BadRequestException(
        ERROR.PHIM.NOT_EXIST.msg,
        ERROR.PHIM.NOT_EXIST.code,
      );
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Phim_dienvien, { phim: check_phim });
      await queryRunner.manager.delete(Phim_theloai, { phim: check_phim });
      await queryRunner.manager.delete(Phim_tuongtu, { phim: check_phim });
      //truong hop tv
      if (check_phim.tmdb_type === 'tv') {
        const phim_tv_seasons = await this.phim_seasonRepository
          .createQueryBuilder('Phim_tv_season')
          .where('Phim_tv_season.phimId = :phimId', { phimId: check_phim.id })
          .getMany();
        if (phim_tv_seasons.length) {
          for (let index = 0; index < phim_tv_seasons.length; index++) {
            const phim_tv_season = phim_tv_seasons[index];
            const phim_tv_season_episode =
              await this.phim_season_episodeRepository
                .createQueryBuilder('a')
                .where('a.phim_tv_seasonId = :phim_tv_seasonId', {
                  phim_tv_seasonId: phim_tv_season.id,
                })
                .getMany();
            if (phim_tv_season_episode.length) {
              const arr_id = [];
              phim_tv_season_episode.map((value) => {
                arr_id.push(value.id);
              });
              await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(Phim_linkstream)
                .where(
                  'phim_tv_season_episodeId IN (:...phim_tv_season_episodeId)',
                  { phim_tv_season_episodeId: arr_id },
                )
                .execute();
            }
            await queryRunner.manager.delete(Phim_tv_season_episode, {
              phim_tv_season,
            });
          }
          await queryRunner.manager.delete(Phim_tv_season, {
            phim: check_phim,
          });
        }
      } else {
        await queryRunner.manager.delete(Phim_linkstream, {
          phim: check_phim,
        });
      }
      await queryRunner.manager.delete(Phim, { id });
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        ERROR.PHIM.ERROR_DELETE.msg,
        ERROR.PHIM.ERROR_DELETE.code,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
