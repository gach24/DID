import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { CreateGuitarDto } from './dto/create-guitar.dto';
// import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { Guitar } from './entities/guitar.entity';

@Injectable()
export class GuitarsService {
  constructor(@InjectModel(Guitar.name) private guitarModel: Model<Guitar>) {}

  // TODO: Implementar el método create
  /*  
  create(createGuitarDto: CreateGuitarDto) {
    return 'This action adds a new guitar';
  } 
  */

  async findAll() {
    return this.guitarModel.find().exec();
  }

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
