import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository: Repository<Product>;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of products from API', async () => {
    const fakeProducts = [
      {
        id: 1,
        title: 'Producto 1',
        price: 100,
        description: 'Descripción 1',
        category: 'Categoría 1',
        image: 'https://example.com/product1.jpg',
      },
    ];

    const mockResponse: AxiosResponse<any> = {
      data: fakeProducts,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} } as InternalAxiosRequestConfig,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const products = await service.findAll();
    expect(products).toHaveLength(1);
    expect(products[0].title).toBe('Producto 1');
  });

  it('should return a single product from local DB', async () => {
    const mockProduct = new Product();
    mockProduct.id = 1;
    mockProduct.title = 'Producto Local';
    mockProduct.price = 150;

    jest.spyOn(productsRepository, 'findOne').mockResolvedValue(mockProduct);

    const product = await service.findOne(1);
    expect(product).toBeDefined();
    expect(product.title).toBe('Producto Local');
  });

  it('should create a new product', async () => {
    const newProduct = {
      title: 'Nuevo Producto',
      price: 200,
      description: 'Descripción',
      category: 'Categoría',
      image: 'https://example.com/image.jpg',
    };

    jest
      .spyOn(productsRepository, 'save')
      .mockResolvedValue(newProduct as Product);

    const createdProduct = await service.create(newProduct);
    expect(createdProduct.title).toBe('Nuevo Producto');
  });

  it('should update stock', async () => {
    const mockProduct = new Product();
    mockProduct.id = 1;
    mockProduct.stock = 10;

    jest.spyOn(productsRepository, 'findOne').mockResolvedValue(mockProduct);
    jest
      .spyOn(productsRepository, 'save')
      .mockResolvedValue({ ...mockProduct, stock: 50 });

    const updatedProduct = await service.updateStock(1, { stock: 50 });
    expect(updatedProduct.stock).toBe(50);
  });

  it('should delete a product', async () => {
    jest
      .spyOn(productsRepository, 'delete')
      .mockResolvedValue({ affected: 1 } as
        | DeleteResult
        | Promise<DeleteResult>);

    await expect(service.remove(1)).resolves.toBeUndefined();
  });
});
