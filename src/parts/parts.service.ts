import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Category } from 'src/categories/entities/category.entity';
import * as path from 'path'; 
import * as fs from 'fs'; 
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path/posix';
import { OEM } from 'src/oem/entities/oem.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Car } from 'src/cars/entities/car.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepository: Repository<Part>,

    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,

    @InjectRepository(OEM)
    private readonly oemsRepository: Repository<OEM>,

    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,

    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {
    const uploadDir = join(__dirname, '..', 'uploads');
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
      const oems = await this.oemsRepository.findByIds(createPartDto.oems || []);
      const brands = await this.brandsRepository.findByIds(createPartDto.brands || []);
      const cars = await this.carsRepository.findByIds(createPartDto.cars || []);

      const part = this.partsRepository.create({
        ...createPartDto,
        categories,
        oems,
        brands,
        cars,
      });

      return await this.partsRepository.save(part);
    } catch (error) {
      console.error('Mahsulot qo‘shishda xatolik:', error);
      throw new InternalServerErrorException('Yangi mahsulotni qo‘shishda xatolik yuz berdi!');
    }
  }

  async findAll() {
    const parts = await this.partsRepository.find({
      relations: ['categories', 'oems', 'brands', 'cars'],
    });
    if (!parts.length) {
      throw new NotFoundException('Hozircha mahsulotlar mavjud emas!');
    }
    return parts;
  }

  async findOne(id: number) {
    const part = await this.partsRepository.findOne({
      where: { id },
      relations: ['categories', 'oems', 'brands', 'cars'],
    });
    if (!part) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }
    return part;
  }

  async update(id: number, updatePartDto: UpdatePartDto) {
    const part = await this.partsRepository.findOne({
      where: { id },
      relations: ['categories', 'oems', 'brands', 'cars'],
    });
  
    if (!part) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }

    part.sku = updatePartDto.sku || part.sku;
    part.name = updatePartDto.name || part.name;
    part.visibilityInCatalog = updatePartDto.visibilityInCatalog || part.visibilityInCatalog;
    part.language = updatePartDto.language || part.language;
    part.translationGroup = updatePartDto.translationGroup || part.translationGroup;
    part.shortDescription = updatePartDto.shortDescription || part.shortDescription;
    part.description = updatePartDto.description || part.description;
    part.inStock = updatePartDto.inStock ?? part.inStock;
    part.images = updatePartDto.images || part.images;
    part.price = updatePartDto.price ?? part.price;
    part.trtCode = updatePartDto.trtCode || part.trtCode;
    part.imgUrl = updatePartDto.imgUrl || part.imgUrl;

    if (updatePartDto.categories) {
      part.categories = await this.categoriesRepository.findByIds(updatePartDto.categories);
    }
    if (updatePartDto.oems) {
      part.oems = await this.oemsRepository.findByIds(updatePartDto.oems);
    }
    if (updatePartDto.brands) {
      part.brands = await this.brandsRepository.findByIds(updatePartDto.brands);
    }
    if (updatePartDto.cars) {
      part.cars = await this.carsRepository.findByIds(updatePartDto.cars);
    }

    return await this.partsRepository.save(part);
  }

  async remove(id: number) {
    const existingPart = await this.partsRepository.findOne({ where: { id } });
    if (!existingPart) {
      throw new NotFoundException(`ID ${id} ga ega mahsulot topilmadi!`);
    }
    await this.partsRepository.delete(id);
    return { message: `Mahsulot muvaffaqiyatli o‘chirildi!` };
  }

  async getPartsByCategory(categoryId: number) {
    const queryBuilder = this.categoriesRepository.createQueryBuilder('category');
  
    // Kategoriyani ID bo'yicha topish va unga tegishli part-larni olib kelish
    const category = await queryBuilder
      .leftJoinAndSelect('category.parts', 'part')  // Kategoriyaga tegishli part-larni olish
      .where('category.id = :categoryId', { categoryId })
      .getOne();
  
    if (!category) {
      throw new NotFoundException(`Bunday kategoriya topilmadi!`);
    }
  
    // Kategoriya ma'lumotlari va part-larni qaytarish
    return {
      category,  // Kategoriya haqida to'liq ma'lumot
      parts: category.parts,  // Kategoriya ichidagi barcha part-lar
    };
  }
  

  async getAllOem() {
    const distinctOems = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.oem')
      .getRawMany();

    return distinctOems.map(oem => oem.oem);
  }

  async getOemId(oem: string) {
    const trts = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.trtCode')
      .where('part.oem = :oem', { oem })
      .getRawMany();
    return trts.map(trt => trt.trtCode);
  }

  async getTrtCode(trt: string) {
    const brands = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.brand')
      .where('part.trtCode = :trt', { trt })
      .getRawMany();
    return brands.map(brand => brand.brand);
  }

  async getBrand(brand: string) {
    const models = await this.partsRepository
      .createQueryBuilder('part')
      .select('DISTINCT part.model')
      .where('part.brand = :brand', { brand })
      .getRawMany();
    return models.map(model => model.model);
  }

  async search(oem: string, trt: string, brand: string, model: string) {
    const queryBuilder = this.partsRepository.createQueryBuilder('part');

    if (oem) queryBuilder.andWhere('LOWER(part.oem) = LOWER(:oem)', { oem: oem.toLowerCase() });
    if (trt) queryBuilder.andWhere('LOWER(part.trtCode) = LOWER(:trt)', { trt: trt.toLowerCase() });
    if (brand) queryBuilder.andWhere('LOWER(part.brand) = LOWER(:brand)', { brand: brand.toLowerCase() });
    if (model) queryBuilder.andWhere('LOWER(part.model) = LOWER(:model)', { model: model.toLowerCase() });

    const parts = await queryBuilder.getMany();
    return parts;
  }

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    if (categories.length === 0) {
      throw new Error('No categories found!');
    }
    return categories.sort((a, b) => a.id - b.id);
  }
  
  

  async searchByName(name: string) {
    const parts = await this.partsRepository
      .createQueryBuilder('part')
      .where('LOWER(part.name) LIKE LOWER(:name)', { name: `%${name.toLowerCase()}%` })
      .getMany();

    if (parts.length === 0) {
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
    const imagePath = path.join(__dirname, '..', '..', 'uploads', imageName);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    } else {
      return null;
    }
  }
  
}
