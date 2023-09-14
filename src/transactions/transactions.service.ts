import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { InvocesService } from 'src/invoces/invoces.service';
import { invoiceState, transactionType } from 'src/common/constant';
import { SearchByInvoiceTransactionDto } from './dto/searchByInvoice-transaction.dto';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger('TransactionService');

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepositori: Repository<Transaction>,
    private readonly invoiceService: InvocesService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    let amountTotalTransaction = 0;

    try {
      const invoice = await this.invoiceService.findOne(
        createTransactionDto.invoiceId,
      );

      if (invoice.state === invoiceState.FINISH)
        throw new BadRequestException(
          `Invoices with id ${createTransactionDto.invoiceId} are finished`,
        );

      if (
        invoice.amount !== createTransactionDto.amount &&
        createTransactionDto.type === transactionType.COMPLETE
      )
        throw new BadRequestException(
          `Payment amount and invoice amount do not match for a payment completed`,
        );

      if (
        createTransactionDto.type === transactionType.PARTIAL &&
        invoice.amount <= createTransactionDto.amount
      )
        throw new BadRequestException(
          `the payment amount is equal to or greater than the invoice for a partial type payment `,
        );

      const transactionsInvoices = await this.transactionRepositori.find({
        where: { invoiceId: createTransactionDto.invoiceId },
      });

      if (
        createTransactionDto.type === transactionType.COMPLETE &&
        transactionsInvoices.length > 0
      ) {
        throw new BadRequestException(
          `Invoices with id ${createTransactionDto.invoiceId} has partial payment, cannot receive a payment of type complete`,
        );
      }

      amountTotalTransaction += createTransactionDto.amount;

      if (transactionsInvoices.length > 0) {
        transactionsInvoices.forEach((transaction) => {
          amountTotalTransaction += transaction.amount;
        });
      }

      if (invoice.amount < amountTotalTransaction)
        throw new BadRequestException(
          `the amount ${amountTotalTransaction} exceeds the invoice amount ${createTransactionDto.invoiceId}, please check the payment amount `,
        );

      const transaction =
        this.transactionRepositori.create(createTransactionDto);
      await this.transactionRepositori.save(transaction);

      if (invoice.amount === amountTotalTransaction) {
        await this.invoiceService.update(createTransactionDto.invoiceId, {
          state: invoiceState.FINISH,
        });
      }

      return transaction;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAll(searchByInvoiceTransactionDto: SearchByInvoiceTransactionDto) {
    try {
      if (searchByInvoiceTransactionDto) {
        return await this.transactionRepositori.find({
          where: {
            invoiceId: searchByInvoiceTransactionDto.invoiceId,
          },
        });
      }

      return await this.transactionRepositori.find({});
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findOne(term: string) {
    let transaction: Transaction;

    try {
      transaction = await this.transactionRepositori.findOne({
        where: { id: term },
        relations: ['invoice'],
      });

      if (!transaction) {
        transaction = await this.transactionRepositori.findOne({
          where: { invoiceId: term },
          relations: ['invoice'],
        });
      }

      if (!transaction)
        throw new NotFoundException(`Transaction with id ${term} not found`);

      return transaction;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);

    if (error instanceof NotFoundException) throw error;

    if (error instanceof BadRequestException) throw error;

    this.logger.error(error);
    throw new Error(`Internal server error - check de logs`);
  }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
