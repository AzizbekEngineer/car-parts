// src/oems/dto/update-oem.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateOemDto {
  @IsString()
  @IsOptional()
  code?: string;
}
