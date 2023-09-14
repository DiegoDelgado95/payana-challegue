import { IsIn, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsUUID()
  invoiceId: string;

  @ApiProperty()
  @IsIn(['Partial', 'Complete'])
  type: string;
}
