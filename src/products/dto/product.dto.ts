import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.category = product.category;
    this.image = product.image;
    this.stock = product.stock;
  }
}
