import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const existingCar = await this.carsRepository.findOne({
      where: { name: createCarDto.name, model: createCarDto.model },
    });
    if (existingCar) {
      throw new ConflictException(`Bunday car mavjud: ${createCarDto.name} ${createCarDto.model}`);
    }

    const car = this.carsRepository.create(createCarDto);
    return await this.carsRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.carsRepository.find();
    if (cars.length === 0) {
      throw new NotFoundException('Hech qanday car topilmadi');
    }
    return cars;
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carsRepository.findOne({where: {id}});
    if (!car) {
      throw new NotFoundException(`Car topilmadi, id: ${id}`);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id);

    if (updateCarDto.name || updateCarDto.model) {
      const existingCar = await this.carsRepository.findOne({
        where: { name: updateCarDto.name, model: updateCarDto.model },
      });
      if (existingCar) {
        throw new ConflictException(`Bunday car mavjud: ${updateCarDto.name} ${updateCarDto.model}`);
      }
      car.name = updateCarDto.name || car.name;
      car.model = updateCarDto.model || car.model;
    }

    return this.carsRepository.save(car);
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id);
    await this.carsRepository.remove(car);
  }
}
