// ------------------------ CLIENTE -----------------------//
async function cadastrarCliente(){
    
    const nome_c = document.getElementById('nomecliente').value;
    const cpf_c = document.getElementById('cpf_cliente').value;
    const telefone_c = document.getElementById('telcliente').value;
    const endereco_c = document.getElementById('endereco_cliente').value;
    await fetch('/cadastrar-cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome_c, cpf_c, telefone_c, endereco_c })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('FormCadastroCliente').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar cliente:', error);
    });
}
async function verificarCliente() {
    const cpf = document.getElementById('cpf_cliente').value;

    if (!cpf) return; // Não faz nada se o CPF estiver vazio

    await fetch(`/buscar-cliente?cpf=${cpf}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar cliente');
            }
            return response.json();
        })
        .then(cliente => {
            if (cliente) {
                // Preenche os campos com os dados do cliente
                document.getElementById('nomecliente').value = cliente.nome;
                document.getElementById('telcliente').value = cliente.telefone;
                document.getElementById('endereco_cliente').value = cliente.endereco;

                // Esconde o botão "Cadastrar" e exibe o botão "Atualizar"
                document.getElementById('btnCadastrarCliente').style.display = 'none';
                document.getElementById('btnAtualizarCliente').style.display = 'block';
            } else {
                // Limpa os campos para cadastro
                resetarFormularioCliente();
            }
        })
        .catch(error => {
            console.error('Erro ao buscar cliente:', error);
            document.getElementById('mensagemCliente').innerText = 'Erro ao buscar cliente.';
        });
}

function resetarFormularioCliente() {
    document.getElementById('FormCadastroCliente').reset();
    document.getElementById('btnCadastrarCliente').style.display = 'block';
    document.getElementById('btnAtualizarCliente').style.display = 'none';
}

async function atualizarCliente() {
    const nome = document.getElementById('nomecliente').value;
    const cpf = document.getElementById('cpf_cliente').value;
    const telefone = document.getElementById('telcliente').value;
    const endereco = document.getElementById('endereco_cliente').value;

    const clienteData = { nome, cpf, telefone, endereco };

    await fetch('/atualizar-cliente', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('mensagemCliente').innerText = data;
        resetarFormularioCliente();
    })
    .catch(error => {
        console.error('Erro ao atualizar cliente:', error);
        document.getElementById('mensagemCliente').innerText = 'Erro ao atualizar cliente.';
    });
}

 
// ------------------------ FUNCIONARIO -----------------------// 

async function cadastrarFuncionario() {

    const nome_f = document.getElementById('nome').value;
    const email_f = document.getElementById('email').value;
    const senha_f = document.getElementById('senha').value;
    const confirmar_f = document.getElementById('c_senha').value;
    const tel_f = document.getElementById('telefone').value;
    const cpf_f = document.getElementById('cpf').value;
    
    if (senha_f !== confirmar_f) {
        document.getElementById('mensagem').innerText = 'As senhas não coincidem!';
        return;
    }

    const funcionarioData = { nome_f, email_f, senha_f, tel_f, cpf_f };


    await fetch('/cadastrar-funcionario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(funcionarioData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('cadastrofuncionario').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar funcionário:', error);
    });
} 

async function verificarFuncionario() {
    const cpf = document.getElementById('cpf').value;

    if (!cpf) return; // Não faz nada se o CPF estiver vazio

    await fetch(`/buscar-funcionario?cpf=${cpf}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar funcionário');
            }
            return response.json();
        })
        .then(funcionario => {
            if (funcionario) {
                // Preenche os campos com os dados do funcionário
                document.getElementById('nome').value = funcionario.nome;
                document.getElementById('email').value = funcionario.email;
                document.getElementById('telefone').value = funcionario.telefone;

                // Esconde o botão "Cadastrar" e exibe o botão "Atualizar"
                document.getElementById('btnCadastrar').style.display = 'none';
                document.getElementById('btnAtualizar').style.display = 'block';
            } else {
                // Limpa os campos para cadastro
                resetarFormulario();
            }
        })
        .catch(error => {
            console.error('Erro ao buscar funcionário:', error);
            document.getElementById('mensagem').innerText = 'Erro ao buscar funcionário...';
        });
}

function resetarFormulario() {
    document.getElementById('cadastrofuncionario').reset();
    document.getElementById('btnCadastrar').style.display = 'block';
    document.getElementById('btnAtualizar').style.display = 'none';
}

async function atualizarFuncionario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;

    const funcionarioData = { nome, email, telefone, cpf };

    await fetch('/atualizar-funcionario', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionarioData)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('mensagem').innerText = data;
        resetarFormulario();
    })
    .catch(error => {
        console.error('Erro ao atualizar funcionário:', error);
        document.getElementById('mensagem').innerText = 'Erro ao atualizar funcionário.';
    });
}





// ------------------------ SERVIÇO -----------------------//

async function cadastrarServico(){

    const nome_s = document.getElementById('nome_servico').value;
    const preco_s = document.getElementById('preco_servico').value;
    const descricao_s = document.getElementById('descricao').value;

    await fetch('/cadastrar-servico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_s, preco_s, descricao_s })
    }).then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('Servicos').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar serviço:', error);
    });
}

// ------------------------ PET -----------------------//


async function cadastrarPet() {
    const nomePet = document.getElementById('nomePet').value;
    const idadePet = document.getElementById('idadePet').value;
    const racaPet = document.getElementById('racaPet').value;
    const cpf_cliente = document.getElementById('buscaDono').value;
    const observacoesPet = document.getElementById('observacoesPet').value;
   

    const petData = { nomePet, idadePet, racaPet, observacoesPet, cpf_cliente };

    await fetch('/cadastrar-pet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('CadastroPet').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar pet:', error);
    });
}

// ------------------------ AGENDAMENTO -----------------------//


async function cadastrarAgendamento() {
    
    const data = document.getElementById('dia_a').value; 
    const horario = document.getElementById('horaSelecionada').value;
    const id_pet = document.getElementById('petSelecionado').value;
    const cpf_funcionario = "null"; /* document.getElementById('').value; */
    const id_servico = document.getElementById('servicoSelecionado').value;
    const observacoes = document.getElementById('observacoesAgenda').value;


    const petData = { data, horario, id_pet, cpf_funcionario, id_servico, observacoes };

    await fetch('/cadastrar-agendamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('CadastroPet').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar agendamento:', error);
    });
}

function buscarAgendamentos() {
    const data = document.getElementById('dataConsulta').value;
    const cpf = document.getElementById('cpfConsulta').value;

    // Construindo os parâmetros de consulta
    const queryParams = new URLSearchParams();
    if (data) queryParams.append('data', data);
    if (cpf) queryParams.append('cpf', cpf);

    fetch(`/buscar-agendamentos?${queryParams.toString()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar agendamentos');
            }
            return response.json();
        })
        .then(agendamentos => {
            const tabelaBody = document.querySelector('#tabelaAgendamentos tbody');
            tabelaBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la

            if (agendamentos.length > 0) {
                agendamentos.forEach((agendamento, index) => {
                    const linha = document.createElement('tr');

                    // Alternância de cores das linhas
                    linha.className = index % 2 === 0 ? 'linha-par' : 'linha-impar';

                    linha.innerHTML = `
                        <td>${agendamento.data}</td>
                        <td>${agendamento.nome_cliente}</td>
                        <td>${agendamento.telefone}</td>
                        <td>${agendamento.nome_pet}</td>
                        <td>${agendamento.nome_servico}</td>
                        <td>${agendamento.preco_servico}</td>
                        <td>${agendamento.horario || 'N/A'}</td>
                    `;
                    tabelaBody.appendChild(linha);
                });
            } else {
                const linha = document.createElement('tr');
                linha.innerHTML = `<td colspan="8">Nenhum agendamento encontrado.</td>`;
                tabelaBody.appendChild(linha);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar agendamentos:', error);
        });
}












// Função para buscar Dono(a) do Pet
function buscarDono() {
    const buscaDono = document.getElementById('buscaDono').value;

    fetch(`/buscar-dono?nome=${buscaDono}`)
    .then(response => response.json())
    .then(data => {
        const donoSelect = document.getElementById('donoSelecionado');
        donoSelect.innerHTML = '<option value="">Selecione o Dono(a)</option>';
        data.forEach(dono => {
            const option = document.createElement('option');
            option.value = dono.cpf;
            option.textContent = dono.nome;
            donoSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dono(a):', error);
    });
}

// Função para buscar Dono(a) do Pet
function buscarPet() {
    const buscaDono = document.getElementById('buscaPet').value;

    fetch(`/buscar-pet?nome=${buscaDono}`)
    .then(response => response.json())
    .then(data => {
        const donoSelect = document.getElementById('petSelecionado');
        donoSelect.innerHTML = '<option value="">Selecione o Pet(a)</option>';
        data.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id_pet;
            option.textContent = pet.nome;
            donoSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar Pet:', error);
    });
}

function buscaServico() {
    fetch('/buscar-servicos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar serviços');
            }
            return response.json();
        })
        .then(servicos => {
            const select = document.getElementById('servicoSelecionado');
            servicos.forEach(servico => {
                const option = document.createElement('option');
                option.value = servico.id_servico; // Usa o id como valor
                option.textContent = servico.nome; // Nome do serviço exibido
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os serviços:', error);
        });
}


function buscaHorariosDisponiveis() {
    const data = document.getElementById('dia_a').value;
    const idServico = document.getElementById('servicoSelecionado').value;

    // Verifica se ambos os campos estão preenchidos
    if (!data || !idServico) {
        return; // Aguarde até que ambos os campos estejam preenchidos
    }

    fetch(`/horarios-disponiveis?data=${data}&id_servico=${idServico}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar horários disponíveis');
            }
            return response.json();
        })
        .then(horariosDisponiveis => {
            const selectHorario = document.getElementById('horaSelecionada');
            selectHorario.innerHTML = '<option value="">Selecione o Horário</option>';

            if (horariosDisponiveis.length > 0) {
                horariosDisponiveis.forEach(horario => {
                    const option = document.createElement('option');
                    option.value = horario;
                    option.textContent = horario;
                    selectHorario.appendChild(option);
                });
            } else {
                alert('Não há horários disponíveis para esta data e serviço.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar horários disponíveis:', error);
        });
}




function limparTodosOsCampos() {
    const inputs = document.querySelectorAll('input, textarea, select'); // Seleciona todos os inputs, textareas e selects
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false; // Desmarca checkboxes e radio buttons
        } else {
            input.value = ''; // Limpa outros campos
        }
    });
}


function login() {
    const cpf = document.getElementById('cpf_funcionario').value;
    const senha = document.getElementById('senha_login').value;

    // Enviar os dados para o backend para validar no banco de dados
    fetch('/login-funcionario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redireciona para a página de consulta após login bem-sucedido
            window.location.href = 'consulta.html';
        } else {
            alert('CPF ou senha incorretos');
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
    });
}

