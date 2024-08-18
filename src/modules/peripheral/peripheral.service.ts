import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  PeripheralInterface,
  PeripheralInterfaceToken,
} from './interface/peripheral.interface';
import { GatewayService } from '../gateway/gateway.service';

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
      gateWay = await this.gatewayService.addPeripheral(null, peripheral);
    }catch(err){
      await this.peripheralRepo.deletePeripheralById(peripheral.id);
      throw err;
    }
    return {
      peripheral,
      gateWay
    }
  }

}
