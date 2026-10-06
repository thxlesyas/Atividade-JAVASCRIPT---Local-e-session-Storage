const rotulos = {
    nome: 'Nome',
    endereco: 'Endereço',
    cep: 'CEP',
    cpf: 'CPF',
    telefone: 'Telefone',
    cnpj: 'CNPJ'
};

const lista = document.getElementById('dados');
const vazio = document.getElementById('vazio');

function mostrar() {
    lista.innerHTML = '';
    const salvo = localStorage.getItem('dadosFormulario');

    if (!salvo) {
        vazio.hidden = false;
        return;
    }

    vazio.hidden = true;
    const dados = JSON.parse(salvo);
    for (const chave in rotulos) {
        const item = document.createElement('div');
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = rotulos[chave];
        dd.textContent = dados[chave] || '-';
        item.append(dt, dd);
        lista.appendChild(item);
    }
}

document.getElementById('limpar').addEventListener('click', () => {
    localStorage.removeItem('dadosFormulario');
    mostrar();
});

mostrar();
