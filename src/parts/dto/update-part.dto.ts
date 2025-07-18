import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsBoolean, Min, ArrayNotEmpty, IsInt } from 'class-validator';

export class UpdatePartDto {
  @IsString()
  @IsOptional()
  sku: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  trtCode: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  marka: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  model: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  oem: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  year: string[];

  @IsString()
  @IsOptional()
  country: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  brand: string[];

  @IsString()
  @IsOptional()
  baseUnit: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  categories: number[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsBoolean()
  @IsOptional()
  inStock: boolean;
  
}