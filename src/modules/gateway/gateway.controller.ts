import { Controller, Post, Body, Param, Get, NotAcceptableException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/gateway.dto';
import { Gateway } from './entity/gateway.entity';
import { ObjectId } from 'mongodb';

@ApiTags('Gateways')
@Controller('gateways')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gateway' })
  @ApiBody({
    description: 'Data for the new gateway',
    type: CreateGatewayDto,
    examples: {
      example1: {
        summary: 'A basic gateway',
        value: {
          name: 'Main Gateway',
          ipAddress: '192.168.1.1',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Gateway created successfully',
    type: Gateway,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async create(@Body() createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.gatewayService.create(createGatewayDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all gateways' })
  @ApiResponse({
    status: 200,
    description: 'List of all gateways',
    type: [Gateway],
  })
  async findAll(): Promise<Gateway[]> {
    return this.gatewayService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a gateway by ID' })
  @ApiParam({
    name: 'id',
    description: 'Object ID of the gateway',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Gateway found by ID',
    type: Gateway,
  })
  @ApiResponse({
    status: 406,
    description: 'Not Acceptable - wrong object id',
  })
  async findOneById(@Param('id') id: string): Promise<Gateway> {
    let objectId; 
    try {
      objectId = new ObjectId(id);  // Convert the string to ObjectId
    } catch (error) {
      throw new NotAcceptableException('wrong object id');
    }
    return this.gatewayService.findOneById(objectId);
  }
}
