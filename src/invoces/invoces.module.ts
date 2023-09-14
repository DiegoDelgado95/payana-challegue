import { Module } from '@nestjs/common';
import { InvocesService } from './invoces.service';
import { InvocesController } from './invoces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoce.entity';
import { SupplierModule } from 'src/supplier/supplier.module';

@Module({
  controllers: [InvocesController],
  providers: [InvocesService],
  imports: [TypeOrmModule.forFeature([Invoice]), SupplierModule],
  exports: [TypeOrmModule, InvocesService],
})
export class InvocesModule {}
