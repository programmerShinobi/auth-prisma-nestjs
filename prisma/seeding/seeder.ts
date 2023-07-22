import { PrismaClient } from "@prisma/client";
import { users } from "./users";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

  async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

async function main(): Promise<void> {
  for (let user of users) {
    const hashedPassword = await hashPassword(user.hashedPassword);
    user.hashedPassword = hashedPassword;
    await prisma.user.create({
      data: user
    });
    
    for (let index = 0; index < 10; index++) {
      await prisma.post.create({
        data: {
          title: `Shinobi Series : ${Math.floor(Math.random() * 100)}`,
          content: `Shinobi is a term commonly associated with the Naruto series, which is a popular anime and manga franchise. In the series, shinobi are highly skilled warriors who possess a wide range of abilities, including ninjutsu, taijutsu, and genjutsu. They are trained in various forms of combat and espionage, and are often tasked with completing dangerous missions on behalf of their village. The concept of shinobi has become a popular cultural icon, and has been featured in various forms of media outside of the Naruto series.`,
          published: Math.random() < 0.5,
          author: {
            connect: { email: user.email }
          }
        },
      });
    }
  }
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})