import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { Part } from './entities/part.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Category])],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}