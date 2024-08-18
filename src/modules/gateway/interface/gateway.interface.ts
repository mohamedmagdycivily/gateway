import { PeripheralDto } from '../dto/gateway.dto';
import { Gateway } from '../entity/gateway.entity';

export const GatewayInterfaceToken = Symbol('GatewayInterface');

export interface GatewayInterface {
  findOne({ serialNumber }: { serialNumber: string }): Promise<Gateway | null>;
  create(order: Partial<Gateway>): Promise<Gateway>;
  addPeripheral(serialNumber: string, peripheralDto: PeripheralDto): Promise<Gateway>;
}
