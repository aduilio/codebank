import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    create(createProductDto: CreateProductDto) {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }

    findAll() {
        return this.productRepository.find();
    }

    findOne(id: string) {
        return this.productRepository.findOne(id)
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        await this.productRepository.update(id, updateProductDto);
        return this.productRepository.findOne(id)
    }

    async remove(id: string) {
        await this.productRepository.delete(id)
    }
}
