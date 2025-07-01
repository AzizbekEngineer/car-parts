import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    try {
      return await this.brandsService.create(createBrandDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.brandsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.brandsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    try {
      return await this.brandsService.update(id, updateBrandDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.brandsService.remove(id);
      return { message: `Brand id: ${id} muvaffaqiyatli o'chirildi` };
    } catch (error) {
      throw error;
    }
  }
}
