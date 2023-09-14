/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SearchInvoiceDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  nroInvoce?: number;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  supplierId?: string;
}
