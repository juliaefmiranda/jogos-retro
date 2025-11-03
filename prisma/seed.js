import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const jogos = [
    {
      id: 1,
      jogo: "Super Mario Bros. 3",
      console: "NES (Nintendo Entertainment System)",
      genero: "Plataforma",
      anoLancamento: 1988,
      desenvolvedora: "Nintendo",
      condicao: "Completo na Caixa (CIB)",
      preco: 450.00, // Representado em Reais (R$)
      raridade: "Comum/Médio"
    },
    {
      id: 2,
      jogo: "The Legend of Zelda: Ocarina of Time",
      console: "Nintendo 64",
      genero: "Ação-Aventura",
      anoLancamento: 1998,
      desenvolvedora: "Nintendo EAD",
      condicao: "Apenas Cartucho",
      preco: 250.00,
      raridade: "Médio"
    },
    {
      id: 3,
      jogo: "Sonic the Hedgehog 2",
      console: "Mega Drive (Sega Genesis)",
      genero: "Plataforma",
      anoLancamento: 1992,
      desenvolvedora: "Sonic Team/Sega",
      condicao: "Completo na Caixa (CIB)",
      preco: 180.00,
      raridade: "Comum"
    },
    {
      id: 4,
      jogo: "Final Fantasy VII",
      console: "PlayStation (PS1)",
      genero: "RPG (Role-Playing Game)",
      anoLancamento: 1997,
      desenvolvedora: "SquareSoft",
      condicao: "Discos e Manual",
      preco: 350.00,
      raridade: "Médio/Raro"
    },
    {
      id: 5,
      jogo: "Pac-Man",
      console: "Atari 2600",
      genero: "Arcade",
      anoLancamento: 1982,
      desenvolvedora: "Namco/Atari",
      condicao: "Apenas Cartucho",
      preco: 100.00,
      raridade: "Comum"
    }
  ];

  async function main() {
    console.log('Iniciando o processo de seed...');

    await prisma.jogos.deleteMany();
    console.log('Registros existentes de Jogos deletados.');

    const result = await prisma.jogos.createMany({
        data: jogos,
        skipDuplicates: true,
    });

    console.log(`Seed concluído! ${result.count} novos registros de Jogos criados.`);
}

main()
    .catch((e) => {
        console.error("ERRO ao executar o Seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Conexão com o Prisma fechada.");
    });