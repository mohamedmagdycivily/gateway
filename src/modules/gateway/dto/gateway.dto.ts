import { IsArray, IsString, ValidateNested, IsInt, IsOptional, IsNumber, IsPositive, IsNotEmpty, IsIP, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PeripheralStatus } from 'src/modules/peripheral/entity/peripheral.entity';

export class CreateGatewayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIP()
  ipAddress: string;
}
export class PeripheralDto {
  @IsNumber()
  uid: number;

  @IsString()
  vendor: string;

  @IsDate()
  dateCreated: Date;

  @IsEnum(PeripheralStatus)
  status: PeripheralStatus;
}