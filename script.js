document.addEventListener('DOMContentLoaded', () => {
    // Função para formatar CNPJ
    function formatCnpj(value) {
        value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito
        value = value.replace(/^(\d{2})(\d)/, "$1.$2"); // Coloca ponto entre o segundo e o terceiro dígitos
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); // Coloca ponto entre o quinto e o sexto dígitos
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2"); // Coloca barra entre o oitavo e o nono dígitos
        value = value.replace(/(\d{4})(\d)/, "$1-$2"); // Coloca o hífen depois do bloco de 4
        return value;
    }

    // Aplica a formatação em tempo real nos inputs de CNPJ
    const cnpjInputs = document.querySelectorAll('input[type="text"][id^="cnpjInput"]');
    cnpjInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            event.target.value = formatCnpj(event.target.value);
        });
    });

    // Lida com o envio do formulário (Hero Section)
    const cnpjFormTop = document.getElementById('cnpjForm');
    if (cnpjFormTop) {
        cnpjFormTop.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário
            const cnpjValue = document.getElementById('cnpjInput').value.replace(/\D/g, ""); // Pega apenas os números
            if (cnpjValue.length === 14) { // Validação simples para 14 dígitos
                window.location.href = `https://tax-chat.taxinnovation.com.br/?cnpj=${cnpjValue}`;
            } else {
                alert('Por favor, digite um CNPJ válido com 14 dígitos.');
            }
        });
    }

    // Lida com o envio do formulário (Final CTA Section)
    const cnpjFormBottom = document.getElementById('cnpjFormBottom');
    if (cnpjFormBottom) {
        cnpjFormBottom.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário
            const cnpjValue = document.getElementById('cnpjInputBottom').value.replace(/\D/g, ""); // Pega apenas os números
            if (cnpjValue.length === 14) { // Validação simples para 14 dígitos
                window.location.href = `https://tax-chat.taxinnovation.com.br/?cnpj=${cnpjValue}`;
            } else {
                alert('Por favor, digite um CNPJ válido com 14 dígitos.');
            }
        });
    }

    // Placeholder para GA4 monitoring events (a ser implementado com a tag do Google Analytics)
    // ... (código GA omitido para clareza) ...


    /* LÓGICA PARA ANIMAÇÃO DE SCROLL */

    // Seleciona todos os elementos que devem ser animados ao rolar
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Configura o IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está visível na tela
            if (entry.isIntersecting) {
                // Adiciona a classe 'is-visible' para disparar a animação CSS
                entry.target.classList.add('is-visible');
                // Para de observar o elemento para a animação não repetir
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Dispara a animação when 10% do elemento está visível
    });

    // Coloca o observer para "assistir" cada elemento
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});