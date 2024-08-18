import { ObjectId } from "typeorm";
import { Peripheral } from "../entity/peripheral.entity";

export const PeripheralInterfaceToken = Symbol('OrderInterface');

export interface PeripheralInterface {
  create(order: Partial<Peripheral>): Promise<Peripheral>;
  deletePeripheralById(peripheralId: ObjectId): Promise<void> 
}
