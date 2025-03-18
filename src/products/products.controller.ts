import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { ProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, type: [ProductDto] })
  async findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, type: ProductDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id') id: number): Promise<ProductDto> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, type: ProductDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.create(createProductDto);
  }

  @Put(':id/stock')
  @ApiOperation({ summary: 'Actualizar el stock de un producto' })
  @ApiResponse({ status: 200, type: ProductDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async updateStock(
    @Param('id') id: number,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ): Promise<ProductDto> {
    return this.productsService.updateStock(id, updateProductStockDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
