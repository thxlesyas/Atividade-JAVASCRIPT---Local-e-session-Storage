const mascaras = {
    cep: v => v.slice(0, 8).replace(/^(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1-$2'),
    cpf: v => v.slice(0, 11)
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2'),
    cnpj: v => v.slice(0, 14)
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2'),
    telefone: v => {
        if (v.length > 2) v = v.replace(/^55/, '');
        v = v.slice(0, 11);
        if (!v) return '';
        return '+55 (' + v.slice(0, 2) +
            (v.length > 2 ? ') ' + v.slice(2, 3) : '') +
            (v.length > 3 ? ' ' + v.slice(3, 7) : '') +
            (v.length > 7 ? '-' + v.slice(7) : '');
    }
};

document.querySelectorAll('[data-mascara]').forEach(campo => {
    campo.addEventListener('input', e => {
        let numeros = campo.value.replace(/\D/g, '');
        if (campo.dataset.mascara === 'telefone' && e.inputType?.startsWith('delete') && numeros.length <= 2) {
            numeros = '';
        }
        campo.value = mascaras[campo.dataset.mascara](numeros);
    });
});

document.getElementById('formulario').addEventListener('submit', e => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));
    localStorage.setItem('dadosFormulario', JSON.stringify(dados));
    window.location.href = 'dados.html';
});
