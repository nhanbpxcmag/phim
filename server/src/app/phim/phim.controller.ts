import { GetPhimService } from './get-phim.service';
import { Phim } from './../../entities/phim.entity';
import { findPhimInput, addPhimInput, addLinkstreamInput } from './phim.dto';
import { PhimService } from './phim.service';
import { Controller, Get, Query, Body, Post, Param } from '@nestjs/common';

@Controller('phim')
export class PhimController {
  constructor(
    private phimService: PhimService,
    private getPhimService: GetPhimService,
  ) {}

  @Get('')
  async find_phim(@Query() query: findPhimInput) {
    return this.phimService.find_phim(query);
  }
  @Get('/detail/:id')
  async find_phim_by_id(@Param('id') id: number) {
    return this.getPhimService.get_phim(id);
  }
  @Get('/home/movie')
  async get_phim_movie_home(@Query('num_page') num_page: number) {
    return this.getPhimService.get_phim_movie_home(num_page);
  }
  @Get('/home/tv')
  async get_phim_tv_home(@Query('num_page') num_page: number) {
    return this.getPhimService.get_phim_tv_home(num_page);
  }
  @Post('/add')
  async add_phim(@Body() body: addPhimInput) {
    const tmdb = await this.phimService.add_phim(body);
    return tmdb;
  }
  @Post('/add_link_stream')
  async add_link_stream(@Body() body: addLinkstreamInput) {
    const tmdb = await this.phimService.add_link_stream(body);
    return tmdb;
  }
  @Get('/delete/:id')
  async delete_phim(@Param('id') id: number) {
    const tmdb = await this.phimService.delete_phim(id);
    return true;
  }
}
