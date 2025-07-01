import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class UpdatePartDto {
  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  visibilityInCatalog?: string;

  @IsString()
  @IsOptional()
  language?: string;

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
  @IsOptional()
  models?: string[];

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
