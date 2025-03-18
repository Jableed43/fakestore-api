import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test Description',
  category: 'Test Category',
  image: 'http://image.url',
  stock: 50,
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            create: jest.fn().mockResolvedValue(mockProduct),
            updateStock: jest.fn().mockResolvedValue(mockProduct),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return a product by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);
    expect(await controller.findOne(1)).toEqual(mockProduct);
  });

  it('should create a new product', async () => {
    const createProductDto: CreateProductDto = {
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: 'Test Category',
      image: 'http://image.url',
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockProduct);
    expect(await controller.create(createProductDto)).toEqual(mockProduct);
  });

  it('should update the stock of a product', async () => {
    const updateProductStockDto: UpdateProductStockDto = { stock: 50 };
    jest.spyOn(service, 'updateStock').mockResolvedValue(mockProduct);
    expect(await controller.updateStock(1, updateProductStockDto)).toEqual(
      mockProduct,
    );
  });

  it('should remove a product', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    expect(await controller.remove(1)).toBeUndefined();
  });
});
