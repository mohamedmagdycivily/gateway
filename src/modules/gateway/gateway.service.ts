import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  GatewayInterface,
  GatewayInterfaceToken,
} from './interface/gateway.interface';
import { CreateGatewayDto, PeripheralDto } from './dto/gateway.dto';
import { Gateway } from './entity/gateway.entity';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(GatewayInterfaceToken) private readonly GatewayRepo: GatewayInterface,
  ) {}
  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.GatewayRepo.create(createGatewayDto);
  }

  async addPeripheral(serialNumber: string, peripheralDto: PeripheralDto): Promise<Gateway> {
    return this.GatewayRepo.addPeripheral(serialNumber, peripheralDto);
  }
}
