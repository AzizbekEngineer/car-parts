import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Category } from '../categories/entities/category.entity';
import * as path from 'path';
import * as fs from 'fs';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepository: Repository<Part>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {
    const uploadDir = join(__dirname, '..', 'Uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }
  }

  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Rasm yuklanmadi!');
    }
    const fileUrl = `https://car-parts-1.onrender.com/products/uploads/${file.filename}`;
    return { message: 'Rasm muvaffaqiyatli yuklandi!', fileUrl };
  }

  async create(createPartDto: CreatePartDto) {
    const existingPart = await this.partsRepository.findOne({
      where: { trtCode: createPartDto.trtCode },
    });
    if (existingPart) {
      throw new BadRequestException(`"${createPartDto.trtCode}" trtCode allaqachon mavjud!`);
    }

    try {
      const categories = await this.categoriesRepository.findByIds(createPartDto.categories || []);
      const part = this.partsRepository.create({
        ...createPartDto,
        categories,
      });
      return await this.partsRepository.save(part);
    } catch (error) {
      console.error('Mahsulot qo‘shishda xatolik:', error);
      throw new InternalServerErrorException('Yangi mahsulotni qo‘shishda xatolik yuz berdi!');
    }
  }

  async findAll() {
  const parts = await this.partsRepository.find({
    relations: ['categories'],
    order: { id: 'ASC' },
  });

  if (!parts.length) {
    throw new NotFoundException('Hozircha mahsulotlar mavjud emas!');
  }

  return parts;
}



  async findOne(id: number) {
    const part = await this.partsRepository.findOne({ where: { id }, relations: ['categories'] });
    if (!part) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }
    return part;
  }
  async update(id: number, updatePartDto: UpdatePartDto) {
  const part = await this.partsRepository.findOne({
    where: { id },
    relations: ['categories'],
  });

  if (!part) {
    throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
  }

  if (updatePartDto.categories) {
    const categories = await this.categoriesRepository.findByIds(updatePartDto.categories);
    part.categories = categories;
  }
  for (const key in updatePartDto) {
    if (key !== 'categories') {
      part[key] = updatePartDto[key];
    }
  }

  try {
    return await this.partsRepository.save(part);
  } catch (error) {
    console.error('Update xatolik:', error);
    throw new InternalServerErrorException('Mahsulotni yangilashda xatolik yuz berdi!');
  }
}
async remove(id: number) {
  const part = await this.partsRepository.findOne({
    where: { id },
    relations: ['categories'],
  });

  if (!part) {
    throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
  }

  try {

    await this.partsRepository
      .createQueryBuilder()
      .relation(Part, 'categories')
      .of(part.id)
      .remove(part.categories);
    await this.partsRepository.delete(id);

    return { message: 'Mahsulot muvaffaqiyatli o‘chirildi!' };
  } catch (error) {
    console.error('Mahsulot o‘chirishda xatolik:', error);
    throw new InternalServerErrorException('Mahsulot o‘chirishda xatolik yuz berdi!');
  }
}



  async getPartsByCategory(categoryId: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id: parseInt(categoryId) },
      relations: ['parts'],
    });
    if (!category) {
      throw new NotFoundException(`ID ${categoryId} ga ega kategoriya topilmadi!`);
    }
    return { category, parts: category.parts };
  }

  async getAllOem() {
    const distinctOems = await this.partsRepository
      .createQueryBuilder('part')
      .select('UNNEST(part.oem) AS oem')
      .distinct(true)
      .getRawMany();
    return distinctOems.map((row) => row.oem);
  }

  async getOemId(oem: string) {
    const trts = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.trtCode')
      .where(':oem = ANY(part.oem)', { oem })
      .getRawMany();
    return trts.map((trt) => trt.trtCode);
  }

  async getTrtCode(trt: string) {
    const brands = await this.partsRepository
      .createQueryBuilder('part')
      .select('UNNEST(part.brand) AS brand')
      .where('part.trtCode = :trt', { trt })
      .distinct(true)
      .getRawMany();
    return brands.map((brand) => brand.brand);
  }

  async getBrand(brand: string) {
    const models = await this.partsRepository
      .createQueryBuilder('part')
      .select('UNNEST(part.model) AS model')
      .where(':brand = ANY(part.brand)', { brand })
      .distinct(true)
      .getRawMany();
    return models.map((model) => model.model);
  }

  async search(oem: string, trt: string, brand: string, model: string) {
    const queryBuilder = this.partsRepository.createQueryBuilder('part');

    if (oem) queryBuilder.andWhere(':oem = ANY(part.oem)', { oem });
    if (trt) queryBuilder.andWhere('LOWER(part.trtCode) = LOWER(:trt)', { trt });
    if (brand) queryBuilder.andWhere(':brand = ANY(part.brand)', { brand });
    if (model) queryBuilder.andWhere(':model = ANY(part.model)', { model });

    const parts = await queryBuilder.getMany();
    return parts;
  }

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    if (categories.length === 0) {
      throw new NotFoundException('Hozircha kategoriyalar mavjud emas!');
    }
    return categories.sort((a, b) => a.id - b.id);
  }

  async searchByName(name: string) {
    const parts = await this.partsRepository
      .createQueryBuilder('part')
      .where('LOWER(part.name) LIKE LOWER(:name)', { name: `%${name}%` })
      .getMany();

    if (!parts.length) {
      throw new NotFoundException(`"${name}" nomi bo‘yicha mahsulot topilmadi!`);
    }
    return parts;
  }

  async getTotalCount() {
    const totalCount = await this.partsRepository.count();
    return { total: totalCount };
  }

  getImagePath(imageName: string): string | null {
    if (!imageName) {
      return null;
    }
    const imagePath = path.join(__dirname, '..', '..', 'Uploads', imageName);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    } else {
      return null;
    }
  }
}