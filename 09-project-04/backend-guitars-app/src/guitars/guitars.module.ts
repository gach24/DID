import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GuitarsController } from './guitars.controller';
import { GuitarsService } from './guitars.service';
import { Guitar, GuitarSchema } from './entities/guitar.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guitar.name, schema: GuitarSchema }]),
  ],
  controllers: [GuitarsController],
  providers: [GuitarsService],
})
export class GuitarsModule {}
