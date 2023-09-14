import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreateInvoceDto } from './dto/create-invoce.dto';
import { UpdateInvoceDto } from './dto/update-invoce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoce.entity';
import { Repository } from 'typeorm';
import { SupplierService } from 'src/supplier/supplier.service';
import { SearchInvoiceDTO } from './dto/search-invoce.dto';

@Injectable()
export class InvocesService {
  private readonly logger = new Logger('InvocesService');

  constructor(
    @InjectRepository(Invoice)
    private readonly invocesRepository: Repository<Invoice>,
    private readonly supplierService: SupplierService,
  ) {}

  async create(createInvoceDto: CreateInvoceDto) {
    try {
      await this.supplierService.findOne(createInvoceDto.supplierId);
      const invoce = this.invocesRepository.create(createInvoceDto);
      await this.invocesRepository.save(invoce);
      return invoce;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAll(searchInvoceDto: SearchInvoiceDTO) {
    let invoicesNro: Invoice[];
    let invoicesSupplier: Invoice[];

    if (searchInvoceDto.nroInvoce) {
      invoicesNro = await this.invocesRepository.find({
        where: {
          nroInvoce: +searchInvoceDto.nroInvoce,
        },
        relations: ['supplier', 'transactions'],
      });
    }

    if (searchInvoceDto.supplierId) {
      invoicesSupplier = await this.invocesRepository.find({
        where: {
          supplierId: searchInvoceDto.supplierId,
        },
        relations: ['supplier', 'transactions'],
      });
    }

    if (invoicesNro && invoicesSupplier) {
      return invoicesNro.concat(invoicesSupplier);
    } else if (invoicesNro) {
      return invoicesNro;
    } else if (invoicesSupplier) {
      return invoicesSupplier;
    }

    return await this.invocesRepository.find();
  }

  async findOne(term: string) {
    try {
      let invoce: Invoice;
      if (!isNaN(+term)) {
        invoce = await this.invocesRepository.findOne({
          where: { nroInvoce: +term },
          relations: ['supplier', 'transactions'],
        });
      }

      if (!invoce) {
        invoce = await this.invocesRepository.findOne({
          where: { id: term },
          relations: ['supplier', 'transactions'],
        });
      }

      if (!invoce) {
        invoce = await this.invocesRepository.findOne({
          where: { supplierId: term },
          relations: ['supplier', 'transactions'],
        });
      }

      if (!invoce) {
        throw new NotFoundException(
          `Invoce with nro, supplier, id ${term} not found`,
        );
      }

      return invoce;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async update(id: string, updateInvoceDto: UpdateInvoceDto) {
    try {
      const invoceDB = await this.findOne(id);
      if (invoceDB.supplierId !== updateInvoceDto.supplierId) {
        await this.supplierService.findOne(updateInvoceDto.supplierId);
      }

      const updateInvoce = this.invocesRepository.create({
        ...invoceDB,
        ...updateInvoceDto,
      });

      await this.invocesRepository.save(updateInvoce);
      return updateInvoce;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const invoce = await this.findOne(id);
      await this.invocesRepository.remove(invoce);
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
