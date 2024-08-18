import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  GatewayInterface,
  GatewayInterfaceToken,
} from './interface/gateway.interface';
import { CreateGatewayDto, PeripheralDto } from './dto/gateway.dto';
import { Gateway } from './entity/gateway.entity';
import { ObjectId } from 'typeorm';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(GatewayInterfaceToken) private readonly GatewayRepo: GatewayInterface,
  ) {}
  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.GatewayRepo.create(createGatewayDto);
  }

  async findAll(){
    return this.GatewayRepo.findAll();
  }

  async findOneById(id: ObjectId): Promise<Gateway> {
    const gateway = await this.GatewayRepo.findOneById(id);
    if (!gateway) {
      throw new NotFoundException('Gateway not found.');
    }
    return gateway;
  }

  async addPeripheral(idGateway: ObjectId, idPeripheral: ObjectId): Promise<Gateway> {
    return this.GatewayRepo.addPeripheral(idGateway, idPeripheral);
  }

  async removePeripheral(idPeripheral: ObjectId): Promise<Partial<Gateway>> {
    return this.GatewayRepo.removePeripheral(idPeripheral);
  }
}
