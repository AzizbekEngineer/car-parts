import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './parts/entities/part.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PartsModule } from './parts/parts.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { BrandsModule } from './brands/brands.module';
import { CarsModule } from './cars/cars.module';
import { OemsModule } from './oem/oem.module';
import { OEM } from './oem/entities/oem.entity';
import { Brand } from './brands/entities/brand.entity';
import { Car } from './cars/entities/car.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:kzkKIsLBmILciwKoRmbLdZPtQawOsheO@switchback.proxy.rlwy.net:12532/railway',
      entities: [Part, User, Category, OEM, Brand, Car],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
    }),
    PartsModule,
    AuthModule,
    CategoriesModule,
    BrandsModule,
    CarsModule,
    OemsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
