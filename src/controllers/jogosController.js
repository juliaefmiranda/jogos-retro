import * as JogosModel from "./../models/jogosModel.js";

export const listarTodos = async (req, res) => { //Colocar filtros
  try {
    if (!jogos || jogos.length === 0) {
      res.status(404).json({
        status: 404,
        total: jogos.length,
        message: "Não há jogos retrô nessa lista",
      });
    }

    let resultado = jogos;

    const { id, jogo, console, genero, anoLancamento, desenvolvedora, condicao, preco, raridade } = req.query;
  
    if (console) {
      resultado = resultado.filter(j => j.console.toLowerCase().includes(console.toLowerCase()));
    }
  
    if (genero) {
      resultado = resultado.filter(j => j.genero.toLowerCase().includes(genero.toLowerCase()));
    }
  
    if (condicao) {
      resultado = resultado.filter(j => j.condicao.toLowerCase().includes(condicao.toLowerCase()));
    }
    
    if (raridade) {
      resultado = resultado.filter(j => j.raridade.toLowerCase().includes(raridade.toLowerCase()));
    }

    res.status(200).json({
      total: jogos.length,
      message: "Lista de jogos retrô",
      jogos,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      erro: "Erro interno de servidor",
      details: error.message,
    });
  }


  }
 

export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const jogo = await JogosModel.findById(id);

        if (!jogo) {
            return res.status(404).json({
                status: 404,
                erro: 'Jogo não encontrado!',
                message: 'Verfique se o id do jogo existe',
                id: id
            });
        }

        res.status(200).json({
            total: jogo.length,
            message: 'Jogo encontrado',
            jogo
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            erro: 'Erro ao procurar jogo por id',
            details: error.message
        });
    }
}

export const criar = async (req, res) => {  //Aqui vão as regras de negócio
    try {
        const { id, jogo, console, genero, anoLancamento, desenvolvedora, condicao, preco, raridade } = req.body;
        const data = req.body;

        const camposObrigatorios = ['jogo', 'console', 'genero', 'anoLancamento', 'desenvolvedora', 'condicao', 'preco', 'raridade'];
        const faltando = camposObrigatorios.filter(campo => !data[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obriatórios: ${faltando.join(', ')}`
            });
        }

        if (anoLancamento > 2000) {
            return res.status(400).json({
                erro: 'O ano de lançamento deve ser anterior a 2000, caso contrário o jogo não é retrô'
            })
        }

        const novoJogo = await JogosModel.criar(req.body)

        res.status(201).json({
            mensagem: 'Jogo criada com sucesso!',
            jogo: novoJogo
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar o jogo',
            detalhes: error.message
        });
    }
}

export const deletar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const jogoExiste = await JogosModel.findById(id);

        if (!jogoExiste) {
            res.statu(404).json({
                erro: 'Nenhum jogo encontrado com esse id',
                id: id
            });
        }

        await JogosModel.deletar(id);

        res.status(200).json({
            mensagem: 'Jogo deletado com sucesso!',
            jogoRemovida: jogoExiste
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao deletar jogo!',
            detalhes: error.message
        });
    }
}

export const atualizar = async (req, res) => {  //Aqui vão as regras de negócio
    try {
        const id = parseInt(req.params.id);
        const data = req.body;

        const jogoExiste = await JogosModel.findById(id);

        if (!jogoExiste) {
            return res.status(404).json({
                erro: 'Nenhum jogo foi encontrado com esse id',
                id: id
            });
        }

        const jogoAtulizado = await JogosModel.atualizar(id, data)

        res.status(200).json({
            mensagem: 'Jogo atualizado com sucesso!',
            jogoAtulizado: jogoAtulizado
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar jogo!',
            detalhes: error.message
        });
    }
}