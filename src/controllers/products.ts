import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from 'src/models/product';
import { ServiceProduct } from 'src/services/product';

@Controller('product')
export class ControllerProducts {
  constructor(private productService: ServiceProduct) {}

  @Get('all')
  getAllProducts(): Promise<Product[]> {
    const result = this.productService.getAllProducts();
    return result;
  }

  @Get(':id')
  getProductById(
    @Param() params: { id: number },
  ): Promise<Product | { error: string }> {
    const result = this.productService.getProductById(params.id);
    return result;
  }

  @Post()
  createProduct(
    @Body() product: Product,
  ): Promise<Product | { error: string }> {
    const result = this.productService.createProduct(product);
    return result;
  }

  @Put()
  updateProduct(
    @Body() product: Product,
  ): Promise<Product | { error: string }> {
    const result = this.productService.updateProduct(product);
    return result;
  }

  @Delete(':id')
  deleteProduct(
    @Param() params: { id: number },
  ): Promise<{ error: string } | { message: string }> {
    const result = this.productService.deleteProduct(params.id);
    return result;
  }
}
