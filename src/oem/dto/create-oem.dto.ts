// src/oems/dto/create-oem.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOemDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
