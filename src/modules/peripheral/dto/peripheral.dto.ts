import { IsArray, IsString, ValidateNested, IsInt, IsOptional, IsNumber, IsPositive, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PeripheralStatus } from '../entity/peripheral.entity';

export class PeripheralDto {
  @IsNumber()
  uid: number;

  @IsString()
  vendor: string;

}
