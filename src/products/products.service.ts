import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { HttpService } from '@nestjs/axios';
import { FakeStoreProduct } from './interfaces/fakestore-product.interface';
import { lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private httpService: HttpService,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    const response$ = this.httpService
      .get<FakeStoreProduct[]>('https://fakestoreapi.com/products')
      .pipe(
        map((response: AxiosResponse<FakeStoreProduct[]>) =>
          response.data.map((fakeProduct) =>
            Object.assign(new Product(), {
              ...fakeProduct,
              stock: Math.floor(Math.random() * 100),
            }),
          ),
        ),
      );
    const fakeProducts = await lastValueFrom(response$);

    const dbProducts = await this.productsRepository.find();

    return [...fakeProducts, ...dbProducts].map(
      (product) => new ProductDto(product),
    );
  }

  async findOne(id: number): Promise<ProductDto> {
    const dbProduct = await this.productsRepository.findOne({ where: { id } });
    if (dbProduct) {
      return new ProductDto(dbProduct);
    }

    const response$ = this.httpService
      .get<FakeStoreProduct>(`https://fakestoreapi.com/products/${id}`)
      .pipe(map((response: AxiosResponse<FakeStoreProduct>) => response.data));

    const fakeProduct = await lastValueFrom(response$);
    if (!fakeProduct) {
      throw new NotFoundException(
        `Product with ID ${id} not found in FakeStore`,
      );
    }

    return new ProductDto({
      ...fakeProduct,
      stock: Math.floor(Math.random() * 100),
    });
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const newProduct = this.productsRepository.create(createProductDto);
    const savedProduct = await this.productsRepository.save(newProduct);
    return new ProductDto(savedProduct);
  }

  async updateStock(
    id: number,
    updateProductStockDto: UpdateProductStockDto,
  ): Promise<ProductDto> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    product.stock = updateProductStockDto.stock;
    const updatedProduct = await this.productsRepository.save(product);
    return new ProductDto(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
