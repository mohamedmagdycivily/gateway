import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from '../gateway/gateway.module';
import { PeripheralModule } from '../peripheral/peripheral.module';
import { typeOrmAsyncConfig } from "../../ormconfig";
const keys = require('./../../config/env/keys');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    GatewayModule,
    PeripheralModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
  exports:[
    AppService,
  ]
})
export class AppModule {}