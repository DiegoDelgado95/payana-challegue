import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiTags('Suppliers')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiOkResponse({ description: 'Return supplier created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Supplier create',
    description: 'This endpoint created an supplier',
  })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Return array of supplier' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Search many suppliers',
    description: 'This endpoint search suppliers',
  })
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':term')
  @ApiOkResponse({ description: 'Return one supplier' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Search one supplier',
    description: 'This endpoint search one supplier for id, name or address ',
  })
  findOne(@Param('term') term: string) {
    return this.supplierService.findOne(term);
  }

  @Patch(':term')
  @ApiOkResponse({ description: 'Return supplier updated' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Supplier update',
    description: 'This endpoint update an supplier for id,name, or address',
  })
  update(
    @Param('term') term: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(term, updateSupplierDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Supplier delete',
    description: 'This endpoint deleted an supplier for id',
  })
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
