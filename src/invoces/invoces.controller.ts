import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InvocesService } from './invoces.service';
import { CreateInvoceDto } from './dto/create-invoce.dto';
import { UpdateInvoceDto } from './dto/update-invoce.dto';
import { SearchInvoiceDTO } from './dto/search-invoce.dto';

@ApiTags('Invoices')
@Controller('invoces')
export class InvocesController {
  constructor(private readonly invocesService: InvocesService) {}

  @Post()
  @ApiOkResponse({ description: 'Invoice created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Invoice create',
    description: 'This endpoint created an invoice',
  })
  create(@Body() createInvoceDto: CreateInvoceDto) {
    return this.invocesService.create(createInvoceDto);
  }

  @Get()
  @ApiOkResponse({ description: 'return array of invoices' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Search many invoices',
    description:
      'This endpoint search many invoices for nroInvoice, supplierid or nothing for all invoice',
  })
  findAll(@Query() searchInvoceDto: SearchInvoiceDTO) {
    return this.invocesService.findAll(searchInvoceDto);
  }

  @Get(':term')
  @ApiOkResponse({ description: 'return one invoice' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Search one invoice',
    description:
      'This endpoint search one invoice for nroInvoice or supplierid ',
  })
  findOne(@Param('term') term: string) {
    return this.invocesService.findOne(term);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'return update invoice' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Update one invoice',
    description: 'This endpoint update one with id',
  })
  update(@Param('id') id: string, @Body() updateInvoceDto: UpdateInvoceDto) {
    return this.invocesService.update(id, updateInvoceDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Delete one invoice',
    description:
      'This endpoint delete one invoice for id and the transaction relations',
  })
  async remove(@Res() response, @Param('id') id: string) {
    await this.invocesService.remove(id);
    return response.status(HttpStatus.OK).send(`Invoice with id ${id} delete`);
  }
}
