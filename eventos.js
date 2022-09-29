let lista_tarefas = [];

function atualizarQuantidade() {
    document.getElementById('numeros').innerHTML = lista_tarefas.length;
}

async function listarTarefas() {
    // async await
    let response = await fetch('https://62a4da7d47e6e4006399353b.mockapi.io/v1/tarefas1')
    let body = await response.json()
    if (typeof body !== "string") {
        let conteudo = body
            .map(function (tarefa) {
                return tarefa.titulo;
            })
            .sort()
            .map(function (tarefa) {
                return `
                        <div>
                            <input type="checkbox"> ${tarefa}
                        </div>
                    `;
            });

        document.getElementById('tarefas').innerHTML = conteudo.join('');
    }
}

function addTarefa() {
    event.preventDefault();

    let titulo = document.getElementById('input_nova_tarefa').value;

    if (titulo.trim() === '') {
        alert('Tarefa invalida');
        return;
    }


    fetch('https://62a4da7d47e6e4006399353b.mockapi.io/v1/tarefas1', {
        method: "POST",
        body: JSON.stringify({
            titulo,
            prioridade: "baixa"
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (resposta) {
            alert(JSON.stringify(resposta))
            document.getElementById('input_nova_tarefa').value = '';
            atualizarQuantidade();
            listarTarefas();
        })
}

listarTarefas()