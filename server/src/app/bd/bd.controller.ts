import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { addBDInput } from './bd.dto';
import { BDService } from './bd.service';

@Controller('bd')
export class BDController {
  constructor(
    private bdService: BDService
  ) {}
  @Get('/home')
  async get_phim_movie_home(@Query('num_page') num_page: number) {
    return this.bdService.get_phim_movie_home();
  }
  @Post('/add')
  async add(@Body() body: addBDInput) {
    const tmdb = await this.bdService.add(body);
    return tmdb;
  }
  @Get('/:id')
  async find(@Param('id') id: number) {
    const tmdb = await this.bdService.find(id);
    return tmdb;
  }
  @Get('/delete/:id')
  async delete(@Param('id') id: number) {
    const tmdb = await this.bdService.delete(id);
    return true;
  }
}
