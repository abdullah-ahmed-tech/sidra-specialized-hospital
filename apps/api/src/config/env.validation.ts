import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class EnvValidation {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;

  @IsNumberString()
  PORT!: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_EXPIRES_IN!: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_EXPIRES_IN!: string;
}