const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

const db = new sqlite3.Database('agendamento.db');

db.serialize(() => {
    // Criando a tabela de Clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS Clientes (
            id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            cpf VARCHAR(11) UNIQUE NOT NULL,
            telefone VARCHAR(15) NOT NULL,
            endereco VARCHAR(200) NOT NULL
        )
    `);

    // Criando a tabela de Pets
    db.run(`
        CREATE TABLE IF NOT EXISTS Pets (
            id_pet INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            idade INTEGER NOT NULL,
            raca VARCHAR(100) NOT NULL,
            observacoes TEXT,
            cpf_cliente VARCHAR(11) NOT NULL,
            FOREIGN KEY (cpf_cliente) REFERENCES Clientes (cpf)
        )
    `);

    // Criando a tabela de Funcionários
    db.run(`
        CREATE TABLE IF NOT EXISTS Funcionarios (
            id_funcionario INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL,
            telefone VARCHAR(15) NOT NULL,
            cpf VARCHAR(11) UNIQUE NOT NULL
        )
    `);

    // Criando a tabela de Serviços
    db.run(`
        CREATE TABLE IF NOT EXISTS Servicos (
            id_servico INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            descricao TEXT NOT NULL
        )
    `);

    // Criando a tabela de Agendamentos
    db.run(`
        CREATE TABLE IF NOT EXISTS Agendamentos (
            id_agendamento INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATE NOT NULL,
            horario TIME NOT NULL,
            id_pet INTEGER NOT NULL,
            cpf_funcionario VARCHAR(11) NOT NULL,
            id_servico INTEGER NOT NULL,
            observacoes TEXT,
            FOREIGN KEY (id_pet) REFERENCES Pets (id_pet),
            FOREIGN KEY (cpf_funcionario) REFERENCES Funcionarios (cpf),
            FOREIGN KEY (id_servico) REFERENCES Servicos (id_servico)
        )
    `);
});
/************************************* CLIENTE ***************************************/
/************************************* CLIENTE ***************************************/
/************************************* CLIENTE ***************************************/

// ROTA PRA CADASTRAR UM CLIENTE
app.post('/cadastrar-cliente', (req, res) => {
    const { nome_c, cpf_c, telefone_c, endereco_c } = req.body;
    db.run("INSERT INTO Clientes (nome, cpf, telefone, endereco) VALUES (?, ?, ?, ?)", [nome_c, cpf_c, telefone_c, endereco_c], function (err) {
        if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            res.status(500).send('Erro ao cadastrar cliente');
        } else {
            res.send('Cliente cadastrado com sucesso!');
        }
    });
});
// ROTA PRA BUSCAR UM CLIENTE PARA SER CARREGADO NO FRONT
app.get('/buscar-cliente', (req, res) => {
    const { cpf } = req.query;

    db.get('SELECT * FROM Clientes WHERE cpf = ?', [cpf], (err, row) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).send('Erro ao buscar cliente.');
        } else {
            res.json(row || null); // Retorna o cliente encontrado ou null
        }
    });
});
// ROTA PRA ATUALIZAR CADASTRO DO CLIENTE
app.put('/atualizar-cliente', (req, res) => {
    const { nome, cpf, telefone, endereco } = req.body;

    db.run(
        'UPDATE Clientes SET nome = ?, telefone = ?, endereco = ? WHERE cpf = ?',
        [nome, telefone, endereco, cpf],
        function (err) {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                res.status(500).send('Erro ao atualizar cliente.');
            } else if (this.changes === 0) {
                res.status(404).send('Cliente não encontrado.');
            } else {
                res.send('Cliente atualizado com sucesso!');
            }
        }
    );
});


/************************************* PET ***************************************/
/************************************* PET ***************************************/
/************************************* PET ***************************************/

// ROTA PRA CADASTRAR UM PET
app.post('/cadastrar-pet', (req, res) => {
    const { nomePet, idadePet, racaPet, observacoesPet, cpf_cliente } = req.body;
    db.run("INSERT INTO Pets (nome, idade, raca, observacoes, cpf_cliente) VALUES (?, ?, ?, ?, ?)", [nomePet, idadePet, racaPet, observacoesPet, cpf_cliente], function (err) {
        if (err) {
            console.error('Erro ao cadastrar pet:', err);
            res.status(500).send('Erro ao cadastrar pettt');
        } else {
            res.send('Pet cadastrado com sucesso!');
        }
    });
});
// ROTA PARA BUSCAR DONO(A) DO PET
app.get('/buscar-dono', (req, res) => {
    const nome = req.query.nome || '';

    db.all("SELECT cpf, nome FROM Clientes WHERE cpf LIKE ?", [`%${nome}%`], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar donos:', err);
            res.status(500).send('Erro ao buscar donos');
        } else {
            res.json(rows); // Retorna os resultados em formato JSON
        }
    });
});

// ROTA PARA BUSCAR PET
app.get('/buscar-pet', (req, res) => {
    const nome = req.query.nome || '';

    db.all("SELECT id_pet, nome FROM Pets WHERE cpf_cliente LIKE ?", [`%${nome}%`], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar donos:', err);
            res.status(500).send('Erro ao buscar donos');
        } else {
            res.json(rows); // Retorna os resultados em formato JSON
        }
    });
});

/************************************* FUNCIONARIO ***************************************/
/************************************* FUNCIONARIO ***************************************/
/************************************* FUNCIONARIO ***************************************/


// ROTA PRA CADASTRAR UM FUNCIONÁRIO
app.post('/cadastrar-funcionario', (req, res) => {
    const { nome_f, email_f, senha_f, tel_f, cpf_f } = req.body;
    db.run("INSERT INTO Funcionarios (nome, email, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)", [nome_f, email_f, senha_f, tel_f, cpf_f], function (err) {
        if (err) {
            console.error('Erro ao cadastrar funcionário:', err);
            res.status(500).send('Erro ao cadastrar funcionário');
        } else {
            res.send('Funcionário cadastrado com sucesso!');
        }
    });
});
// ROTA PRA BUSCAR UM FUNCIONÁRIO PARA SER CARREGADO NO FRONT
app.get('/buscar-funcionario', (req, res) => {
    const { cpf } = req.query;

    db.get('SELECT * FROM Funcionarios WHERE cpf = ?', [cpf], (err, row) => {
        if (err) {
            console.error('Erro ao buscar funcionário:', err);
            res.status(500).send('Erro ao buscar funcionário.');
        } else {
            res.json(row || null); // Retorna o funcionário encontrado ou null
        }
    });
});
// ROTA PRA ATUALIZAR UM FUNCIONÁRIO
app.put('/atualizar-funcionario', (req, res) => {
    const { nome, email, telefone, cpf } = req.body;

    db.run(
        'UPDATE Funcionarios SET nome = ?, email = ?, telefone = ? WHERE cpf = ?',
        [nome, email, telefone, cpf],
        function (err) {
            if (err) {
                console.error('Erro ao atualizar funcionário:', err);
                res.status(500).send('Erro ao atualizar funcionário.');
            } else if (this.changes === 0) {
                res.status(404).send('Funcionário não encontrado.');
            } else {
                res.send('Funcionário atualizado com sucesso!');
            }
        }
    );
});

/************************************* SERVIÇO ***************************************/
/************************************* SERVIÇO ***************************************/
/************************************* SERVIÇO ***************************************/




// ROTA PRA CADASTRAR UM SERVIÇO
app.post('/cadastrar-servico', (req, res) => {
    const { nome_s, preco_s, descricao_s } = req.body;
    db.run("INSERT INTO Servicos (nome, preco, descricao) VALUES (?, ?, ?)", [nome_s, preco_s, descricao_s], function (err) {
        if (err) {
            console.error('Erro ao cadastrar serviço:', err);
            res.status(500).send('Erro ao cadastrar serviço');
        } else {
            res.send('Serviço cadastrado com sucesso!');
        }
    });
});


/************************************* AGENDAMENTO ***************************************/
/************************************* AGENDAMENTO ***************************************/
/************************************* AGENDAMENTO ***************************************/





// ROTA PRA CADASTRAR UM AGENDAMENTO
app.post('/cadastrar-agendamento', (req, res) => {
    const { data, horario, id_pet, cpf_funcionario, id_servico, observacoes } = req.body;
    db.run("INSERT INTO Agendamentos (data, horario, id_pet, cpf_funcionario, id_servico, observacoes) VALUES (?, ?, ?, ?, ?, ?)", [data, horario, id_pet, cpf_funcionario, id_servico, observacoes], function (err) {
        if (err) {
            console.error('Erro ao cadastrar agendamento:', err);
            res.status(500).send('Erro ao cadastrar agendamento');
        } else {
            res.send('Agendamento cadastrado com sucesso!');
        }
    });
}); 

// ROTA PARA BUSCAR TODOS OS SERVIÇOS NO ATENDAMENTO
app.get('/buscar-servicos', (req, res) => {
    db.all("SELECT id_servico, nome, preco FROM Servicos", [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar serviços:', err);
            res.status(500).send('Erro ao buscar serviços');
        } else {
            res.json(rows); // Retorna os serviços em formato JSON
        }
    });
});

// ROTA PARA BUSCAR HORÁRIOS DISPONÍVEIS
app.get('/horarios-disponiveis', (req, res) => {
    const { data, id_servico } = req.query;

    // Todos os horários possíveis
    const todosHorarios = [
        '08:00', '09:00', '10:00', '11:00',
        '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    db.all(
        "SELECT horario FROM Agendamentos WHERE data = ? AND id_servico = ?",
        [data, id_servico],
        (err, rows) => {
            if (err) {
                console.error('Erro ao buscar horários ocupados:', err);
                res.status(500).send('Erro ao buscar horários ocupados');
            } else {
                // Extrai apenas os horários ocupados
                const horariosOcupados = rows.map(row => row.horario);

                // Filtra horários disponíveis
                const horariosDisponiveis = todosHorarios.filter(
                    horario => !horariosOcupados.includes(horario)
                );

                res.json(horariosDisponiveis);
            }
        }
    );
});


// ROTA PARA BUSCAR AGENDAMENTOS POR DATA E/OU CPF
app.get('/buscar-agendamentos', (req, res) => {
    const { data, cpf } = req.query;

    // Construindo a query base
    let query = `
        SELECT 
            a.data,
            c.nome AS nome_cliente,
            c.telefone,
            p.nome AS nome_pet,
            s.nome AS nome_servico,
            s.preco AS preco_servico,
            a.horario,
            a.observacoes
        FROM Agendamentos a
        JOIN Pets p ON a.id_pet = p.id_pet
        JOIN Clientes c ON p.cpf_cliente = c.cpf
        JOIN Servicos s ON a.id_servico = s.id_servico
        WHERE 1=1
    `;

    const params = [];

    // Adicionando filtro de data
    if (data) {
        query += ' AND a.data = ?';
        params.push(data);
    }

    // Adicionando filtro de CPF
    if (cpf) {
        query += ' AND c.cpf = ?';
        params.push(cpf);
    }

    // Executando a consulta no banco
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            res.status(500).send('Erro ao buscar agendamentos');
        } else {
            res.json(rows); // Retornando os agendamentos encontrados
        }
    });
});


// ROTA PARA FAZER O LOGIN
app.post('/login-funcionario', (req, res) => {
    const { cpf, senha } = req.body;
    
    // Verificar se o CPF existe e a senha está correta
    db.get('SELECT * FROM Funcionarios WHERE cpf = ?', [cpf], (err, row) => {
        if (err) {
            console.error('Erro ao verificar o CPF:', err);
            return res.status(500).send('Erro interno do servidor');
        }

        if (row) {
            // Verificar se a senha está correta (supondo que a senha seja armazenada de forma simples, sem hash)
            if (row.senha === senha) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        } else {
            return res.json({ success: false });
        }
    });
});







// Teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});








