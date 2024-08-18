import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  PeripheralInterface,
  PeripheralInterfaceToken,
} from './interface/peripheral.interface';
import { GatewayService } from '../gateway/gateway.service';
import { ObjectId } from 'mongodb';
import { Peripheral, PeripheralStatus } from './entity/peripheral.entity';
import { Gateway } from '../gateway/entity/gateway.entity';

@Injectable()
export class PeripheralService {
  constructor(
    @Inject(PeripheralInterfaceToken) private readonly peripheralRepo: PeripheralInterface,
    @Inject() private readonly gatewayService: GatewayService
  ) {}

  async createPeripheral(peripheralData){
    const  peripheral = await this.peripheralRepo.create(peripheralData);
    let gateWay ;
    try{
      gateWay = await this.gatewayService.addPeripheral(null, peripheral.id);
    }catch(err){
      await this.peripheralRepo.deletePeripheralById(peripheral.id);
      throw err;
    }
    return {
      peripheral,
      gateWay
    }
  }

  async addPeripheral(idGateway: ObjectId, idPeripheral: ObjectId): Promise<Partial<Peripheral>> {
    const peripheral = await this.peripheralRepo.findOneById(idPeripheral);
    if (!peripheral ) {
      throw new NotFoundException('Peripheral not found.');
    }
    if(peripheral.status === PeripheralStatus.ONLINE){
      throw new NotFoundException('Peripheral already online and added to existing gateway.');      
    }
    await this.gatewayService.addPeripheral(idGateway, idPeripheral);
    return this.peripheralRepo.updatePeripheralStatus(idPeripheral, PeripheralStatus.ONLINE);
  }

  async removePeripheral(idPeripheral: ObjectId): Promise<Partial<Peripheral>> {
    const peripheral = await this.peripheralRepo.findOneById(idPeripheral);
    if (!peripheral ) {
      throw new NotFoundException('Peripheral not found.');
    }
    await this.gatewayService.removePeripheral(idPeripheral);
    return this.peripheralRepo.updatePeripheralStatus(idPeripheral, PeripheralStatus.OFFLINE);
  }

  async findOneById(id: ObjectId): Promise<Peripheral | null> {
    return this.peripheralRepo.findOneById(id);
  }

  async findAll(): Promise<Peripheral[]> {
    return this.peripheralRepo.findAll();
  }

}
