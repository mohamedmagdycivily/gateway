import { Controller, Get, Post, Param, Body, Put, Delete, Patch, NotAcceptableException } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Create a new peripheral' })
  @ApiBody({
    description: 'Data for the new peripheral',
    type: PeripheralDto,
    examples: {
      example1: {
        summary: 'A basic peripheral',
        value: {
          "uid": 1234,
          "vendor": "TV"
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Peripheral created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async createPeripheral(
    @Body() peripheralDto: PeripheralDto,
  ): Promise<any> {
    return this.peripheralService.createPeripheral(peripheralDto);
  }

  @Patch(':idPeripheral/gateway/:idGateway')
  @ApiOperation({ summary: 'Add a peripheral to a gateway' })
  @ApiParam({
    name: 'idGateway',
    description: 'Object ID of the gateway to which the peripheral will be added',
    type: String,
  })
  @ApiParam({
    name: 'idPeripheral',
    description: 'Object ID of the peripheral to be added',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Peripheral added to the gateway successfully',
    type: Gateway,
  })
  @ApiResponse({
    status: 406,
    description: 'Not Acceptable - wrong object id',
  })
  async addPeripheral(
    @Param('idGateway') idGateway: string,
    @Param('idPeripheral') idPeripheral: string,
  ): Promise<Partial<Gateway>> {
    let objectIdGateway;
    let objectIdPeripheral;
    try{
      objectIdGateway = new ObjectId(idGateway);  // Convert the string to ObjectId
      objectIdPeripheral = new ObjectId(idPeripheral);  // Convert the string to ObjectId
    }catch(error){
      throw new NotAcceptableException("wrong object id");
    }
    return this.peripheralService.addPeripheral(objectIdGateway, objectIdPeripheral);
  }

  @Patch(':idPeripheral')
  @ApiOperation({ summary: 'Remove a peripheral from a gateway' })
  @ApiParam({
    name: 'idPeripheral',
    description: 'Object ID of the peripheral to be removed',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The gateway with the peripheral removed',
    type: Gateway,
  })
  @ApiResponse({
    status: 406,
    description: 'Not Acceptable - wrong object id',
  })
  async removePeripheral(
    @Param('idPeripheral') idPeripheral: string,
  ): Promise<Partial<Gateway>> {
    let  objectId;
    try{
      objectId = new ObjectId(idPeripheral);  // Convert the string to ObjectId
    }catch(error){
      throw new NotAcceptableException("wrong object id");
    }
    return this.peripheralService.removePeripheral(objectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a peripheral by ID' })
  @ApiParam({ name: 'id', description: 'Object ID of the peripheral', type: String })
  @ApiResponse({ status: 200, description: 'Peripheral found', type: Peripheral })
  @ApiResponse({ status: 404, description: 'Peripheral not found' })
  async findOneById(@Param('id') id: string): Promise<Peripheral | null> {
    let  objectId;
    try{
      objectId = new ObjectId(id);  // Convert the string to ObjectId
    }catch(error){
      throw new NotAcceptableException("wrong object id");
    }
    return this.peripheralService.findOneById(objectId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all peripherals' })
  @ApiResponse({ status: 200, description: 'Array of peripherals', type: [Peripheral] })
  async findAll(): Promise<Peripheral[]> {
    return this.peripheralService.findAll();
  }
}
