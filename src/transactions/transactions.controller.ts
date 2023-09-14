import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SearchByInvoiceTransactionDto } from './dto/searchByInvoice-transaction.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOkResponse({ description: 'Return transaction created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Transaction create',
    description: 'This endpoint created an transaction',
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Return array of transaction' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Search many transactions',
    description:
      'This endpoint search transaction for invoiceId, or nothing for all',
  })
  findAll(
    @Query() searchByInvoiceTransactionDto: SearchByInvoiceTransactionDto,
  ) {
    return this.transactionsService.findAll(searchByInvoiceTransactionDto);
  }

  @Get(':term')
  @ApiOkResponse({ description: 'Return one transaction' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOperation({
    summary: 'Search one transaction',
    description: 'This endpoint search transaction for id or invoiceId',
  })
  findOne(@Param('term') term: string) {
    return this.transactionsService.findOne(term);
  }
}
