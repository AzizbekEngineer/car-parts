import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { Category } from './entities/category.entity';
import { Part } from '../parts/entities/part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Part])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoriesModule {}