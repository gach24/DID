import { Module } from '@nestjs/common';
import { GuitarsModule } from './guitars/guitars.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/guitarsdb'),
    GuitarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
