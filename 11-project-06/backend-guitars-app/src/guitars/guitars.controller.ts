import { Controller, Get, Param } from '@nestjs/common';

import { GuitarsService } from './guitars.service';

@Controller('guitars')
export class GuitarsController {
  constructor(private readonly guitarsService: GuitarsService) {}

  @Get()
  async findAll() {
    return await this.guitarsService.findAll();
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
