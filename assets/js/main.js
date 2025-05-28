// Funções auxiliares matemáticas
// Função para calcular o fatorial de um número
function factorial(n) {
    if (n < 0) return NaN; // Fatorial não é definido para números negativos
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Função para calcular a probabilidade binomial de P(X=k)
function calculateBinomialProbability(n, k, p) {
    if (k < 0 || k > n || !Number.isInteger(k) || !Number.isInteger(n)) return 0;
    const q = 1 - p;
    const binomialCoefficient = factorial(n) / (factorial(k) * factorial(n - k));
    return binomialCoefficient * Math.pow(p, k) * Math.pow(q, n - k) * 100; // Retorna em porcentagem
}

// Função para calcular a probabilidade de Poisson de P(X=k)
function calculatePoissonProbability(lambda, k) {
    if (k < 0 || !Number.isInteger(k)) return 0;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k) * 100; // Retorna em porcentagem
}

// --- Funções para controle de UI (User Interface) ---

// Adiciona listeners para controlar a visibilidade dos inputs "entre"
document.addEventListener('DOMContentLoaded', function () {
    // Para o modal de Probabilidade Binomial
    const binomialExpressionSelect = document.getElementById('expressao');
    const binomialBetweenInputs = document.getElementById('entreInputs');
    if (binomialExpressionSelect && binomialBetweenInputs) {
        binomialExpressionSelect.addEventListener('change', function () {
            binomialBetweenInputs.style.display = this.value === 'entre' ? 'flex' : 'none';
        });
        // Garante o estado inicial correto ao carregar a página
        binomialBetweenInputs.style.display = binomialExpressionSelect.value === 'entre' ? 'flex' : 'none';
    }

    // Para o modal de Distribuição Poisson
    const poissonExpressionSelect = document.getElementById('expressaoPoisson');
    const poissonBetweenInputs = document.getElementById('poissonEntreInputs');
    if (poissonExpressionSelect && poissonBetweenInputs) {
        poissonExpressionSelect.addEventListener('change', function () {
            poissonBetweenInputs.style.display = this.value === 'entre' ? 'flex' : 'none';
        });
        // Garante o estado inicial correto ao carregar a página
        poissonBetweenInputs.style.display = poissonExpressionSelect.value === 'entre' ? 'flex' : 'none';
    }
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

    // Exibe o modal selecionado
    const selectedModal = document.getElementById(modalId);
    if (selectedModal) {
        selectedModal.style.display = 'flex';
    }

    // Mostra o botão "Voltar"
    const backButton = document.querySelector('.closeModal');
    if (backButton) {
        backButton.style.display = 'block';
    }
}

// Fecha todos os modais e retorna à tela inicial
function closeModal() {
    document.querySelectorAll('.modal').forEach(modalElement => {
        modalElement.style.display = 'none';
        const resultDiv = modalElement.querySelector('.result');
        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    });

    // Esconde o botão "Voltar"
    const backButton = document.querySelector('.closeModal');
    if (backButton) {
        backButton.style.display = 'none';
    }
}

// Função principal de cálculo para as distribuições
function calculate(calculationType) {
    event.preventDefault(); // Previne o recarregamento da página

    // Lógica para o modal de Estatísticas Binomiais
    if (calculationType === 'binomial') {
        const n = parseFloat(document.getElementById('numberN').value);
        const p = parseFloat(document.getElementById('numberP').value);
        const statistic = document.getElementById('estatistica').value;

        // Validação de entradas
        if (isNaN(n) || isNaN(p) || n < 0 || p < 0 || p > 1 || !Number.isInteger(n)) {
            alert('Por favor, insira valores válidos para as Estatísticas Binomiais:\n- Espaço Amostral (n) deve ser um número inteiro não negativo.\n- Probabilidade de sucesso (p) deve ser entre 0 e 1.');
            return;
        }

        const q = 1 - p;
        const mean = n * p;
        const variance = n * p * q;
        const standardDeviation = Math.sqrt(variance);
        const cv = (mean === 0) ? 0 : (100 * standardDeviation / mean);

        // Limpa e esconde todos os resultados antes de exibir os selecionados
        const resultParagraphs = document.querySelectorAll('#binomial .result p');
        resultParagraphs.forEach(pElement => {
            pElement.innerHTML = ''; // Limpa o texto
            pElement.style.display = 'none'; // Esconde
        });

        // Exibe os resultados baseados na seleção
        if (statistic === 'todas') {
            document.getElementById('resultM').innerHTML = "A média (μ) é: " + mean.toFixed(2);
            document.getElementById('resultVar').innerHTML = "A variância (σ²) é: " + variance.toFixed(2);
            document.getElementById('resultD').innerHTML = "O desvio padrão (σ) é: " + standardDeviation.toFixed(2);
            document.getElementById('resultCV').innerHTML = "O coeficiente de variação (CV) é: " + cv.toFixed(2) + "%";
            resultParagraphs.forEach(pElement => pElement.style.display = 'block'); // Mostra todos
        } else if (statistic === 'media') {
            document.getElementById('resultM').innerHTML = "A média (μ) é: " + mean.toFixed(2);
            document.getElementById('resultM').style.display = 'block';
        } else if (statistic === 'variancia') {
            document.getElementById('resultVar').innerHTML = "A variância (σ²) é: " + variance.toFixed(2);
            document.getElementById('resultVar').style.display = 'block';
        } else if (statistic === 'desvio') {
            document.getElementById('resultD').innerHTML = "O desvio padrão (σ) é: " + standardDeviation.toFixed(2);
            document.getElementById('resultD').style.display = 'block';
        } else if (statistic === 'cv') {
            document.getElementById('resultCV').innerHTML = "O coeficiente de variação (CV) é: " + cv.toFixed(2) + "%";
            document.getElementById('resultCV').style.display = 'block';
        }

        document.querySelector('#binomial .result').style.display = 'block';

    }
    // Lógica para o modal de Distribuição Poisson
    else if (calculationType === 'poisson') {
        const lambda = parseFloat(document.getElementById('lambda').value);
        const expression = document.getElementById('expressaoPoisson').value;
        const x = parseFloat(document.getElementById('x1').value);
        const a = parseFloat(document.getElementById('poissonA').value);
        const b = parseFloat(document.getElementById('poissonB').value);

        // Validação de entradas
        let hasError = false;
        if (isNaN(lambda) || lambda < 0) {
            hasError = true;
        } else if (expression !== 'entre') {
            if (isNaN(x) || x < 0 || !Number.isInteger(x)) hasError = true;
        } else if (expression === 'entre') {
            if (isNaN(a) || isNaN(b) || a < 0 || b < a || !Number.isInteger(a) || !Number.isInteger(b)) hasError = true;
        }

        if (hasError) {
            alert('Valores inválidos! Verifique:\n- Taxa média (λ) deve ser ≥ 0.\n- X, A, B devem ser inteiros não negativos.\n- A ≤ B (para cálculo "entre").');
            return;
        }

        let probability = 0;
        let resultMessage = '';

        // Calcula a probabilidade de Poisson
        switch (expression) {
            case 'igual':
                probability = calculatePoissonProbability(lambda, x);
                resultMessage = `P(X = ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'maior': // P(X > x) = 1 - P(X <= x)
                let sumLessEqual = 0;
                for (let k = 0; k <= x; k++) {
                    sumLessEqual += calculatePoissonProbability(lambda, k);
                }
                probability = 100 - sumLessEqual;
                resultMessage = `P(X > ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'menor': // P(X < x) = P(X <= x-1)
                for (let k = 0; k < x; k++) {
                    probability += calculatePoissonProbability(lambda, k);
                }
                resultMessage = `P(X < ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'maiorIgual': // P(X >= x) = 1 - P(X < x)
                let sumLess = 0;
                for (let k = 0; k < x; k++) {
                    sumLess += calculatePoissonProbability(lambda, k);
                }
                probability = 100 - sumLess;
                resultMessage = `P(X ≥ ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'menorIgual': // P(X <= x)
                for (let k = 0; k <= x; k++) {
                    probability += calculatePoissonProbability(lambda, k);
                }
                resultMessage = `P(X ≤ ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'entre': // P(a <= X <= b)
                for (let k = Math.floor(a); k <= Math.floor(b); k++) {
                    probability += calculatePoissonProbability(lambda, k);
                }
                resultMessage = `P(${a} ≤ X ≤ ${b}) = ${probability.toFixed(2)}%`;
                break;
        }

        document.getElementById('resultPoisson').innerHTML = resultMessage;
        document.querySelector('#poisson .result').style.display = 'block';
    }
    // Lógica para o modal de Probabilidade Binomial (calculo de P(X=k))
    else if (calculationType === 'probabilidade-binomial') {
        const n = parseFloat(document.getElementById('numberN2').value);
        const p = parseFloat(document.getElementById('numberP2').value);
        const x = parseFloat(document.getElementById('numberX2').value);
        const a = parseFloat(document.getElementById('numberA').value);
        const b = parseFloat(document.getElementById('numberB').value);
        const expression = document.getElementById('expressao').value;

        // Validação de entradas
        let hasError = false;
        if (isNaN(n) || isNaN(p) || n < 0 || p < 0 || p > 1 || !Number.isInteger(n)) {
            hasError = true;
        } else if (expression !== 'entre') {
            if (isNaN(x) || x < 0 || x > n || !Number.isInteger(x)) hasError = true;
        } else if (expression === 'entre') {
            if (isNaN(a) || isNaN(b) || a < 0 || b < a || b > n || !Number.isInteger(a) || !Number.isInteger(b)) hasError = true;
        }

        if (hasError) {
            alert('Valores inválidos! Verifique:\n- Espaço Amostral (n) deve ser um inteiro ≥ 0.\n- Probabilidade de sucesso (p) deve ser entre 0 e 1.\n- X, A, B devem ser inteiros dentro dos limites (0 a n) e A ≤ B.');
            return;
        }

        let probability = 0;
        let resultMessage = '';

        // Calcula a probabilidade binomial
        switch (expression) {
            case 'igual':
                probability = calculateBinomialProbability(n, x, p);
                resultMessage = `P(X = ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'maior': // P(X > x) = 1 - P(X <= x)
                let sumLessEqual = 0;
                for (let k = 0; k <= x; k++) {
                    sumLessEqual += calculateBinomialProbability(n, k, p);
                }
                probability = 100 - sumLessEqual;
                resultMessage = `P(X > ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'menor': // P(X < x) = P(X <= x-1)
                for (let k = 0; k < x; k++) {
                    probability += calculateBinomialProbability(n, k, p);
                }
                resultMessage = `P(X < ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'maiorIgual': // P(X >= x) = 1 - P(X < x)
                let sumLess = 0;
                for (let k = 0; k < x; k++) {
                    sumLess += calculateBinomialProbability(n, k, p);
                }
                probability = 100 - sumLess;
                resultMessage = `P(X ≥ ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'menorIgual': // P(X <= x)
                for (let k = 0; k <= x; k++) {
                    probability += calculateBinomialProbability(n, k, p);
                }
                resultMessage = `P(X ≤ ${x}) = ${probability.toFixed(2)}%`;
                break;
            case 'entre': // P(a <= X <= b)
                for (let k = Math.floor(a); k <= Math.floor(b); k++) {
                    probability += calculateBinomialProbability(n, k, p);
                }
                resultMessage = `P(${a} ≤ X ≤ ${b}) = ${probability.toFixed(2)}%`;
                break;
        }

        // Os resultados de p e q não são exibidos no modal de "Probabilidade Binomial" no seu HTML atual,
        // mas se forem adicionados, você pode descomentar estas linhas.
        // document.getElementById('resultP2').innerHTML = `Probabilidade de sucesso (p): ${p.toFixed(2)}`;
        // document.getElementById('resultQ2').innerHTML = `Probabilidade de falha (q): ${q.toFixed(2)}`;
        document.getElementById('resultProbBinomial2').innerHTML = resultMessage;
        document.querySelector('#probabilidade-binomial .result').style.display = 'block';
    }
}