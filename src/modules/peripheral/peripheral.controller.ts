import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { PeripheralService } from './peripheral.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeripheralDto } from './dto/peripheral.dto';
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
}
