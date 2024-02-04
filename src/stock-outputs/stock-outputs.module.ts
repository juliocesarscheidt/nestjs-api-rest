import { Module } from '@nestjs/common';
import { StockOutputsService } from './stock-outputs.service';
import { StockOutputsController } from './stock-outputs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // importar outros modulos
  controllers: [StockOutputsController],
  providers: [StockOutputsService],
  exports: [],
})
export class StockOutputsModule {}
