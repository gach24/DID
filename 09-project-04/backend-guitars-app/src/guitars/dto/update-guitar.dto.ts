import { PartialType } from '@nestjs/mapped-types';
import { CreateGuitarDto } from './create-guitar.dto';

export class UpdateGuitarDto extends PartialType(CreateGuitarDto) {}
