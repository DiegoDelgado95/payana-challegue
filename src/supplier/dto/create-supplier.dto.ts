import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSupplierDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  detailsContact: string;
}
