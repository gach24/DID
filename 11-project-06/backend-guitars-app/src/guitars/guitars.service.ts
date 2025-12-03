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

  async findOne(id: string) {
    return await this.guitarModel.findById(id).exec();
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
}
