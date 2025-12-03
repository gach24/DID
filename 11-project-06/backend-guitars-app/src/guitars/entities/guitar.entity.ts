import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuitarDocument = HydratedDocument<Guitar>;

@Schema()
export class Guitar {
  @Prop({
    required: true,
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  name: string;

  @Prop({ required: true, minlength: 3, maxlength: 120 })
  image: string;

  @Prop({ default: 'N/D' })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;
}

export const GuitarSchema = SchemaFactory.createForClass(Guitar);
