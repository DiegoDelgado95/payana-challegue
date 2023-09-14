import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoceDto } from './create-invoce.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateInvoceDto extends PartialType(CreateInvoceDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  id?: string;
}
