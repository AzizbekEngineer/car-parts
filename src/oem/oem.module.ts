import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OEM } from './entities/oem.entity';
import { OemsService } from './oem.service';
import { OemsController } from './oem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OEM])],
  providers: [OemsService],
  controllers: [OemsController],
})
export class OemsModule {}
