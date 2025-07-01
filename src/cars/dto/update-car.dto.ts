// src/cars/dto/update-car.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  years?: string; // Yillar masalan: "2015-2020"
}
