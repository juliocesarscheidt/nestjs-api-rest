import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StockInputsModule } from './stock-inputs/stock-inputs.module';
import { StockOutputsModule } from './stock-outputs/stock-outputs.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ProductsModule,
    StockInputsModule,
    StockOutputsModule,
    ThrottlerModule.forRoot([
      // 100 requests per minute
      {
        ttl: 60000, // 1 minute
        limit: 100,
      },
    ]),
  ], // importar outros modulos
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
