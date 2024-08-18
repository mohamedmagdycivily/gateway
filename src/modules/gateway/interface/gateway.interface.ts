import { ObjectId } from 'typeorm';
import { PeripheralDto } from '../dto/gateway.dto';
import { Gateway } from '../entity/gateway.entity';

export const GatewayInterfaceToken = Symbol('GatewayInterface');

export interface GatewayInterface {
  findOne({ serialNumber }: { serialNumber: string }): Promise<Gateway | null>;
  create(order: Partial<Gateway>): Promise<Gateway>;
  addPeripheral(idGateway: ObjectId, idPeripheral: ObjectId): Promise<Gateway>;
  findAll(): Promise<Gateway[]>;
  findOneById(id: ObjectId): Promise<Gateway | null>;
  removePeripheral(idPeripheral: ObjectId): Promise<Partial<Gateway>>;
  findGatewayByPeripheralId(idPeripheral: ObjectId): Promise<Gateway | null>;
}
