import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Length,
} from 'class-validator';

export class CreateGuitarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  image: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
