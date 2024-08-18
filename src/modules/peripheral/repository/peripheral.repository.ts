import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PeripheralInterface } from '../interface/peripheral.interface';
import { Peripheral } from '../entity/peripheral.entity';
import { ObjectId } from 'mongodb';

export class PeripheralRepository implements PeripheralInterface {
  constructor(
    @InjectRepository(Peripheral)
    private readonly PeripheralRepo: MongoRepository<Peripheral>
  ) {}

  async create(peripheral: Partial<Peripheral>): Promise<Peripheral> {
    peripheral.dateCreated = new Date();
    const newPeripheral = this.PeripheralRepo.create(peripheral);
    return this.PeripheralRepo.save(newPeripheral);
  }

  async deletePeripheralById(peripheralId: ObjectId): Promise<void> {
    await this.PeripheralRepo.deleteOne({ _id: peripheralId });
  }

}
