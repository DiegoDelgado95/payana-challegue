import { Invoice } from 'src/invoces/entities/invoce.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  amount: number;

  @Column('varchar', { length: 30 })
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @Column('text')
  invoiceId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.transactions, {
    onDelete: 'CASCADE',
  })
  invoice: Invoice;
}
