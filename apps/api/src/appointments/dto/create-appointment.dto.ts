import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsOptional()
  @IsString()
  patientId?: string;

  @IsString()
  doctorId!: string;

  @IsString()
  fullName!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsDateString()
  appointmentDate!: string;
}