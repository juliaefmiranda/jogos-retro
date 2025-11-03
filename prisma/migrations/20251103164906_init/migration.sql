-- CreateTable
CREATE TABLE "jogos" (
    "id" SERIAL NOT NULL,
    "jogo" TEXT NOT NULL,
    "console" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL,
    "desenvolvedora" TEXT NOT NULL,
    "condicao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "raridade" TEXT NOT NULL,

    CONSTRAINT "jogos_pkey" PRIMARY KEY ("id")
);
