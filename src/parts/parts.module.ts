import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { Category } from 'src/categories/entities/category.entity';
import { OEM } from 'src/oem/entities/oem.entity';
import { Car } from 'src/cars/entities/car.entity';
import { Brand } from 'src/brands/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Category, OEM, Car, Brand])],
  providers: [PartsService],
  controllers: [PartsController],
  exports: [PartsService],
})
export class PartsModule {}
