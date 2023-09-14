import { Invoice } from 'src/invoces/entities/invoce.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//nombre, dirección y detalles de contacto
@Entity({ name: 'suppliers' })
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

  @Column('varchar')
  address: string;

  @Column('text')
  detailsContact: string;

  @OneToMany(() => Invoice, (invoce) => invoce.supplier, {
    cascade: ['remove'],
  })
  invoices: Invoice[];
}
