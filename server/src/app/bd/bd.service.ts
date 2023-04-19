import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNullUndefined } from 'src/utils/util';
import {
    Repository
} from 'typeorm';
import { ERROR } from './../../../constants';
import { BD } from './../../entities/bd.entity';
import { addBDInput } from './bd.dto';

@Injectable()
export class BDService {
  constructor(
    @InjectRepository(BD)
    private bdRepository: Repository<BD>
  ) {}
  async get_phim_movie_home() {
      const phim = await this.bdRepository.find({order: {id: 1}})
    return [...phim];
  }

  async add(
    body: addBDInput
  ) {
    const { ten,avatar,linkstream,link_sub} = body;
    try {
        const item = new BD();
        item.ten = ten;
        item.avatar = avatar;
        item.linkstream = linkstream;
        item.link_sub = link_sub;

        await this.bdRepository.save(item);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        ERROR.BD.ERROR_INSERT.msg,
        ERROR.BD.ERROR_INSERT.code,
      );
    }
  }
  async find(id: number) {
    return await this.bdRepository.findOne({ where: { id } });
  }
  async delete(id: number) {
    const item = await this.bdRepository.findOne({ where: { id } });
    if (isNullUndefined(item?.id)) {
      throw new BadRequestException(
        ERROR.BD.NOT_EXIST.msg,
        ERROR.BD.NOT_EXIST.code,
      );
    }
    const kq = await this.bdRepository.delete({ id });
    return kq.affected ? true : false;
  }
}
