import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  fullName!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  departmentId!: string;

  @IsString()
  slug!: string;

  @IsString()
  specialty!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  consultationFee?: number;

  @IsOptional()
  @IsInt()
  experienceYears?: number;

  @IsOptional()
  @IsArray()
  languages?: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}