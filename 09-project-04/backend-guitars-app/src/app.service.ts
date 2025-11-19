import { Injectable } from '@nestjs/common';
import { db } from './data/db';

@Injectable()
export class AppService {
  getGuitars(): Guitar[] {
    return db;
  }
}
