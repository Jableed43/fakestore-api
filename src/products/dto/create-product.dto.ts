import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The title of the product',
    type: String,
    example: 'Test Product',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'A description of the product',
    type: String,
    example: 'This is a test product.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The category of the product',
    type: String,
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'The image URL of the product',
    type: String,
    example: 'http://image.url',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
