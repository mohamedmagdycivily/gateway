import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto, PeripheralDto } from './dto/gateway.dto';
import { Gateway } from './entity/gateway.entity';
import { ObjectId } from 'mongodb';

@Controller('gateways')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  async create(@Body() createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.gatewayService.create(createGatewayDto);
  }

  @Get()
  async findAll(): Promise<Gateway[]> {
    return this.gatewayService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Gateway> {
    const objectId = new ObjectId(id);  // Convert the string to ObjectId
    return this.gatewayService.findOneById(objectId);
  }
}
