import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsBoolean, Min, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  trtCode: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  marka: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  model: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  oem: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  year: string[];

  @IsString()
  @IsOptional()
  country: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  brand: string[];

  @IsString()
  @IsNotEmpty()
  baseUnit: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
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