import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getMetrics() {
    const [departments, doctors, services, appointments] = await Promise.all([
      this.prisma.department.count(),
      this.prisma.doctor.count(),
      this.prisma.service.count(),
      this.prisma.appointment.count(),
    ]);

    return {
      departments,
      doctors,
      services,
      appointments,
    };
  }
}