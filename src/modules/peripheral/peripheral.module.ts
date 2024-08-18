import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peripheral } from './entity/peripheral.entity';
import { PeripheralController } from './peripheral.controller';
import { PeripheralService } from './peripheral.service';
import { PeripheralInterfaceToken } from './interface/peripheral.interface';
import { PeripheralRepository } from './repository/peripheral.repository';
import { GatewayModule } from '../gateway/gateway.module';
@Module({
  imports: [TypeOrmModule.forFeature([Peripheral]), GatewayModule],
  controllers: [PeripheralController],
  providers: [
    PeripheralService,
    {
      provide: PeripheralInterfaceToken,
      useClass: PeripheralRepository,
    },
  ],
  exports: [PeripheralService],
})
export class PeripheralModule {}
