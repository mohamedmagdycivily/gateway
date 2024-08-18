import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PeripheralInterface } from '../interface/peripheral.interface';
import { Peripheral, PeripheralStatus } from '../entity/peripheral.entity';
import { ObjectId } from 'mongodb';

export class PeripheralRepository implements PeripheralInterface {
  constructor(
    @InjectRepository(Peripheral)
    private readonly PeripheralRepo: MongoRepository<Peripheral>
  ) {}

  async create(peripheral: Partial<Peripheral>): Promise<Peripheral> {
    peripheral.dateCreated = new Date();
    peripheral.status = PeripheralStatus.ONLINE;
    const newPeripheral = this.PeripheralRepo.create(peripheral);
    return this.PeripheralRepo.save(newPeripheral);
  }

  async deletePeripheralById(peripheralId: ObjectId): Promise<void> {
    await this.PeripheralRepo.deleteOne({ _id: peripheralId });
  }

  async findOneById(id: ObjectId): Promise<Peripheral | null> {
    return this.PeripheralRepo.findOne( {where: { _id: id }});
  }
  
  async updatePeripheralStatus(peripheralId: ObjectId, status: string): Promise<Peripheral | null> {
    const result = await this.PeripheralRepo.findOneAndUpdate(
      { _id: peripheralId }, // Find the peripheral by its ObjectId
      { $set: { status } },  // Update the status field
      { returnDocument: 'after' } // Return the updated document
    );

    return result.value;
  }

  async findAll(): Promise<Peripheral[]> {
    return this.PeripheralRepo.find();
  }
}
