import { Controller, Post, Body, Param } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto, PeripheralDto } from './dto/gateway.dto';
import { Gateway } from './entity/gateway.entity';

@Controller('gateways')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  async create(@Body() createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.gatewayService.create(createGatewayDto);
  }

  // @Post(':id/peripherals')
  // async addPeripheral(
  //   @Param('id') id: string,
  //   @Body() peripheralDto: PeripheralDto,
  // ): Promise<Gateway> {
  //   return this.gatewayService.addPeripheral(id, peripheralDto);
  // }
}
