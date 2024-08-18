import { Controller, Get, Post, Param, Body, Put, Delete, Patch } from '@nestjs/common';
import { PeripheralService } from './peripheral.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeripheralDto } from './dto/peripheral.dto';
import { ObjectId } from 'mongodb';
import { Gateway } from '../gateway/entity/gateway.entity';
import { Peripheral } from './entity/peripheral.entity';

@ApiTags('peripheral')
@Controller('Peripherals')
export class PeripheralController {
  constructor(private readonly peripheralService: PeripheralService) {}

  @Post('/')
  async createPeripheral(
    @Body() peripheralDto: PeripheralDto,
  ): Promise<any> {
    return this.peripheralService.createPeripheral(peripheralDto);
  }

  @Post(':idPeripheral/gateway/:idGateway')
  async addPeripheral(
    @Param('idGateway') idGateway: string,
    @Param('idPeripheral') idPeripheral: string,
  ): Promise<Partial<Gateway>> {
    return this.peripheralService.addPeripheral(new ObjectId(idGateway), new ObjectId(idPeripheral));
  }

  @Patch(':idPeripheral')
  async removePeripheral(
    @Param('idPeripheral') idPeripheral: string,
  ): Promise<Partial<Gateway>> {
    return this.peripheralService.removePeripheral(new ObjectId(idPeripheral));
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Peripheral | null> {
    const objectId = new ObjectId(id);  // Convert the string to ObjectId
    return this.peripheralService.findOneById(objectId);
  }

  @Get()
  async findAll(): Promise<Peripheral[]> {
    return this.peripheralService.findAll();
  }
}
