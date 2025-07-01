import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @IsOptional() 
  @IsNotEmpty()
  name?: string;
}
