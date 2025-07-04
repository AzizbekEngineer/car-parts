// src/brands/brands.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])], // Brand entitini modulega qo'shish
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
