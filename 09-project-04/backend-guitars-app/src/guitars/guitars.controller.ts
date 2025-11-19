import { Controller, Get } from '@nestjs/common';
import { GuitarsService } from './guitars.service';
// import { CreateGuitarDto } from './dto/create-guitar.dto';
// import { UpdateGuitarDto } from './dto/update-guitar.dto';

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
