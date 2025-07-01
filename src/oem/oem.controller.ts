import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OemsService } from './oem.service';
import { CreateOemDto } from './dto/create-oem.dto';
import { UpdateOemDto } from './dto/update-oem.dto';

@Controller('oems')
export class OemsController {
  constructor(private readonly oemsService: OemsService) {}

  @Post()
  async create(@Body() createOemDto: CreateOemDto) {
    try {
      return await this.oemsService.create(createOemDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.oemsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.oemsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOemDto: UpdateOemDto) {
    try {
      return await this.oemsService.update(id, updateOemDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.oemsService.remove(id);
      return { message: `OEM id: ${id} muvaffaqiyatli o'chirildi` };
    } catch (error) {
      throw error;
    }
  }
}
