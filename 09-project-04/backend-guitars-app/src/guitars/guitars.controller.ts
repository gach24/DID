import { Controller, Get } from '@nestjs/common';

import { GuitarsService } from './guitars.service';

@Controller('guitars')
export class GuitarsController {
  constructor(private readonly guitarsService: GuitarsService) {}

  // TODO: Implementar el método create
  /*
  @Post()
  create(@Body() createGuitarDto: CreateGuitarDto) {
    return this.guitarsService.create(createGuitarDto);
  }
  */

  @Get()
  async findAll() {
    return await this.guitarsService.findAll();
  }

  @Get('seed')
  async seed() {
    return await this.guitarsService.seed();
  }

  // TODO: Implementar el método findOne
  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guitarsService.findOne(+id);
  }
  */

  // TODO: Implementar el método update
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuitarDto: UpdateGuitarDto) {
    return this.guitarsService.update(+id, updateGuitarDto);
  }
  */

  // TODO: Implementar el método remove
  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guitarsService.remove(+id);
  }
  */
}
