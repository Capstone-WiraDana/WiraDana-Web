import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

(async () => {
  await prisma.$executeRaw`SET TIME ZONE 'Asia/Jakarta';`;
})();

export default prisma;
