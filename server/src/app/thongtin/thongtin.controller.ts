import {
  findLoaiphimInput,
  addLoaiphimInput,
  updateLoaiphimInput,
  updateLoaiphimParam,
} from './dto/loaiphim.dto';
import {
  findQuocgiaInput,
  addQuocgiaInput,
  updateQuocgiaInput,
  updateQuocgiaParam,
} from './dto/quocgia.dto';
import {
  addTheloaiInput,
  findTheloaiInput,
  updateTheloaiInput,
  updateTheloaiParam,
} from './dto/theloai.dto';
import { ThongtinService } from './thongtin.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('thongtin')
export class ThongtinController {
  constructor(private thongtinService: ThongtinService) {}
  //the loai
  @Get('/theloai')
  async findAll_theloai(@Query() query: findTheloaiInput) {
    return this.thongtinService.find_theloai(query);
  }

  @Post('/theloai/add')
  async add_theloai(@Body() body: addTheloaiInput) {
    return this.thongtinService.insert_theloai(body);
  }

  @Post('/theloai/update/:id')
  async update_theloai(
    @Body() body: updateTheloaiInput,
    @Param() param: updateTheloaiParam,
  ) {
    const { id } = param;
    return this.thongtinService.update_by_id_theloai(id, body);
  }

  @Get('/theloai/delete/:id')
  async delete_theloai(@Param() param: updateTheloaiParam) {
    const { id } = param;
    return this.thongtinService.delete_theloai(id);
  }

  //quocgia
  @Get('/quocgia')
  async findAll_quocgia(@Query() query: findQuocgiaInput) {
    return this.thongtinService.find_quocgia(query);
  }

  @Post('/quocgia/add')
  async add_quocgia(@Body() body: addQuocgiaInput) {
    return this.thongtinService.insert_quocgia(body);
  }

  @Post('/quocgia/update/:id')
  async update_quocgia(
    @Body() body: updateQuocgiaInput,
    @Param() param: updateQuocgiaParam,
  ) {
    const { id } = param;
    return this.thongtinService.update_by_id_quocgia(id, body);
  }

  @Get('/quocgia/delete/:id')
  async delete_quocgia(@Param() param: updateQuocgiaParam) {
    const { id } = param;
    return this.thongtinService.delete_quocgia(id);
  }

  //loai phim
  @Get('/loaiphim')
  async findAll_loaiphim(@Query() query: findLoaiphimInput) {
    return this.thongtinService.find_loaiphim(query);
  }

  @Post('/loaiphim/add')
  async add_loaiphim(@Body() body: addLoaiphimInput) {
    return this.thongtinService.insert_loaiphim(body);
  }

  @Post('/loaiphim/update/:id')
  async update_loaiphim(
    @Body() body: updateLoaiphimInput,
    @Param() param: updateLoaiphimParam,
  ) {
    const { id } = param;
    return this.thongtinService.update_by_id_loaiphim(id, body);
  }

  @Get('/loaiphim/delete/:id')
  async delete_loaiphim(@Param() param: updateLoaiphimParam) {
    const { id } = param;
    return this.thongtinService.delete_loaiphim(id);
  }
}
