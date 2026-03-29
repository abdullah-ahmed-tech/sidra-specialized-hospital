import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('123456', 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@sidra.com' },
    update: {},
    create: {
      fullName: 'Sidra Super Admin',
      email: 'admin@sidra.com',
      phone: '01000000001',
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  const cardiology = await prisma.department.upsert({
    where: { slug: 'cardiology' },
    update: {},
    create: {
      name: 'Cardiology',
      slug: 'cardiology',
      description: 'Specialized heart and vascular care.',
      sortOrder: 1,
      isActive: true,
    },
  });

  const neurology = await prisma.department.upsert({
    where: { slug: 'neurology' },
    update: {},
    create: {
      name: 'Neurology',
      slug: 'neurology',
      description: 'Brain, nerve, and neurological care.',
      sortOrder: 2,
      isActive: true,
    },
  });

  const pediatrics = await prisma.department.upsert({
    where: { slug: 'pediatrics' },
    update: {},
    create: {
      name: 'Pediatrics',
      slug: 'pediatrics',
      description: 'Comprehensive child healthcare services.',
      sortOrder: 3,
      isActive: true,
    },
  });

  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor.cardiology@sidra.com' },
    update: {},
    create: {
      fullName: 'Dr. Ahmed Salah',
      email: 'doctor.cardiology@sidra.com',
      phone: '01000000002',
      passwordHash,
      role: UserRole.DOCTOR,
      isActive: true,
    },
  });

  await prisma.doctor.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: {
      userId: doctorUser.id,
      departmentId: cardiology.id,
      slug: 'dr-ahmed-salah',
      specialty: 'Cardiology Consultant',
      title: 'Consultant',
      bio: 'Experienced cardiology consultant specialized in adult cardiac care.',
      consultationFee: 600,
      experienceYears: 12,
      languages: ['Arabic', 'English'],
      isActive: true,
    },
  });

  const patientUser = await prisma.user.upsert({
    where: { email: 'patient1@sidra.com' },
    update: {},
    create: {
      fullName: 'Mohamed Adel',
      email: 'patient1@sidra.com',
      phone: '01000000003',
      passwordHash,
      role: UserRole.PATIENT,
      isActive: true,
    },
  });

  await prisma.service.upsert({
    where: { slug: 'cardiology-consultation' },
    update: {},
    create: {
      departmentId: cardiology.id,
      name: 'Cardiology Consultation',
      slug: 'cardiology-consultation',
      shortDescription: 'Initial consultation with cardiology specialist.',
      description: 'Comprehensive cardiology consultation and case assessment.',
      price: 600,
      durationMinutes: 30,
      isActive: true,
    },
  });

  await prisma.service.upsert({
    where: { slug: 'neurology-consultation' },
    update: {},
    create: {
      departmentId: neurology.id,
      name: 'Neurology Consultation',
      slug: 'neurology-consultation',
      shortDescription: 'Specialized neurological examination.',
      description: 'Specialized consultation for neurological symptoms and follow-up.',
      price: 650,
      durationMinutes: 30,
      isActive: true,
    },
  });

  const doctor = await prisma.doctor.findFirstOrThrow({
    where: { userId: doctorUser.id },
  });

  await prisma.appointment.create({
    data: {
      patientId: patientUser.id,
      doctorId: doctor.id,
      fullName: patientUser.fullName,
      phone: patientUser.phone!,
      email: patientUser.email,
      notes: 'Initial appointment booking for chest pain assessment.',
      appointmentDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  console.log({
    message: 'Seed completed successfully',
    superAdminId: superAdmin.id,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });