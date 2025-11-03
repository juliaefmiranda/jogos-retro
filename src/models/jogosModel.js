import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
    return await prisma.jogos.findMany({
        orderBy: { id: 'asc' }
    });
}

export const findById = async (id) => {
    return await prisma.jogos.findUnique({
        where: { id: Number(id) }
    });
}

export const criar = async (data) => {
    return await prisma.jogos.create({
        data: {
           jogo: data.jogo,
           console: data.console,
           genero: data.genero,
           anoLancamento: data.anoLancamento,
           desenvolvedora: data.desenvolvedora,
           condicao: data.condicao,
           preco: data.preco,
           raridade: data.raridade

        }
    });
}

export const deletar = async (id) => {
    return await prisma.jogos.delete({
        where: { id: Number(id) }
    })
}

export const atualizar = async (id, data) => {
    return await prisma.jogos.update({
        where: { id: Number(id) },
        data: {
            ...(data.jogo && {jogo: data.jogo }),
            ...(data.console && { console: data.console }),
            ...(data.genero && { genero: data.genero }),
            ...(data.anoLancamento && { anoLancamento: data.anoLancamento }),
            ...(data.desenvolvedora && { desenvolvedora: data.desenvolvedora }),
            ...(data.condicao && { condicao: data.condicao }),
            ...(data.preco && { preco: Number(data.preco) }),
            ...(data.raridade && { raridade: data.raridade })
        }
    })
}