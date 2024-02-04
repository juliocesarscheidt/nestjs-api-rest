import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateStockOutputDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @IsDate() // ISO 8601
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;
}
