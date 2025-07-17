import { IsString, IsNotEmpty, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
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