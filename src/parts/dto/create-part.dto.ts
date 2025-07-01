import { IsString, IsNumber, IsNotEmpty, IsOptional, IsBoolean, IsArray, isNotEmpty } from 'class-validator';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  visibilityInCatalog?: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsNumber()
  @IsOptional()
  translationGroup?: number;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @IsArray()
  @IsOptional()
  categories?: number[];

  @IsArray()
  @IsOptional()
  cars?: number[];

  @IsArray()
  @IsOptional()
  oems?: number[];

  @IsArray()
  @IsOptional()
  brands?: number[];

  @IsArray()
  @IsOptional()
  images?: string[];
  
  @IsArray()
  models: string[];

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  trtCode?: string;

  @IsString()
  @IsOptional()
  imgUrl?: string;

}
