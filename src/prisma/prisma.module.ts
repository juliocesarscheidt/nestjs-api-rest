import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  imports: [], // importar outros modulos
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
