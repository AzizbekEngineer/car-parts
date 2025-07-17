import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  parts: number[];
}