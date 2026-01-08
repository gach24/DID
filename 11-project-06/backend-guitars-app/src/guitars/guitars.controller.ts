import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { GuitarsService } from './guitars.service';
import { CreateGuitarDto } from './dto/create-guitar.dto';

@Controller('guitars')
export class GuitarsController {
  constructor(private readonly guitarsService: GuitarsService) {}

  @Get()
  async findAll() {
    return await this.guitarsService.findAll();
  }

  @Post()
  async create(@Body() createGuitarDto: CreateGuitarDto) {
    return await this.guitarsService.create(createGuitarDto);
  }

  @Get('seed')
  async seed() {
    return await this.guitarsService.seed();
  }

  // TODO: Implementar el método findOne
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.guitarsService.findOne(id);
  }
}
