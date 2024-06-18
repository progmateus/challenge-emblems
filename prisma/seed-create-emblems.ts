import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const emblems = [
    {
      Slug: 'cda',
      Name: 'Cidade Alta',
      Image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    },
    {
      Slug: 'cda-valley',
      Name: 'Cidade Alta Valley',
      Image:
        'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    },
    {
      Slug: 'policia',
      Name: 'Policia do Cidade Alta',
      Image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    },
    {
      Slug: 'hospital',
      Name: 'Hospital do Cidade Alta',
      Image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
    },
    {
      Slug: 'mecanica',
      Name: 'Mecânica do Cidade Alta',
      Image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    },
    {
      Slug: 'taxi',
      Name: 'Taxi do Cidade Alta',
      Image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
    },
    {
      Slug: 'curuja',
      Name: 'Mecânica do Cidade Alta',
      Image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    },
    {
      Slug: 'Coruja',
      Name: 'Mecânica do Cidade Alta',
      Image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
    },
    {
      Slug: 'hiena',
      Name: 'Hiena',
      Image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
    },
    {
      Slug: 'gato',
      Name: 'Gato',
      Image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
    },
    {
      Slug: 'urso',
      Name: 'Urso',
      Image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
    },
  ];
  await prisma.emblem.createMany({
    data: emblems,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
