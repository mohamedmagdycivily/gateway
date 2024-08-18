import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gateway } from './entity/gateway.entity';
import { GatewayService } from './gateway.service';
import { GatewayRepository } from './repository/gateway.repository';
import { GatewayInterfaceToken } from './interface/gateway.interface';
import { GatewayController } from './gateway.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Gateway])],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    {
      provide: GatewayInterfaceToken,
      useClass: GatewayRepository,
    },
  ],
  exports: [GatewayService],
})
export class GatewayModule {}
