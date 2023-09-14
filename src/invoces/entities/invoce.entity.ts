import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'invoces' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { unique: true })
  nroInvoce: number;

  @Column('timestamp')
  dueDate: Date;

  @Column('int')
  amount: number;

  @Column('varchar', { default: 'Pending', length: 30 })
  state: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column('text')
  supplierId: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.invoices, {
    onDelete: 'CASCADE',
  })
  supplier: Supplier;

  @OneToMany(() => Transaction, (transaction) => transaction.invoice, {
    cascade: ['remove'],
  })
  transactions: Transaction[];
}
