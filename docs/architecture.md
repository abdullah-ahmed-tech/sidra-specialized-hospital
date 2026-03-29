# Sidra Specialized Hospital - Architecture

## Products
- Mobile App for patients
- Official Website
- Admin Dashboard
- Central API

## Core Architectural Principles
1. Single backend serving all client applications
2. Shared business concepts across apps
3. Scalable monorepo structure
4. Clear module boundaries
5. Commercial-grade code organization
6. Future-ready for multi-branch expansion

## Backend Modules (Initial)
- Auth
- Users
- Roles
- Departments
- Doctors
- Services
- Appointments
- CMS
- Settings

## Applications
### Website
Marketing website, doctor discovery, service pages, trust pages, appointment conversion.

### Admin
Operations and content management dashboard.

### Mobile
Patient-focused mobile experience for booking and profile access.

### API
Source of truth for all business data and rules.

## Database Direction
PostgreSQL + Prisma

Initial domain entities:
- users
- roles
- departments
- doctors
- services
- appointments
- cms_pages
- settings

## Future Expansion
- Medical records
- Lab results
- Radiology
- Pharmacy
- Insurance
- Inpatient management
- Multi-branch support