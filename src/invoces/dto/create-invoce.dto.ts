import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  MinDate,
  IsDate,
} from 'class-validator';
export class CreateInvoceDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  nroInvoce: number;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  dueDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['Pending', 'Finished'])
  state?: string;

  @ApiProperty()
  @IsUUID()
  supplierId: string;
}
