// Função para alternar entre os modais
document.getElementById('expressao').addEventListener('change', function() {
    const entreInputs = document.getElementById('entreInputs');
    entreInputs.style.display = this.value === 'entre' ? 'block' : 'none';
});

// Controle dos inputs condicionais do Poisson
document.getElementById('expressaoPoisson').addEventListener('change', function() {
    document.getElementById('poissonEntreInputs').style.display = 
        this.value === 'entre' ? 'block' : 'none';
});

// Abre um modal específico e esconde os outros
function openModal(modalId) {
    // Esconde todos os modais e seus resultados
    document.querySelectorAll('.modal').forEach(modalElement => {
        modalElement.style.display = 'none';
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


// Função principal de cálculo para as distribuições
function calculate(calculationType) {
    event.preventDefault(); // Previne o recarregamento da página

    if (tipoCalculo === 'binomial') {
        const n = parseFloat(document.getElementById('numberN').value);
        const p = parseFloat(document.getElementById('numberP').value);

        // Obter seleção do dropdown
        const estatistica = document.getElementById('estatistica').value;

        // Esconder todos inicialmente
        document.querySelectorAll('#binomial .result p').forEach(p => {
            p.style.display = 'none';
        });

        // Mostrar conforme seleção
        if (estatistica === 'todas') {
            document.querySelectorAll('#binomial .result p').forEach(p => {
                p.style.display = 'block';
            });
        } else {
            const ids = {
                media: 'resultM',
                variancia: 'resultVar',
                desvio: 'resultD',
                cv: 'resultCV',
                probabilidade: 'resultBinomial'
            };
            document.getElementById('resultP').style.display = 'block';
            document.getElementById('resultQ').style.display = 'block';
            document.getElementById(ids[estatistica]).style.display = 'block';
        }

        const q = 1 - p;
        const media = n * p;
        const variancia = n * p * q;
        const desvio = Math.sqrt(variancia);
        const cv = (media === 0) ? 0 : (100 * desvio / media);

        document.getElementById('resultP').innerHTML = "Probabilidade de sucesso (p): " + p.toFixed(2);
        document.getElementById('resultQ').innerHTML = "Probabilidade de falha (q): " + q.toFixed(2);
        document.getElementById('resultM').innerHTML = "A média (μ) é: " + media.toFixed(2);
        document.getElementById('resultVar').innerHTML = "A variância (σ²) é: " + variancia.toFixed(2);
        document.getElementById('resultD').innerHTML = "O desvio padrão (σ) é: " + desvio.toFixed(2);
        document.getElementById('resultCV').innerHTML = "O coeficiente de variação (CV) é: " + cv.toFixed(2) + "%";
    

        document.querySelector('#binomial .result').style.display = 'block';

    } 
    
    else if (tipoCalculo === 'poisson') {
    const lambda = parseFloat(document.getElementById('lambda').value);
    const expressao = document.getElementById('expressaoPoisson').value;
    const x = parseFloat(document.getElementById('x1').value);
    const a = parseFloat(document.getElementById('poissonA').value);
    const b = parseFloat(document.getElementById('poissonB').value);

    // Validação reforçada
    let error = false;
    if (isNaN(lambda) || lambda < 0) error = true;
    
    if (expressao !== 'entre' && (isNaN(x) || x < 0 || !Number.isInteger(x))) error = true;
    
    if (expressao === 'entre' && (isNaN(a) || isNaN(b) || a < 0 || b < a || 
        !Number.isInteger(a) || !Number.isInteger(b))) error = true;

    if (error) {
        alert('Valores inválidos! Verifique:\n- λ ≥ 0\n- x/a/b inteiros não negativos\n- a ≤ b');
        return;
    }

    let probabilidade = 0;
    let textoResultado = '';

    // Cálculos para cada caso
    switch(expressao) {
        case 'igual':
            probabilidade = poissonSingle(lambda, x);
            textoResultado = `P(X = ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'maior':
            for (let k = Math.floor(x) + 1; k <= lambda + 50; k++) { // Limite prático
                probabilidade += poissonSingle(lambda, k);
            }
            textoResultado = `P(X > ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'menor':
            for (let k = 0; k < Math.floor(x); k++) {
                probabilidade += poissonSingle(lambda, k);
            }
            textoResultado = `P(X < ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'maiorigual':
            for (let k = Math.floor(x); k <= lambda + 50; k++) {
                probabilidade += poissonSingle(lambda, k);
            }
            textoResultado = `P(X ≥ ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'menorigual':
            for (let k = 0; k <= Math.floor(x); k++) {
                probabilidade += poissonSingle(lambda, k);
            }
            textoResultado = `P(X ≤ ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'entre':
            for (let k = Math.floor(a); k <= Math.floor(b); k++) {
                probabilidade += poissonSingle(lambda, k);
            }
            textoResultado = `P(${a} ≤ X ≤ ${b}) = ${probabilidade.toFixed(2)}%`;
            break;
    }

    document.getElementById('resultPoisson').innerHTML = textoResultado;
    document.querySelector('#poisson .result').style.display = 'block';
}

    else if (tipoCalculo === 'probabilidade-binomial') {
    const n = parseFloat(document.getElementById('numberN2').value);
    const p = parseFloat(document.getElementById('numberP2').value);
    const x = parseFloat(document.getElementById('numberX2').value);
    const a = parseFloat(document.getElementById('numberA').value);
    const b = parseFloat(document.getElementById('numberB').value);
    const expressao = document.getElementById('expressao').value;

    // Validação ampliada
    let error = false;
    if (isNaN(n) || isNaN(p) || n < 0 || p < 0 || p > 1 || !Number.isInteger(n)) error = true;
    
    if (expressao !== 'entre' && (isNaN(x) || x < 0 || x > n || !Number.isInteger(x))) error = true;
    
    if (expressao === 'entre' && (isNaN(a) || isNaN(b) || a < 0 || b < a || b > n || 
        !Number.isInteger(a) || !Number.isInteger(b))) error = true;

    if (error) {
        alert('Valores inválidos! Verifique:\n- n deve ser inteiro ≥ 0\n- p entre 0 e 1\n- x/a/b inteiros dentro dos limites');
        return;
    }

    const q = 1 - p;
    let probabilidade = 0;
    let textoResultado = '';

    // Cálculo para cada caso
    switch(expressao) {
        case 'igual':
            probabilidade = binomial(n, x, p);
            textoResultado = `P(X = ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'maior':
            for (let k = Math.floor(x) + 1; k <= n; k++) {
                probabilidade += binomial(n, k, p);
            }
            textoResultado = `P(X > ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'menor':
            for (let k = 0; k < Math.floor(x); k++) {
                probabilidade += binomial(n, k, p);
            }
            textoResultado = `P(X < ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'maiorigual':
            for (let k = Math.floor(x); k <= n; k++) {
                probabilidade += binomial(n, k, p);
            }
            textoResultado = `P(X ≥ ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'menorigual':
            for (let k = 0; k <= Math.floor(x); k++) {
                probabilidade += binomial(n, k, p);
            }
            textoResultado = `P(X ≤ ${x}) = ${probabilidade.toFixed(2)}%`;
            break;
            
        case 'entre':
            for (let k = Math.floor(a); k <= Math.floor(b); k++) {
                probabilidade += binomial(n, k, p);
            }
            textoResultado = `P(${a} ≤ X ≤ ${b}) = ${probabilidade.toFixed(2)}%`;
            break;
    }

    
    document.getElementById('resultP2').innerHTML = `Probabilidade de sucesso (p): ${p.toFixed(2)}`;
    document.getElementById('resultQ2').innerHTML = `Probabilidade de falha (q): ${q.toFixed(2)}`;
    document.getElementById('resultProbBinomial2').innerHTML = textoResultado;
    document.querySelector('#probabilidade-binomial .result').style.display = 'block';
}

}

// Função auxiliar para cálculo de probabilidade binomial
function binomial(n, k, p) {
    if (k < 0 || k > n) return 0;
    return (fatorial(n) / (fatorial(k) * fatorial(n - k))) * Math.pow(p, k) * Math.pow(1 - p, n - k) * 100;
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

// Função auxiliar para cálculo individual de Poisson
function poissonSingle(lambda, k) {
    if (k < 0 || !Number.isInteger(k)) return 0;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / fatorial(k) * 100;
}
