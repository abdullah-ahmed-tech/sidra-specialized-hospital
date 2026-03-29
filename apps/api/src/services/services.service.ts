import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        departmentId: dto.departmentId,
        name: dto.name,
        slug: dto.slug,
        shortDescription: dto.shortDescription,
        description: dto.description,
        price: dto.price,
        durationMinutes: dto.durationMinutes,
        isActive: dto.isActive ?? true,
      },
    });
  }

  findAll() {
    return this.prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        department: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        department: true,
      },
    });
  }
}