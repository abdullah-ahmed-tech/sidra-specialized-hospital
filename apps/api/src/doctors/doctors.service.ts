import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDoctorDto) {
    const passwordHash = await hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        passwordHash,
        role: UserRole.DOCTOR,
        doctorProfile: {
          create: {
            departmentId: dto.departmentId,
            slug: dto.slug,
            specialty: dto.specialty,
            title: dto.title,
            bio: dto.bio,
            consultationFee: dto.consultationFee,
            experienceYears: dto.experienceYears,
            languages: dto.languages ?? [],
            imageUrl: dto.imageUrl,
          },
        },
      },
      include: {
        doctorProfile: true,
      },
    });
  }

  findAll() {
    return this.prisma.doctor.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            isActive: true,
          },
        },
        department: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.doctor.findUnique({
      where: { id },
      include: {
        user: true,
        department: true,
        appointments: true,
      },
    });
  }
}