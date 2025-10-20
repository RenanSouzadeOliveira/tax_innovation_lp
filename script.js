document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÃO HELPER PARA GOOGLE ANALYTICS ---
    function trackGAEvent(eventName, eventParams = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
            console.log(`GA Event: ${eventName}`, eventParams); // Log para debug
        } else {
            console.warn('Google Analytics gtag function not available.');
        }
    }

    // --- FORMATAÇÃO DO CNPJ ---
    function formatCnpj(value) {
        value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito
        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
        return value;
    }

    const cnpjInputs = document.querySelectorAll('input[type="text"][id^="cnpjInput"]');
    cnpjInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            event.target.value = formatCnpj(event.target.value);
        });

        // --- TRACKING GA: Interação com campo CNPJ ---
        input.addEventListener('focus', () => {
            trackGAEvent('form_interaction', {
                'form_location': input.id === 'cnpjInput' ? 'hero_section' : 'final_cta'
            });
        });
    });

    // --- ENVIO DO FORMULÁRIO (HERO SECTION) ---
    const cnpjFormTop = document.getElementById('cnpjForm');
    if (cnpjFormTop) {
        cnpjFormTop.addEventListener('submit', (event) => {
            event.preventDefault();
            const cnpjValueRaw = document.getElementById('cnpjInput').value;
            const cnpjValue = cnpjValueRaw.replace(/\D/g, "");
            if (cnpjValue.length === 14) {
                // --- TRACKING GA: Geração de Lead (Conversão Principal) ---
                trackGAEvent('generate_lead', {
                    'lead_type': 'cnpj_submission',
                    'form_location': 'hero_section',
                    // 'value': 1, // Opcional: atribuir um valor à conversão
                    // 'currency': 'BRL' // Opcional: moeda do valor
                });

                // Atraso pequeno para garantir o envio do evento antes do redirecionamento
                setTimeout(() => {
                    window.location.href = `https://tax-chat.taxinnovation.com.br/?cnpj=${cnpjValue}`;
                }, 300); // 300ms de atraso

            } else {
                alert('Por favor, digite um CNPJ válido com 14 dígitos.');
            }
        });
    }

    // --- ENVIO DO FORMULÁRIO (FINAL CTA SECTION) ---
    const cnpjFormBottom = document.getElementById('cnpjFormBottom');
    if (cnpjFormBottom) {
        cnpjFormBottom.addEventListener('submit', (event) => {
            event.preventDefault();
            const cnpjValueRaw = document.getElementById('cnpjInputBottom').value;
            const cnpjValue = cnpjValueRaw.replace(/\D/g, "");
            if (cnpjValue.length === 14) {
                // --- TRACKING GA: Geração de Lead (Conversão Principal) ---
                trackGAEvent('generate_lead', {
                    'lead_type': 'cnpj_submission',
                    'form_location': 'final_cta',
                    // 'value': 1, // Opcional
                    // 'currency': 'BRL' // Opcional
                });

                 // Atraso pequeno
                setTimeout(() => {
                     window.location.href = `https://tax-chat.taxinnovation.com.br/?cnpj=${cnpjValue}`;
                }, 300);

            } else {
                alert('Por favor, digite um CNPJ válido com 14 dígitos.');
            }
        });
    }


    /* --- LÓGICA PARA ANIMAÇÃO DE SCROLL --- */
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});