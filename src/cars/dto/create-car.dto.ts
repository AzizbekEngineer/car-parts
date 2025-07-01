// src/cars/dto/create-car.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  years: string; // Yillar masalan: "2015-2020"
}
