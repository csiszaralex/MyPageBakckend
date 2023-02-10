import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeMyUser() {
  const create: Date = new Date('2023-01-01T10:30:00.000Z');
  const update: Date = new Date();
  update.setDate(create.getDate() - 5);
  await prisma.user.create({
    data: {
      id: 1,
      name: 'Alex Csiszár',
      email: 'csiszaralex@gmail.com',
      firstName: 'Alex',
      createdAt: create,
      updatedAt: update,
      isAdmin: true,
      googleId: '102294467870143238107',
      githubId: '38698577',
    },
  });
}

async function main() {
  await makeMyUser();
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
