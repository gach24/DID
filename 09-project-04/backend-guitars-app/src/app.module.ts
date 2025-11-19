import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuitarsModule } from './guitars/guitars.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/guitarsdb'),
    GuitarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
