import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger('SupplierService');

  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const supplier = this.supplierRepository.create(createSupplierDto);
      await this.supplierRepository.save(supplier);
      return supplier;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAll() {
    try {
      return await this.supplierRepository.find({});
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findOne(term: string) {
    let supplier: Supplier;

    try {
      supplier = await this.supplierRepository.findOne({
        where: { name: term },
      });

      if (!supplier) {
        supplier = await this.supplierRepository.findOne({
          where: { address: term },
        });
      }

      if (!supplier) {
        supplier = await this.supplierRepository.findOne({
          where: { id: term },
        });
      }

      if (!supplier)
        throw new NotFoundException(
          `Supplier with name, address, id ${term} not found`,
        );

      return supplier;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    try {
      const supplierDB = await this.findOne(id);

      const updateSupplier = this.supplierRepository.create({
        ...supplierDB,
        ...updateSupplierDto,
      });

      await this.supplierRepository.save(updateSupplier);

      return updateSupplier;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const supplier = await this.findOne(id);
      await this.supplierRepository.remove(supplier);
      return;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);

    if (error instanceof NotFoundException) throw error;

    this.logger.error(error);
    throw new Error(`Internal server error - check de logs`);
  }
}
