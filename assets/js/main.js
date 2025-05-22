// Função para abrir e fechar modais
function modal(tipoModal) {
    // Esconde todos os modais primeiro
    document.querySelectorAll('.modal').forEach(function (modalElement) {
        modalElement.style.display = 'none';

        // Esconde a div de resultados ao trocar de modal para limpar a exibição
        const resultDiv = modalElement.querySelector('.result');

        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    });

    // Exibe o modal correspondente
    const selectedModal = document.getElementById(tipoModal);

    if (selectedModal) {
        selectedModal.style.display = 'flex';
    }

    // Gerencia a visibilidade do botão "Voltar"
    const retornarButton = document.querySelector('.closeModal');

    if (retornarButton) {
        retornarButton.style.display = 'block'; // Ou 'flex', dependendo do seu layout
    }
}

// Função para fechar todos os modais e voltar à tela inicial
function closeModal() {
    document.querySelectorAll('.modal').forEach(function (modalElement) {
        modalElement.style.display = 'none';
        // Esconde a div de resultados ao fechar o modal
        const resultDiv = modalElement.querySelector('.result');

        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    });

    // Esconde o botão "Voltar"
    const retornarButton = document.querySelector('.closeModal');

    if (retornarButton) {
        retornarButton.style.display = 'none';
    }
}

// Função principal de cálculo para ambas as distribuições
function calc(tipoCalculo) {
    // Previne o recarregamento da página ao enviar o formulário
    event.preventDefault();

    if (tipoCalculo === 'binomial') {
        const n = parseFloat(document.getElementById('numberN').value);
        const p = parseFloat(document.getElementById('numberP').value);
        const x = parseFloat(document.getElementById('numberX').value);

        // Validação para a Distribuição Binomial.
        // A validação !Number.isInteger(n) e !Number.isInteger(x) aqui
        // é importante, especialmente se o input HTML não tiver step="1".
        if (isNaN(n) || isNaN(p) || isNaN(x) || n < 0 || p < 0 || p > 1 || x < 0 || x > n || !Number.isInteger(n) || !Number.isInteger(x)) {
            alert('Por favor, insira valores válidos para a Distribuição Binomial:\n- n (tentativas) deve ser um número inteiro não negativo.\n- p (probabilidade) deve ser um número entre 0 e 1.\n- x (sucessos) deve ser um número inteiro não negativo e menor ou igual a n.');
            return;
        }

        const q = 1 - p;
        const media = n * p;
        const variancia = n * p * q;
        const desvio = Math.sqrt(variancia);

        const cv = (media === 0) ? 0 : (100 * desvio / media);

        const coefBinomial = fatorial(n) / (fatorial(x) * fatorial(n - x));
        const probabilidadeBinomial = coefBinomial * Math.pow(p, x) * Math.pow(q, n - x) * 100;

        document.getElementById('resultP').innerHTML = "Probabilidade de sucesso (p): " + p.toFixed(4);
        document.getElementById('resultQ').innerHTML = "Probabilidade de falha (q): " + q.toFixed(4);
        document.getElementById('resultM').innerHTML = "A média (μ) é: " + media.toFixed(4);
        document.getElementById('resultVar').innerHTML = "A variância (σ²) é: " + variancia.toFixed(4);
        document.getElementById('resultD').innerHTML = "O desvio padrão (σ) é: " + desvio.toFixed(4);
        document.getElementById('resultCV').innerHTML = "O coeficiente de variação (CV) é: " + cv.toFixed(2) + "%";
        document.getElementById('resultBinomial').innerHTML = "A probabilidade binomial de " + x + " sucessos (P(X=" + x + ")) é: " + probabilidadeBinomial.toFixed(4) + "%";

        document.querySelector('#binomial .result').style.display = 'block';

    } else if (tipoCalculo === 'poisson') {
        const lambda = parseFloat(document.getElementById('lambda').value);
        const x1 = parseFloat(document.getElementById('x1').value);

        // Validação para a Distribuição Poisson.
        // A validação !Number.isInteger(x1) aqui é importante
        // se o input HTML não tiver step="1".
        if (isNaN(lambda) || isNaN(x1) || lambda < 0 || x1 < 0 || !Number.isInteger(x1)) {
            alert('Por favor, insira valores válidos para a Distribuição Poisson:\n- Taxa média (λ) deve ser um número não negativo.\n- X (sucessos) deve ser um número inteiro não negativo.');
            return;
        }

        const probabilidadePoisson = (Math.pow(lambda, x1) * Math.exp(-lambda)) / fatorial(x1) * 100;

        document.getElementById('resultPoisson').innerHTML = "A probabilidade Poisson de " + x1 + " eventos (P(X=" + x1 + ")) é: " + probabilidadePoisson.toFixed(4) + "%";

        document.querySelector('#poisson .result').style.display = 'block';
    }
}

// Função auxiliar para cálculo de fatorial
function fatorial(n) {
    if (n < 0) return NaN; // Fatorial não é definido para números negativos

    if (n === 0 || n === 1) return 1;

    let resultado = 1;

    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }

    return resultado;
}