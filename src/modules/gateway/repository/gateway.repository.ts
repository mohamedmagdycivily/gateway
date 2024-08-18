import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Gateway } from '../entity/gateway.entity';
import { ObjectId } from 'mongodb';
import { CreateGatewayDto, PeripheralDto } from '../dto/gateway.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Peripheral } from 'src/modules/peripheral/entity/peripheral.entity';

export class GatewayRepository {
  constructor(
    @InjectRepository(Gateway)
    private readonly GatewayRepo: MongoRepository<Gateway>,
  ) {}

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    const gateway = this.GatewayRepo.create({
      ...createGatewayDto,
      peripheralIds: [],
    });
    return this.GatewayRepo.save(gateway);
  }

  async findOneById(id: ObjectId): Promise<Gateway | null> {
    return this.GatewayRepo.findOne({
      where: { _id: id },
      relations: ['peripheralIds'],
    });
  }

  async addPeripheral(gatewayId: ObjectId, idPeripheral: ObjectId): Promise<Gateway> {
    let gateway;
    if(gatewayId){
      gateway = await this.GatewayRepo.findOne({
        where: { _id: gatewayId },
        relations: ['peripheralIds'],
      });
      if(!gateway){
        throw new NotFoundException('Gateway not found.');
      }
      if (gateway.peripheralIds.length >= 10) {
        throw new BadRequestException('Cannot add more than 10 peripherals to this gateway.');
      }
    }

    if (!gateway) {
      // If the gateway with the given ObjectId does not exist, find a gateway with fewer than 10 peripherals
      gateway = await this.GatewayRepo.findOne({
        where: {
          $expr: {
            $lt: [
              { $size: { $ifNull: ['$peripheralIds', []] } }, // Handle missing peripheralIds array
              10,
            ],
          },
        },
      });

      if (!gateway) {
        throw new NotFoundException('No available gateway with less than 10 peripherals found.');
      }
    }

    await this.GatewayRepo.updateOne(
      { _id: gateway.id },
      // @ts-ignore
      { $push: { peripheralIds: idPeripheral } } 
    );

    gateway.peripheralIds.push(idPeripheral);
    return gateway;
  }

  async removePeripheral(peripheralId: ObjectId): Promise<Gateway> {
    const gateway = await this.findGatewayByPeripheralId(peripheralId);
    if (!gateway) {
      throw new NotFoundException('the peripheral does not belong to any gateway.');
    }
    // Remove the peripheral ID from the gateway's peripheralIds array
    const result = await this.GatewayRepo.updateOne(
      { _id: gateway.id },
      // @ts-ignore
      { $pull: { peripheralIds: peripheralId } } // Remove the peripheral ID from the array
    );

    if (result.modifiedCount === 0) {
      throw new BadRequestException('Peripheral not found in the gateway.');
    }

    // Ensure that the gateway object is updated with the new list of peripheral IDs
    gateway.peripheralIds = gateway.peripheralIds.filter(id => !id.equals(peripheralId));
    return gateway;
  }

  findAll(): Promise<Gateway[]> {
    return this.GatewayRepo.find();
  }

  async findGatewayByPeripheralId(peripheralId: ObjectId): Promise<Gateway | null> {
    return this.GatewayRepo.findOne({
      where: { peripheralIds: peripheralId },
      relations: ['peripheralIds'],
    });
  }
  
}
