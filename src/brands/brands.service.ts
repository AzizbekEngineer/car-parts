import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const existingBrand = await this.brandsRepository.findOne({
      where: { name: createBrandDto.name },
    });
    if (existingBrand) {
      throw new ConflictException(`Bunday brand nomi allaqachon mavjud: ${createBrandDto.name}`);
    }

    const brand = this.brandsRepository.create(createBrandDto);
    return await this.brandsRepository.save(brand);
  }

  async findAll(): Promise<Brand[]> {
    const brands = await this.brandsRepository.find();
    if (brands.length === 0) {
      throw new NotFoundException('Hech qanday brand topilmadi');
    }
    return brands;
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandsRepository.findOne({where:{id}});
    if (!brand) {
      throw new NotFoundException(`Brand topilmadi, id: ${id}`);
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);

    if (updateBrandDto.name) {
      const existingBrand = await this.brandsRepository.findOne({
        where: { name: updateBrandDto.name },
      });
      if (existingBrand) {
        throw new ConflictException(`Bunday brand nomi allaqachon mavjud: ${updateBrandDto.name}`);
      }
      brand.name = updateBrandDto.name;
    }

    return this.brandsRepository.save(brand);
  }

  async remove(id: number): Promise<void> {
    const brand = await this.findOne(id);
    await this.brandsRepository.remove(brand);
  }
}
