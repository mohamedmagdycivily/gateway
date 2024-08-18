import { Entity, ObjectIdColumn, Column, ManyToOne, ObjectId } from 'typeorm';
import { Gateway } from '../../gateway/entity/gateway.entity';

export enum PeripheralStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

@Entity()
export class Peripheral {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  uid: number;

  @Column()
  vendor: string;

  @Column()
  dateCreated: Date;

  @Column({
    type: 'enum',
    enum: PeripheralStatus,
  })
  status: PeripheralStatus;

  @ManyToOne(() => Gateway, (gateway) => gateway.peripheralIds)
  gateway: Gateway;
}
