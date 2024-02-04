import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StockInputsModule } from './stock-inputs/stock-inputs.module';
import { StockOutputsModule } from './stock-outputs/stock-outputs.module';

@Module({
  imports: [ProductsModule, StockInputsModule, StockOutputsModule], // importar outros modulos
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
