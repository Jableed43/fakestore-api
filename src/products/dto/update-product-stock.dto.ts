import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductStockDto {
  @ApiProperty({
    description: 'The stock quantity of the product',
    type: Number,
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
