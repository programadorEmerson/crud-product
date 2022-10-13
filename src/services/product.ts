import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from 'src/models/product';

@Injectable()
export class ServiceProduct {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    const productToCreate = await this.productModel.findOne({
      where: { name: product.name },
    });
    if (productToCreate) {
      throw new BadRequestException('Product already exists');
    }
    await this.productModel.create(product);
    return product;
  }

  async updateProduct(product: Product): Promise<any> {
    const productToUpdate = await this.productModel.findOne({
      where: { id: product.id },
    });
    if (!productToUpdate) {
      throw new NotFoundException('Product not found');
    }
    return await this.productModel.update(product, {
      where: { id: product.id },
    });
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await this.productModel.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productModel.destroy({ where: { id } });
    return { message: `Product with id ${id} deleted` };
  }
}
