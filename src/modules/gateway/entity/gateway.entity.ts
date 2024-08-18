import { Entity, ObjectIdColumn, Column, ManyToOne, ObjectId, BeforeInsert } from 'typeorm';
import { Peripheral } from './../../peripheral/entity/peripheral.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Gateway {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  serialNumber: string;

  @Column()
  name: string;

  @Column()
  ipAddress: string;

  @Column({ type: 'array', nullable: true })
  peripheralIds: ObjectId[] = [];

  @BeforeInsert()
  generateSerialNumber() {
    this.serialNumber = uuidv4();
  }
}
