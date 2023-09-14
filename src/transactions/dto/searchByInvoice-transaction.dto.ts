/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class SearchByInvoiceTransactionDto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  invoiceId?: string;
}
