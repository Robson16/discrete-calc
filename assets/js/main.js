function inicializar() {
    initialize.style.opacity = "0.8"
    initialize1.style.opacity = "0.8"
    initialize.style.opacity = "0.6"
    initialize1.style.opacity = "0.6"
    initialize.style.opacity = "0.4"
    initialize1.style.opacity = "0.4"
    initialize.style.opacity = "0.2"
    initialize1.style.opacity = "0.2"
    initialize.style.opacity = "0.0"
    initialize1.style.opacity = "0.0"
    initialize.style.display = "none"
    initialize1.style.display = "none"
    vad.style.display = "flex"
    retornar.style.display = "visible"
}

function inicializar1() {
    initialize.style.opacity = "0.8"
    initialize1.style.opacity = "0.8"
    initialize.style.opacity = "0.6"
    initialize1.style.opacity = "0.6"
    initialize.style.opacity = "0.4"
    initialize1.style.opacity = "0.4"
    initialize.style.opacity = "0.2"
    initialize1.style.opacity = "0.2"
    initialize.style.opacity = "0.0"
    initialize1.style.opacity = "0.0"
    initialize.style.display = "none"
    initialize1.style.display = "none"
    poisson.style.display = "flex"
    retornar.style.display = "block"
}

function voltar() {
    initialize.style.opacity = "1.0"
    initialize1.style.opacity = "1.0"
    vad.style.display = "none"
    poisson.style.display = "none"
    retornar.style.display = "none"
    initialize.style.display = "visible"
    initialize1.style.display = "visible"
}

function calcular() {
    var p = parseFloat(document.getElementById('p').value);
    var n = parseFloat(document.getElementById('n').value);
    var x = parseFloat(document.getElementById('x').value);
    p = p / n;
    var media = n * p;
    var q = 1 - p;
    var variancia = n * p * q;
    var desvio = Math.sqrt(variancia);
    var cv = 100 * desvio / media;
    var coefBinomial = fatorial(n) / (fatorial(x) * fatorial(n - x));
    var probabilidadeBinomial = coefBinomial * Math.pow(p, x) * Math.pow(q, n - x) * 100;
    document.getElementById('resP').innerHTML = "Probabilidade de sucesso: " + p.toFixed(2);
    document.getElementById('resQ').innerHTML = "Probabilidade de falha: " + q.toFixed(2);
    document.getElementById('resM').innerHTML = "A média é: " + media.toFixed(2);
    document.getElementById('resVar').innerHTML = "A variancia é: " + variancia.toFixed(2);
    document.getElementById('resD').innerHTML = "O desvio padrão é: " + desvio.toFixed(2);
    document.getElementById('resCV').innerHTML = "O coeficiente de variação é : " + cv.toFixed(2) + "%";
    document.getElementById('resBinomial').innerHTML = "A probabilidade binomial de " + x + " sucessos é: " + probabilidadeBinomial.toFixed(2) + "%";
}

function calcularPoisson() {
    var lambda = parseFloat(document.getElementById('lambda').value);
    var x1 = parseFloat(document.getElementById('x1').value);
    var probabilidadePoisson = (Math.pow(lambda, x1) * Math.exp(-lambda)) / fatorial(x1) * 100;
    document.getElementById('resPoisson').innerHTML = "A probabilidade Poisson de " + x1 + " eventos é: " + probabilidadePoisson.toFixed(2) + "%";
}


function fatorial(n) {
    var resultado = 1;
    for (var i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}