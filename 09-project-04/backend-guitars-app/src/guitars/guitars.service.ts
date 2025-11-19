import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Guitar } from './entities/guitar.entity';

import { db } from 'src/data/db';

@Injectable()
export class GuitarsService {
  constructor(@InjectModel(Guitar.name) private guitarModel: Model<Guitar>) {}

  async findAll() {
    return this.guitarModel.find().exec();
  }

  async seed() {
    await this.guitarModel.deleteMany({});
    return await this.guitarModel.insertMany(
      db.map((g) => {
        const { id: _, ...rest } = g;
        return {
          ...rest,
        };
      }),
    );
  }

  // TODO: Implementar el método create
  /*  
  create(createGuitarDto: CreateGuitarDto) {
    return 'This action adds a new guitar';
  } 
  */

  // TODO: Implementar el método findOne
  /*
  findOne(id: number) {
    return `This action returns a #${id} guitar`;
  }

  // TODO: Implementar el método update
  /*
  update(id: number, updateGuitarDto: UpdateGuitarDto) {
    return `This action updates a #${id} guitar`;
  }
  */

  // TODO: Implementar el método remove
  /*
  remove(id: number) {
    return `This action removes a #${id} guitar`;
  }
  */
}
