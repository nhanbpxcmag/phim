import { Loaiphim } from './../../entities/loaiphim.entity';
import {
  findLoaiphimInput,
  addLoaiphimInput,
  updateLoaiphimInput,
} from './dto/loaiphim.dto';
import {
  findQuocgiaInput,
  addQuocgiaInput,
  updateQuocgiaInput,
} from './dto/quocgia.dto';
import { Quocgia } from './../../entities/quocgia.entity';
import { isNullUndefined } from './../../utils/util';
import { ERROR } from './../../../constants';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theloai } from 'src/entities/theloai.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  addTheloaiInput,
  findTheloaiInput,
  updateTheloaiInput,
} from './dto/theloai.dto';

@Injectable()
export class ThongtinService {
  constructor(
    @InjectRepository(Theloai)
    private theloaiRepository: Repository<Theloai>,
    @InjectRepository(Quocgia)
    private quocgiaRepository: Repository<Quocgia>,
    @InjectRepository(Loaiphim)
    private loaiphimRepository: Repository<Loaiphim>,
  ) {}
  //the loai
  convert_where_theloai(input?: findTheloaiInput) {
    const where_query: FindOptionsWhere<Theloai> = {};
    if (input) {
      const { id, stt, ten, isActive } = input || {};
      if (id) where_query.id = id;
      if (ten) where_query.ten = ten;
      if (stt) where_query.stt = stt;
      if (isActive) where_query.isActive = isActive;
    }
    return where_query;
  }
  async find_theloai(input?: findTheloaiInput) {
    const where = this.convert_where_theloai(input);
    return this.theloaiRepository.find({ where });
  }

  async find_theloai_by_id(id: number) {
    return this.theloaiRepository.findOne({ where: { id } });
  }

  async get_list_the_loai_by_id(theloaiId: number[]) {
    const theloai: Theloai[] = [];
    const check_lap_lai: number[] = [];
    for (let index = 0; index < theloaiId.length; index++) {
      const v = theloaiId[index];
      if (check_lap_lai.indexOf(v) >= 0) continue;
      check_lap_lai.push(v);
      const item_theloai = await this.find_theloai_by_id(v);
      if (!item_theloai) {
        throw new BadRequestException(
          ERROR.PHIM.THE_LOAI_NOT_EXIST.msg,
          ERROR.PHIM.THE_LOAI_NOT_EXIST.code,
        );
      }
      if (item_theloai) theloai.push(item_theloai);
    }
    return theloai;
  }

  async insert_theloai(input: addTheloaiInput) {
    const { ten, stt } = input;
    const item = new Theloai();
    item.ten = ten;
    if (stt) {
      item.stt = stt;
    }
    return this.theloaiRepository.save(item);
  }

  async update_by_id_theloai(id: number, input: updateTheloaiInput) {
    const field_update: any = {};
    const theloai = await this.theloaiRepository.findOne({ where: { id } });
    if (isNullUndefined(theloai?.id)) {
      throw new BadRequestException(
        ERROR.THELOAI.NOT_EXIST.msg,
        ERROR.THELOAI.NOT_EXIST.code,
      );
    }
    const { ten, stt, isActive } = input;
    if (ten) field_update.ten = ten;
    if (stt) field_update.stt = stt;
    if (isActive) field_update.isActive = isActive;
    if (Object.keys(field_update).length === 0) {
      throw new BadRequestException(
        ERROR.DB.EMPTY_FIELD_UPDATE.msg,
        ERROR.DB.EMPTY_FIELD_UPDATE.code,
      );
    }
    const { id: _id } = theloai;
    const kq = await this.theloaiRepository.update(
      { id },
      {
        ...theloai,
        ...field_update, // updated fields
      },
    );
    return kq?.affected ? true : false;
  }

  async delete_theloai(id: number) {
    const theloai = await this.theloaiRepository.findOne({ where: { id } });
    if (isNullUndefined(theloai?.id)) {
      throw new BadRequestException(
        ERROR.THELOAI.NOT_EXIST.msg,
        ERROR.THELOAI.NOT_EXIST.code,
      );
    }
    const kq = await this.theloaiRepository.delete({ id });
    return kq.affected ? true : false;
  }

  //quoc gia
  convert_where_quocgia(input?: findQuocgiaInput) {
    const where_query: FindOptionsWhere<Quocgia> = {};
    if (input) {
      const { id, stt, ten, isActive } = input || {};
      if (id) where_query.id = id;
      if (ten) where_query.ten = ten;
      if (stt) where_query.stt = stt;
      if (isActive) where_query.isActive = isActive;
    }
    return where_query;
  }
  async find_quocgia(input?: findQuocgiaInput) {
    const where = this.convert_where_quocgia(input);
    return this.quocgiaRepository.find({ where });
  }

  async find_quocgia_by_id(id: number) {
    return this.quocgiaRepository.findOne({ where: { id } });
  }

  async insert_quocgia(input: addQuocgiaInput) {
    const { ten, stt } = input;
    const item = new Quocgia();
    item.ten = ten;
    if (stt) {
      item.stt = stt;
    }
    return this.quocgiaRepository.save(item);
  }

  async update_by_id_quocgia(id: number, input: updateQuocgiaInput) {
    const field_update: any = {};
    const quocgia = await this.quocgiaRepository.findOne({ where: { id } });
    if (isNullUndefined(quocgia?.id)) {
      throw new BadRequestException(
        ERROR.QUOCGIA.NOT_EXIST.msg,
        ERROR.QUOCGIA.NOT_EXIST.code,
      );
    }
    const { ten, stt, isActive } = input;
    if (ten) field_update.ten = ten;
    if (stt) field_update.stt = stt;
    if (isActive) field_update.isActive = isActive;
    if (Object.keys(field_update).length === 0) {
      throw new BadRequestException(
        ERROR.DB.EMPTY_FIELD_UPDATE.msg,
        ERROR.DB.EMPTY_FIELD_UPDATE.code,
      );
    }
    const { id: _id } = quocgia;
    const kq = await this.quocgiaRepository.update(
      { id },
      {
        ...quocgia,
        ...field_update, // updated fields
      },
    );
    return kq?.affected ? true : false;
  }

  async delete_quocgia(id: number) {
    const quocgia = await this.quocgiaRepository.findOne({ where: { id } });
    if (isNullUndefined(quocgia?.id)) {
      throw new BadRequestException(
        ERROR.QUOCGIA.NOT_EXIST.msg,
        ERROR.QUOCGIA.NOT_EXIST.code,
      );
    }
    const kq = await this.quocgiaRepository.delete({ id });
    return kq.affected ? true : false;
  }

  //loai phim
  convert_where_loaiphim(input?: findLoaiphimInput) {
    const where_query: FindOptionsWhere<Loaiphim> = {};
    if (input) {
      const { id, stt, ten, isActive } = input || {};
      if (id) where_query.id = id;
      if (ten) where_query.ten = ten;
      if (stt) where_query.stt = stt;
      if (isActive) where_query.isActive = isActive;
    }
    return where_query;
  }
  async find_loaiphim(input?: findLoaiphimInput) {
    const where = this.convert_where_loaiphim(input);
    return this.loaiphimRepository.find({ where });
  }

  async find_loaiphim_by_id(id: number) {
    return this.loaiphimRepository.findOne({ where: { id } });
  }

  async insert_loaiphim(input: addLoaiphimInput) {
    const { ten, stt } = input;
    const item = new Loaiphim();
    item.ten = ten;
    if (stt) {
      item.stt = stt;
    }
    return this.loaiphimRepository.save(item);
  }

  async update_by_id_loaiphim(id: number, input: updateLoaiphimInput) {
    const field_update: any = {};
    const loaiphim = await this.loaiphimRepository.findOne({ where: { id } });
    if (isNullUndefined(loaiphim?.id)) {
      throw new BadRequestException(
        ERROR.LOAIPHIM.NOT_EXIST.msg,
        ERROR.LOAIPHIM.NOT_EXIST.code,
      );
    }
    const { ten, stt, isActive } = input;
    if (ten) field_update.ten = ten;
    if (stt) field_update.stt = stt;
    if (isActive) field_update.isActive = isActive;
    if (Object.keys(field_update).length === 0) {
      throw new BadRequestException(
        ERROR.DB.EMPTY_FIELD_UPDATE.msg,
        ERROR.DB.EMPTY_FIELD_UPDATE.code,
      );
    }
    const { id: _id } = loaiphim;
    const kq = await this.loaiphimRepository.update(
      { id },
      {
        ...loaiphim,
        ...field_update, // updated fields
      },
    );
    return kq?.affected ? true : false;
  }

  async delete_loaiphim(id: number) {
    const loaiphim = await this.loaiphimRepository.findOne({ where: { id } });
    if (isNullUndefined(loaiphim?.id)) {
      throw new BadRequestException(
        ERROR.LOAIPHIM.NOT_EXIST.msg,
        ERROR.LOAIPHIM.NOT_EXIST.code,
      );
    }
    const kq = await this.loaiphimRepository.delete({ id });
    return kq.affected ? true : false;
  }
}
