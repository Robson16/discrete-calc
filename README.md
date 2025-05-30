# DiscreteCalc: Calculadora de Variáveis Discretas

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Robson16/discrete-calc/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Robson16/discrete-calc.svg?style=social)](https://github.com/Robson16/discrete-calc/stargazers)

---

## 🎯 Sobre o Projeto

O **DiscreteCalc** é uma ferramenta web simples e intuitiva, projetada para auxiliar no cálculo de probabilidades e métricas de **Variáveis Discretas**. Atualmente, ele oferece suporte para as seguintes distribuições:

* **Distribuição Binomial:** Calcula a probabilidade de um número específico de sucessos, probabilidades em diferentes intervalos (maior que, menor que, entre, etc.), além de apresentar a média, variância, desvio padrão e coeficiente de variação.
* **Distribuição Poisson:** Calcula a probabilidade de um número específico de eventos ocorrerem em um intervalo fixo, e também probabilidades em diversos intervalos (maior que, menor que, entre, etc.).

Desenvolvido com foco na simplicidade e usabilidade, o DiscreteCalc é um **trabalho conjunto das disciplinas de Estatística, ministrada pelo Prof. João Carlos ([LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-carlos-dos-santos-749481bb/)), e Programação de Scripts, ministrada pelo Prof. Cláudio Luís Vieira Oliveira ([LinkedIn](https://www.linkedin.com/in/clvoliveira/))**. Ambas as disciplinas fazem parte do 2º Semestre do curso de **TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS** da **Faculdade de Tecnologia de Jundiaí Deputado Ary Fossen**. É ideal para estudantes, professores ou qualquer pessoa que precise realizar cálculos rápidos em probabilidade discreta.

---

## ✨ Funcionalidades

* Cálculo de **Probabilidade Binomial** ($P(X=x)$) para diversos cenários:
    * Probabilidade exata ($P(X=x)$)
    * Probabilidade maior que ($P(X>x)$)
    * Probabilidade menor que ($P(X<x)$)
    * Probabilidade maior ou igual ($P(X \ge x)$)
    * Probabilidade menor ou igual ($P(X \le x)$)
    * Probabilidade em intervalos inclusivos ($P(a \le X \le b)$)
    * Probabilidade em intervalos estritos ($P(a < X < b)$)
    * Probabilidade em intervalos semi-inclusivos (ex: $P(a < X \le b)$ e $P(a \le X < b)$)
* Cálculo de **Probabilidade Poisson** ($P(X=x)$) para diversos cenários:
    * Probabilidade exata ($P(X=x)$)
    * Probabilidade maior que ($P(X>x)$)
    * Probabilidade menor que ($P(X<x)$)
    * Probabilidade maior ou igual ($P(X \ge x)$)
    * Probabilidade menor ou igual ($P(X \le x)$)
    * Probabilidade em intervalos inclusivos ($P(a \le X \le b)$)
    * Probabilidade em intervalos estritos ($P(a < X < b)$)
    * Probabilidade em intervalos semi-inclusivos (ex: $P(a < X \le b)$ e $P(a \le X < b)$)
* Exibição de métricas para a Distribuição Binomial:
    * Média ($\mu$)
    * Variância ($\sigma^2$)
    * Desvio Padrão ($\sigma$)
    * Coeficiente de Variação (CV)
* Interface intuitiva e responsiva.
* Validação de entrada para garantir dados corretos.

---

## 🚀 Como Usar

Para utilizar a DiscreteCalc, siga estes passos simples:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/Robson16/discrete-calc.git](https://github.com/Robson16/discrete-calc.git)
    ```
2.  **Navegue até o Diretório:**
    ```bash
    cd discrete-calc
    ```
3.  **Abra o `index.html`:** Simplesmente abra o arquivo `index.html` em seu navegador web preferido (Chrome, Firefox, Edge, etc.). Você pode fazer isso arrastando o arquivo para a janela do navegador ou clicando duas vezes nele.

### Realizando Cálculos:

1.  Na tela inicial, clique no botão da **distribuição** que deseja calcular (Binomial ou Poisson).
2.  Preencha os campos com os valores necessários.
3.  Selecione a **expressão de probabilidade** desejada (por exemplo, `= x`, `> x`, `a ≤ X ≤ b`, etc.). Note que os campos "Valor mínimo (a)" e "Valor máximo (b)" aparecerão apenas quando uma opção de intervalo for selecionada.
4.  Clique no botão **"Calcular"**.
5.  Os resultados aparecerão abaixo do formulário.
6.  Para voltar à seleção de distribuição, clique no botão **"Voltar"**.

---

## 📺 Demonstração

Confira a calculadora em ação:

* **Acesse a Demonstração:** [https://discrete-calc.vercel.app/](https://discrete-calc.vercel.app/)

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica da aplicação.
* **CSS3:** Estilização e responsividade, utilizando variáveis CSS para facilitar a manutenção do tema.
* **JavaScript (Vanilla JS):** Lógica da aplicação, cálculos matemáticos e manipulação do DOM.

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Se você tiver sugestões, encontrar bugs ou quiser adicionar novas funcionalidades (como outras distribuições discretas, por exemplo), sinta-se à vontade para:

1.  Fazer um **fork** do projeto.
2.  Criar uma nova **branch** (`git checkout -b feature/sua-feature`).
3.  Realizar suas alterações e **commitá-las** (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Fazer um **push** para a branch (`git push origin feature/sua-feature`).
5.  Abrir um **Pull Request**.

---

## 🌟 Colaboradores

Um agradecimento especial a todos que contribuíram para este projeto! Você pode ver a lista completa de contribuidores [aqui](https://github.com/Robson16/discrete-calc/graphs/contributors).

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://github.com/Robson16/discrete-calc/blob/main/LICENSE) para detalhes.