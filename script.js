const botaoTema = document.getElementById('botao-tema');

function aplicarTema(escuro) {
    document.body.classList.toggle('escuro', escuro);
    botaoTema.textContent = escuro ? '☀️' : '🌙';
    botaoTema.setAttribute('aria-label', escuro ? 'Mudar para tema claro' : 'Mudar para tema escuro');
}

let temaSalvo = null;
try {
    temaSalvo = localStorage.getItem('tema');
} catch (e) {}

const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
aplicarTema(temaSalvo ? temaSalvo === 'escuro' : prefereEscuro);

botaoTema.addEventListener('click', () => {
    const escuro = !document.body.classList.contains('escuro');
    aplicarTema(escuro);
    try {
        localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
    } catch (e) {}
});
