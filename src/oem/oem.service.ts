import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OEM } from './entities/oem.entity';
import { CreateOemDto } from './dto/create-oem.dto';
import { UpdateOemDto } from './dto/update-oem.dto';

@Injectable()
export class OemsService {
  constructor(
    @InjectRepository(OEM)
    private oemsRepository: Repository<OEM>,
  ) {}

  async create(createOemDto: CreateOemDto): Promise<OEM> {
    const existingOem = await this.oemsRepository.findOne({
      where: { code: createOemDto.code },
    });
    if (existingOem) {
      throw new ConflictException(`Bunday OEM mavjud: ${createOemDto.code}`);
    }

    const oem = this.oemsRepository.create(createOemDto);
    return await this.oemsRepository.save(oem);
  }

  async findAll(): Promise<OEM[]> {
    const oems = await this.oemsRepository.find();
    if (oems.length === 0) {
      throw new NotFoundException('Hech qanday OEM topilmadi');
    }
    return oems;
  }

  async findOne(id: number): Promise<OEM> {
    const oem = await this.oemsRepository.findOne({where: {id}});
    if (!oem) {
      throw new NotFoundException(`OEM topilmadi, id: ${id}`);
    }
    return oem;
  }

  async update(id: number, updateOemDto: UpdateOemDto): Promise<OEM> {
    const oem = await this.findOne(id);

    if (updateOemDto.code) {
      const existingOem = await this.oemsRepository.findOne({
        where: { code: updateOemDto.code },
      });
      if (existingOem) {
        throw new ConflictException(`Bunday OEM mavjud: ${updateOemDto.code}`);
      }
      oem.code = updateOemDto.code || oem.code;
    }

    return this.oemsRepository.save(oem);
  }

  async remove(id: number): Promise<void> {
    const oem = await this.findOne(id);
    await this.oemsRepository.remove(oem);
  }
}
