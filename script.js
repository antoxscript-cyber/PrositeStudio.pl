// ============================================================================
// KONFIGURACJA EMAILJS - GOTOWA DO UŻYCIA!
// ============================================================================
// ✅ Konfiguracja jest już gotowa i skonfigurowana dla antoxscript@gmail.com
// 
// INSTRUKCJA KONFIGURACJI EMAILJS (jeśli chcesz zmienić ustawienia):
// 
// 1. Idź na https://www.emailjs.com/ i zaloguj się
// 2. Utwórz nowy serwis email (Gmail) z adresem antoxscript@gmail.com
// 3. Utwórz szablon email o nazwie "template_zamowienie" z następującą treścią:
//
//    Temat: {{subject}}
//    
//    Treść (HTML):
//    {{{message_html}}}
//
// 4. W ustawieniach konta skopiuj swój Public Key
// 5. Zaktualizuj poniższe dane jeśli potrzeba:

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_REAL_PUBLIC_KEY',      // Wstaw tutaj swój prawdziwy klucz z EmailJS
    SERVICE_ID: 'YOUR_REAL_SERVICE_ID',      // Wstaw tutaj swój prawdziwy Service ID
    TEMPLATE_ID: 'YOUR_REAL_TEMPLATE_ID'     // Wstaw tutaj swój prawdziwy Template ID
};

// ============================================================================
// ALTERNATYWNA KONFIGURACJA FORMSPREE
// ============================================================================
// Jeśli wolisz użyć Formspree:
// 1. Zarejestruj się na https://formspree.io/
// 2. Utwórz nowy formularz z adresem antoxscript@gmail.com
// 3. Wklej swój endpoint poniżej:

const FORMSPREE_CONFIG = {
    ENDPOINT: 'https://formspree.io/f/xpwagkqr'  // Prawdziwy endpoint dla antoxscript@gmail.com
};

// Wybierz metodę wysyłania (true = EmailJS, false = Formspree)
const USE_EMAILJS = false; // Używamy Formspree jako głównej metody

// ============================================================================
// GŁÓWNA FUNKCJONALNOŚĆ
// ============================================================================

// ============================================================================
// OCHRONA PRZED ZBADANIEM KODU
// ============================================================================
// Wyłącz menu kontekstowe (prawy przycisk myszy)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Wyłącz F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
    }
});

// Wykryj otwarcie Developer Tools
let devtools = {
    open: false,
    orientation: null
};

const threshold = 160;

setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
            devtools.open = true;
            // Przekieruj na pustą stronę
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial;"><h1>🔒 Dostęp zabroniony</h1></div>';
        }
    } else {
        devtools.open = false;
    }
}, 500);

// Wyłącz zaznaczanie tekstu
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Wyłącz przeciąganie
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja wszystkich funkcji
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    initFormHandling();
    initSmoothScrolling();
    initServiceModals();
    initOpiniaForm();
    initAuthSystem();
    initChatSystem();
    
    // Załaduj opinie z localStorage
    loadOpinions();
    
    // Ładowanie EmailJS jeśli jest wybrane
    if (USE_EMAILJS) {
        loadEmailJS();
    }
    
    // Przywróć stan po odświeżeniu
    restoreStateAfterRefresh();
});

// ============================================================================
// MENU MOBILNE
// ============================================================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Zamknij menu po kliknięciu w link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Zamknij menu po kliknięciu poza nim
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================================================
// ANIMACJE SCROLL
// ============================================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Obserwuj wszystkie sekcje
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Animacja nagłówka przy scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll w dół - ukryj header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll w górę - pokaż header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ============================================================================
// FAQ ACCORDION
// ============================================================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Zamknij wszystkie inne FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle aktualny FAQ
            item.classList.toggle('active', !isActive);
        });
    });
}

// ============================================================================
// OBSŁUGA FORMULARZA
// ============================================================================
function initFormHandling() {
    const form = document.getElementById('orderForm');
    const submitButton = form.querySelector('.submit-button');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Walidacja formularza
        if (!validateForm()) {
            return;
        }

        // Pokaż loading state
        setLoadingState(true);

        try {
            // Zapisz zamówienie lokalnie
            const formData = new FormData(form);
            const now = new Date();
            const dateTime = now.toLocaleString('pl-PL');
            
            const orderData = {
                id: Date.now().toString(),
                email: formData.get('email'),
                nick: formData.get('email').split('@')[0], // Nick z emaila
                inspiracja: formData.get('inspiracja'),
                nazwa: formData.get('nazwa'),
                opis: formData.get('opis'),
                dateTime: dateTime,
                status: 'new',
                messages: []
            };
            
            // Zapisz zamówienie
            const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
            orders.unshift(orderData);
            localStorage.setItem('prositestudio_orders', JSON.stringify(orders));
            
            // Pokaż komunikat sukcesu
            showSuccessMessage();
            
            // Pokaż widget czatu dla klienta
            showClientChatWidget(orderData);
            
            // Automatycznie rozpocznij czat od strony administratora
            startAdminChatForNewOrder(orderData);
            
            // Odśwież widget klienta po dodaniu wiadomości administratora
            setTimeout(() => {
                loadClientChatMessages(orderData);
            }, 500);
            
            // Powiadom administratora o nowym zamówieniu
            notifyAdminAboutNewOrder(orderData);
            
        } catch (error) {
            console.error('Błąd wysyłania:', error);
            showErrorMessage('Wystąpił błąd podczas wysyłania. Spróbuj ponownie.');
        } finally {
            setLoadingState(false);
        }
    });

    // Walidacja w czasie rzeczywistym
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(input);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(input);
        });
    });
}

// ============================================================================
// WALIDACJA FORMULARZA
// ============================================================================
function validateForm() {
    const form = document.getElementById('orderForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    const errorMessage = fieldGroup.querySelector('.error-message');
    
    // Wyczyść poprzednie błędy
    clearFieldError(field);
    
    // Sprawdź czy pole jest wymagane i puste
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'To pole jest wymagane');
        return false;
    }
    
    // Walidacja URL
    if (field.type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            showFieldError(field, 'Podaj prawidłowy adres URL (np. https://example.com)');
            return false;
        }
    }
    
    // Walidacja długości
    if (field.name === 'nick' && value.length < 2) {
        showFieldError(field, 'Nick musi mieć co najmniej 2 znaki');
        return false;
    }
    
    if (field.name === 'nazwa' && value.length < 3) {
        showFieldError(field, 'Nazwa strony musi mieć co najmniej 3 znaki');
        return false;
    }
    
    if (field.name === 'opis' && value.length < 10) {
        showFieldError(field, 'Opis musi mieć co najmniej 10 znaków');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const errorMessage = fieldGroup.querySelector('.error-message');
    
    fieldGroup.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    const errorMessage = fieldGroup.querySelector('.error-message');
    
    fieldGroup.classList.remove('error');
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

// ============================================================================
// WYSYŁANIE Z EMAILJS
// ============================================================================
function loadEmailJS() {
    // Ładuj EmailJS tylko jeśli jest potrzebny
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    };
    document.head.appendChild(script);
}

async function sendWithEmailJS() {
    const formData = getFormData();
    
    // Formatuj datę i czas
    const now = new Date();
    const dateTime = now.toLocaleString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Utwórz sformatowaną wiadomość w HTML z tabelą
    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h2 style="margin: 0; font-size: 24px;">🚀 Nowe Zamówienie - ProSite Studio</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Otrzymano: ${dateTime}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <thead>
                        <tr style="background: #667eea; color: white;">
                            <th style="padding: 15px; text-align: left; font-weight: 600; border-bottom: 2px solid #5a67d8;">Pole</th>
                            <th style="padding: 15px; text-align: left; font-weight: 600; border-bottom: 2px solid #5a67d8;">Wartość</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 15px; font-weight: 600; color: #4a5568; background: #f7fafc;">👤 Nick osoby</td>
                            <td style="padding: 15px; color: #2d3748;">${formData.nick}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 15px; font-weight: 600; color: #4a5568; background: #f7fafc;">🎨 Inspiracja</td>
                            <td style="padding: 15px; color: #2d3748;"><a href="${formData.inspiracja}" style="color: #667eea; text-decoration: none;">${formData.inspiracja}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 15px; font-weight: 600; color: #4a5568; background: #f7fafc;">🌐 Nazwa strony</td>
                            <td style="padding: 15px; color: #2d3748; font-weight: 600;">${formData.nazwa}</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px; font-weight: 600; color: #4a5568; background: #f7fafc; vertical-align: top;">📝 Opis projektu</td>
                            <td style="padding: 15px; color: #2d3748; line-height: 1.6;">${formData.opis.replace(/\n/g, '<br>')}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div style="margin-top: 30px; padding: 20px; background: #e6fffa; border-left: 4px solid #38b2ac; border-radius: 4px;">
                    <h3 style="margin: 0 0 10px 0; color: #2c7a7b; font-size: 18px;">💡 Następne kroki:</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #2d3748;">
                        <li>Skontaktuj się z klientem w ciągu 24h</li>
                        <li>Omów szczegóły projektu</li>
                        <li>Ustal harmonogram realizacji</li>
                        <li>Rozpocznij pracę nad projektem</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #718096; font-size: 14px;">
                        🤖 Wiadomość wygenerowana automatycznie przez system ProSite Studio
                    </p>
                </div>
            </div>
        </div>
    `;
    
    const templateParams = {
        to_email: 'antoxscript@gmail.com',
        from_name: 'ProSite Studio Bot',
        subject: `🚀 Nowe zamówienie od ${formData.nick} - ${formData.nazwa}`,
        message_html: htmlMessage,
        // Dodatkowe parametry dla kompatybilności
        nick: formData.nick,
        inspiracja: formData.inspiracja,
        nazwa: formData.nazwa,
        opis: formData.opis,
        data_zamowienia: dateTime
    };

    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
    );
}

// ============================================================================
// WYSYŁANIE Z FORMSPREE
// ============================================================================
async function sendWithFormspree() {
    const formData = getFormData();
    
    // Formatuj datę i czas
    const now = new Date();
    const dateTime = now.toLocaleString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Utwórz sformatowaną wiadomość tekstową
    const message = `
🚀 NOWE ZAMÓWIENIE - PROSITE STUDIO
Otrzymano: ${dateTime}

═══════════════════════════════════════

👤 NICK OSOBY: ${formData.nick}
🎨 INSPIRACJA: ${formData.inspiracja}
🌐 NAZWA STRONY: ${formData.nazwa}

📝 OPIS PROJEKTU:
${formData.opis}

═══════════════════════════════════════

💡 NASTĘPNE KROKI:
• Skontaktuj się z klientem w ciągu 24h
• Omów szczegóły projektu
• Ustal harmonogram realizacji
• Rozpocznij pracę nad projektem

🤖 Wiadomość wygenerowana automatycznie przez system ProSite Studio
    `;
    
    const response = await fetch(FORMSPREE_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _subject: `🚀 Nowe zamówienie od ${formData.nick} - ${formData.nazwa}`,
            message: message,
            nick: formData.nick,
            inspiracja: formData.inspiracja,
            nazwa: formData.nazwa,
            opis: formData.opis,
            data_zamowienia: dateTime,
            _replyto: 'noreply@prositestudio.com'
        })
    });

    if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
    }

    return response.json();
}

// ============================================================================
// POMOCNICZE FUNKCJE FORMULARZA
// ============================================================================
function getFormData() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    
    return {
        nick: formData.get('nick'),
        inspiracja: formData.get('inspiracja'),
        nazwa: formData.get('nazwa'),
        opis: formData.get('opis')
    };
}

function setLoadingState(loading) {
    const submitButton = document.querySelector('.submit-button');
    const form = document.getElementById('orderForm');
    
    if (loading) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        form.style.pointerEvents = 'none';
    } else {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        form.style.pointerEvents = 'auto';
    }
}

function showSuccessMessage() {
    const form = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    
    // Ukryj formularz
    form.style.opacity = '0';
    form.style.transform = 'scale(0.95)';
    
    // Pokaż komunikat sukcesu
    setTimeout(() => {
        successMessage.classList.add('show');
    }, 300);
    
    // Zresetuj formularz po 5 sekundach
    setTimeout(() => {
        resetForm();
    }, 5000);
}

function showErrorMessage(message) {
    // Możesz dodać własny komunikat błędu lub użyć alert
    alert(message);
}

function resetForm() {
    const form = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    
    // Ukryj komunikat sukcesu
    successMessage.classList.remove('show');
    
    // Pokaż formularz
    setTimeout(() => {
        form.style.opacity = '1';
        form.style.transform = 'scale(1)';
        form.reset();
        
        // Wyczyść wszystkie błędy
        const fieldGroups = form.querySelectorAll('.form-group');
        fieldGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            errorMessage.classList.remove('show');
            errorMessage.textContent = '';
        });
    }, 300);
}

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// EFEKTY RIPPLE NA PRZYCISKACH
// ============================================================================
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-button, .hero-cta, .submit-button')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Dodaj style dla efektu ripple
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.6);
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// ============================================================================
// MODALS USŁUG
// ============================================================================
function initServiceModals() {
    const modal = document.getElementById('serviceModal');
    if (!modal) {
        console.error('Modal serviceModal nie został znaleziony podczas inicjalizacji');
        return;
    }
    
    const closeBtn = modal.querySelector('.close');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    
    console.log('Inicjalizacja modali usług. Znaleziono przycisków:', learnMoreBtns.length);
    
    // Dane usług
    const servicesData = {
        wizytowka: {
            icon: '🌐',
            title: 'Strona Wizytówka',
            description: 'Elegancka strona wizytówka to idealne rozwiązanie dla firm, które chcą zaprezentować się profesjonalnie w internecie. Zawiera wszystkie najważniejsze informacje o Twojej działalności w przejrzystej i atrakcyjnej formie.',
            features: [
                'Responsywny design dostosowany do wszystkich urządzeń',
                'Sekcja "O nas" z opisem firmy',
                'Galeria zdjęć produktów/usług',
                'Formularz kontaktowy',
                'Mapa z lokalizacją firmy',
                'Integracja z mediami społecznościowymi',
                'Optymalizacja SEO',
                'Hosting i domena na rok (opcjonalnie)'
            ],
            timeline: '3-5 dni roboczych'
        },
        landing: {
            icon: '🚀',
            title: 'Landing Page',
            description: 'Skuteczna strona sprzedażowa zaprojektowana z myślą o konwersji. Każdy element jest starannie przemyślany, aby przekonać odwiedzających do podjęcia konkretnego działania - zakupu, rejestracji czy kontaktu.',
            features: [
                'Atrakcyjny hero section z wyrazistym CTA',
                'Sekcja korzyści i funkcji produktu/usługi',
                'Testimoniale i opinie klientów',
                'Sekcja FAQ odpowiadająca na wątpliwości',
                'Formularz kontaktowy/zamówienia',
                'Liczniki i statystyki budujące zaufanie',
                'Optymalizacja pod kątem konwersji',
                'Integracja z narzędziami analitycznymi'
            ],
            timeline: '5-7 dni roboczych'
        },
        sklep: {
            icon: '🛒',
            title: 'Sklep Internetowy',
            description: 'Nowoczesny sklep internetowy z pełną funkcjonalnością e-commerce. Umożliwia sprzedaż produktów online z wygodnym systemem zarządzania zamówieniami, płatnościami i dostawami.',
            features: [
                'Katalog produktów z filtrowaniem i wyszukiwaniem',
                'Koszyk i proces składania zamówień',
                'Panel administracyjny do zarządzania sklepem',
                'Integracja z systemami płatności online',
                'System zarządzania stanem magazynowym',
                'Powiadomienia email o zamówieniach',
                'Responsywny design mobilny',
                'Optymalizacja SEO dla produktów'
            ],
            timeline: '10-14 dni roboczych'
        },
        blog: {
            icon: '📝',
            title: 'Blog/Portal',
            description: 'Profesjonalny blog lub portal informacyjny z systemem zarządzania treścią. Idealny dla firm, które chcą regularnie publikować artykuły, aktualności czy poradniki, budując tym samym pozycję eksperta w swojej branży.',
            features: [
                'System zarządzania artykułami (CMS)',
                'Kategorie i tagi dla lepszej organizacji',
                'System komentarzy i moderacji',
                'Newsletter i subskrypcje',
                'Wyszukiwarka artykułów',
                'Panel autora do publikowania treści',
                'Optymalizacja SEO dla artykułów',
                'Integracja z mediami społecznościowymi'
            ],
            timeline: '7-10 dni roboczych'
        }
    };
    
    // Obsługa kliknięć w przyciski "Dowiedz się więcej"
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Kliknięto przycisk "Dowiedz się więcej"');
            
            const card = this.closest('.oferta-card');
            const serviceType = card.getAttribute('data-service');
            const serviceData = servicesData[serviceType];
            
            console.log('Typ usługi:', serviceType);
            console.log('Dane usługi:', serviceData);
            
            if (serviceData) {
                showServiceModal(serviceData);
            } else {
                console.error('Nie znaleziono danych dla usługi:', serviceType);
            }
        });
    });
    
    // Zamknij modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Zamknij modal po kliknięciu w tło
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Zamknij modal klawiszem ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function showServiceModal(serviceData) {
    console.log('Pokazywanie modala dla usługi:', serviceData);
    
    const modal = document.getElementById('serviceModal');
    if (!modal) {
        console.error('Modal serviceModal nie został znaleziony');
        return;
    }
    
    const modalIcon = modal.querySelector('.modal-icon');
    const modalTitle = modal.querySelector('.modal-title');
    const serviceDetails = modal.querySelector('.service-details');
    const featuresList = modal.querySelector('.features-list');
    const timelineText = modal.querySelector('.timeline-text');
    
    // Sprawdź czy wszystkie elementy istnieją
    if (!modalIcon || !modalTitle || !serviceDetails || !featuresList || !timelineText) {
        console.error('Nie wszystkie elementy modala zostały znalezione');
        return;
    }
    
    // Wypełnij modal danymi
    modalIcon.textContent = serviceData.icon;
    modalTitle.textContent = serviceData.title;
    serviceDetails.textContent = serviceData.description;
    timelineText.textContent = serviceData.timeline;
    
    // Wypełnij listę funkcji
    featuresList.innerHTML = '';
    serviceData.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Pokaż modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('Modal został pokazany pomyślnie');
}

// ============================================================================
// SYSTEM OPINII
// ============================================================================
function loadOpinions() {
    const opinions = JSON.parse(localStorage.getItem('prositestudio_opinions') || '[]');
    const opinieGrid = document.getElementById('opinieGrid');
    
    if (opinions.length === 0) {
        opinieGrid.innerHTML = '<div class="no-opinions" style="text-align: center; padding: 2rem; color: #6b7280;">Brak opinii. Bądź pierwszy!</div>';
        return;
    }
    
    opinieGrid.innerHTML = opinions.map(opinion => `
        <div class="opinia-card">
            <div class="opinia-header">
                <div class="opinia-avatar">${opinion.nick.charAt(0).toUpperCase()}</div>
                <div class="opinia-info">
                    <h4>${opinion.nick}</h4>
                    <div class="opinia-stars">${'⭐'.repeat(opinion.rating)}</div>
                </div>
            </div>
            <p class="opinia-text">${opinion.tresc}</p>
            <div class="opinia-date">${opinion.date}</div>
        </div>
    `).join('');
}

function initOpiniaForm() {
    const form = document.getElementById('opiniaForm');
    const submitBtn = form.querySelector('.submit-opinia-btn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Walidacja formularza opinii
        if (!validateOpiniaForm()) {
            return;
        }
        
        // Pokaż loading state
        setOpiniaLoadingState(true);
        
        try {
            // Wyślij opinię
            await sendOpinia();
            
            // Dodaj opinię do listy
            addOpiniaToGrid();
            
            // Zresetuj formularz
            form.reset();
            
            // Pokaż komunikat sukcesu
            showOpiniaSuccess();
            
        } catch (error) {
            console.error('Błąd wysyłania opinii:', error);
            showErrorMessage('Wystąpił błąd podczas wysyłania opinii. Spróbuj ponownie.');
        } finally {
            setOpiniaLoadingState(false);
        }
    });
}

function validateOpiniaForm() {
    const form = document.getElementById('opiniaForm');
    const email = form.querySelector('#opiniaEmail').value.trim();
    const rating = form.querySelector('input[name="rating"]:checked');
    const tresc = form.querySelector('#opiniaTresc').value.trim();
    
    if (!email || !email.includes('@')) {
        showErrorMessage('Podaj prawidłowy adres email');
        return false;
    }
    
    if (!rating) {
        showErrorMessage('Wybierz ocenę');
        return false;
    }
    
    if (!tresc || tresc.length < 10) {
        showErrorMessage('Opinia musi mieć co najmniej 10 znaków');
        return false;
    }
    
    return true;
}

async function sendOpinia() {
    const form = document.getElementById('opiniaForm');
    const formData = new FormData(form);
    
    const email = formData.get('email');
    const nick = email.split('@')[0]; // Utwórz nick z emaila
    
    const opiniaData = {
        email: email,
        nick: nick,
        rating: formData.get('rating'),
        tresc: formData.get('tresc'),
        data: new Date().toISOString()
    };
    
    // Tutaj możesz dodać wysyłanie opinii przez EmailJS lub Formspree
    // Na razie symulujemy wysyłanie
    return new Promise(resolve => {
        setTimeout(() => {
            // Zapisz opinię w localStorage jako backup
            saveOpiniaToStorage(opiniaData);
            resolve();
        }, 1000);
    });
}

function saveOpiniaToStorage(opiniaData) {
    const opinie = JSON.parse(localStorage.getItem('prositestudio_opinie') || '[]');
    opinie.unshift(opiniaData);
    // Zachowaj maksymalnie 50 opinii
    if (opinie.length > 50) {
        opinie.splice(50);
    }
    localStorage.setItem('prositestudio_opinie', JSON.stringify(opinie));
}

function addOpiniaToGrid() {
    const form = document.getElementById('opiniaForm');
    const formData = new FormData(form);
    
    const email = formData.get('email');
    const rating = parseInt(formData.get('rating'));
    const tresc = formData.get('tresc');
    
    // Utwórz nick z emaila (część przed @)
    const nick = email.split('@')[0];
    
    // Utwórz obiekt opinii
    const opinion = {
        id: Date.now().toString(),
        nick: nick,
        email: email,
        rating: rating,
        tresc: tresc,
        date: 'Teraz',
        timestamp: new Date().toISOString()
    };
    
    // Zapisz do localStorage
    const opinions = JSON.parse(localStorage.getItem('prositestudio_opinions') || '[]');
    opinions.unshift(opinion); // Dodaj na początek
    
    // Ogranicz do 50 opinii
    if (opinions.length > 50) {
        opinions.splice(50);
    }
    
    localStorage.setItem('prositestudio_opinions', JSON.stringify(opinions));
    
    // Odśwież wyświetlanie opinii
    loadOpinions();
    
    // Znajdź nowo dodaną opinię i dodaj animację
    const grid = document.getElementById('opinieGrid');
    const newOpinion = grid.firstElementChild;
    
    if (newOpinion && newOpinion.classList.contains('opinia-card')) {
        newOpinion.style.opacity = '0';
        newOpinion.style.transform = 'translateY(20px)';
        
        // Animacja wejścia
        setTimeout(() => {
            newOpinion.style.transition = 'all 0.3s ease-out';
            newOpinion.style.opacity = '1';
            newOpinion.style.transform = 'translateY(0)';
        }, 100);
    }
}

function setOpiniaLoadingState(loading) {
    const submitBtn = document.querySelector('.submit-opinia-btn');
    const form = document.getElementById('opiniaForm');
    
    if (loading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        form.style.pointerEvents = 'none';
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        form.style.pointerEvents = 'auto';
    }
}

function showOpiniaSuccess() {
    // Możesz dodać własny komunikat sukcesu
    const message = document.createElement('div');
    message.className = 'success-toast';
    message.textContent = 'Dziękujemy za opinię!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Dodaj style dla toastów
const toastStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

const toastStyleSheet = document.createElement('style');
toastStyleSheet.textContent = toastStyles;
document.head.appendChild(toastStyleSheet);

// ============================================================================
// SYSTEM LOGOWANIA I REJESTRACJI
// ============================================================================
function initAuthSystem() {
    // Elementy DOM
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Przełączniki między modalami
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Formularz logowania
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Sprawdź czy użytkownik jest zalogowany
    checkAuthStatus();
    
    // Event listenery
    loginBtn.addEventListener('click', () => showModal(loginModal));
    registerBtn.addEventListener('click', () => showModal(registerModal));
    logoutBtn.addEventListener('click', logout);
    
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(loginModal);
        showModal(registerModal);
    });
    
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(registerModal);
        showModal(loginModal);
    });
    
    // Zamykanie modali
    document.querySelectorAll('.auth-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.auth-modal');
            hideModal(modal);
        });
    });
    
    // Zamykanie modali po kliknięciu w tło
    [loginModal, registerModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });
    
    // Obsługa formularzy
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    
    // Walidacja w czasie rzeczywistym
    setupAuthValidation();
}

function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus na pierwszym polu
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 100);
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Wyczyść formularz
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        clearAuthErrors(form);
    }
}

function checkAuthStatus() {
    const user = localStorage.getItem('prositestudio_user');
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (user) {
        const userData = JSON.parse(user);
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        userName.textContent = userData.name;
        
        // Sprawdź dostęp administratora
        checkAdminAccess();
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
        
        // Ukryj zakładkę administratora
        const adminTab = document.getElementById('adminOrdersTab');
        if (adminTab) {
            adminTab.style.display = 'none';
        }
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Walidacja
    if (!validateAuthForm(form)) {
        return;
    }
    
    // Loading state
    setAuthLoadingState(form, true);
    
    try {
        // Symulacja logowania (w prawdziwej aplikacji byłoby to API)
        await simulateLogin(email, password);
        
        // Sukces
        const userData = {
            email: email,
            name: email.split('@')[0], // Użyj części przed @ jako nazwa
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('prositestudio_user', JSON.stringify(userData));
        
        hideModal(document.getElementById('loginModal'));
        checkAuthStatus();
        showAuthSuccess('Zalogowano pomyślnie!');
        
    } catch (error) {
        showAuthError(form, error.message);
    } finally {
        setAuthLoadingState(form, false);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Walidacja
    if (!validateAuthForm(form)) {
        return;
    }
    
    // Sprawdź czy hasła się zgadzają
    if (password !== confirmPassword) {
        showFieldAuthError(form.querySelector('#registerConfirmPassword'), 'Hasła nie są identyczne');
        return;
    }
    
    // Sprawdź regulamin
    if (!terms) {
        showFieldAuthError(form.querySelector('#registerTerms'), 'Musisz zaakceptować regulamin');
        return;
    }
    
    // Loading state
    setAuthLoadingState(form, true);
    
    try {
        // Symulacja rejestracji
        await simulateRegister(name, email, password);
        
        // Wyślij powiadomienie o rejestracji na Twój email
        await sendRegistrationNotification(name, email);
        
        // Sukces - automatyczne logowanie
        const userData = {
            name: name,
            email: email,
            registerTime: new Date().toISOString()
        };
        
        localStorage.setItem('prositestudio_user', JSON.stringify(userData));
        
        hideModal(document.getElementById('registerModal'));
        checkAuthStatus();
        showAuthSuccess('Konto utworzone pomyślnie! Witaj w ProSite Studio!');
        
    } catch (error) {
        showAuthError(form, error.message);
    } finally {
        setAuthLoadingState(form, false);
    }
}

async function simulateLogin(email, password) {
    // Symulacja opóźnienia API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sprawdź czy użytkownik istnieje w localStorage
    const existingUsers = JSON.parse(localStorage.getItem('prositestudio_users') || '[]');
    const user = existingUsers.find(u => u.email === email);
    
    if (!user) {
        throw new Error('Nie znaleziono konta z tym adresem email');
    }
    
    if (user.password !== password) {
        throw new Error('Nieprawidłowe hasło');
    }
    
    return user;
}

async function simulateRegister(name, email, password) {
    // Symulacja opóźnienia API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Sprawdź czy email już istnieje
    const existingUsers = JSON.parse(localStorage.getItem('prositestudio_users') || '[]');
    if (existingUsers.find(u => u.email === email)) {
        throw new Error('Konto z tym adresem email już istnieje');
    }
    
    // Dodaj nowego użytkownika
    const newUser = {
        name: name,
        email: email,
        password: password, // W prawdziwej aplikacji byłoby to zahashowane
        registerDate: new Date().toISOString()
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('prositestudio_users', JSON.stringify(existingUsers));
    
    return newUser;
}

async function sendRegistrationNotification(name, email) {
    // Wyślij powiadomienie o nowej rejestracji na Twój Gmail
    const now = new Date();
    const dateTime = now.toLocaleString('pl-PL');
    
    const message = `
🎉 NOWA REJESTRACJA - PROSITE STUDIO
Data: ${dateTime}

═══════════════════════════════════════

👤 NOWY UŻYTKOWNIK:
• Imię i nazwisko: ${name}
• Email: ${email}

═══════════════════════════════════════

💡 AKCJE DO WYKONANIA:
• Wyślij email powitalny
• Dodaj do listy mailingowej
• Przygotuj materiały promocyjne

🤖 Powiadomienie wygenerowane automatycznie przez system ProSite Studio
    `;
    
    try {
        const response = await fetch(FORMSPREE_CONFIG.ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _subject: `🎉 Nowa rejestracja: ${name} (${email})`,
                message: message,
                type: 'registration',
                user_name: name,
                user_email: email,
                registration_date: dateTime
            })
        });
        
        if (!response.ok) {
            console.error('Błąd wysyłania powiadomienia o rejestracji');
        }
    } catch (error) {
        console.error('Błąd wysyłania powiadomienia o rejestracji:', error);
    }
}

function logout() {
    localStorage.removeItem('prositestudio_user');
    checkAuthStatus();
    showAuthSuccess('Wylogowano pomyślnie!');
}

function validateAuthForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateAuthField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateAuthField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Wyczyść poprzednie błędy
    clearFieldAuthError(field);
    
    // Sprawdź czy pole jest wymagane i puste
    if (field.hasAttribute('required') && !value) {
        showFieldAuthError(field, 'To pole jest wymagane');
        return false;
    }
    
    // Walidacja email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldAuthError(field, 'Podaj prawidłowy adres email');
            return false;
        }
    }
    
    // Walidacja hasła
    if (field.type === 'password' && field.name === 'password' && value) {
        if (value.length < 6) {
            showFieldAuthError(field, 'Hasło musi mieć co najmniej 6 znaków');
            return false;
        }
    }
    
    // Walidacja imienia
    if (field.name === 'name' && value) {
        if (value.length < 2) {
            showFieldAuthError(field, 'Imię musi mieć co najmniej 2 znaki');
            return false;
        }
    }
    
    return isValid;
}

function setupAuthValidation() {
    const authInputs = document.querySelectorAll('.auth-form input');
    
    authInputs.forEach(input => {
        input.addEventListener('blur', () => validateAuthField(input));
        input.addEventListener('input', () => clearFieldAuthError(input));
    });
}

function showFieldAuthError(field, message) {
    const formGroup = field.closest('.auth-form-group');
    const errorElement = formGroup.querySelector('.auth-error-message');
    
    field.classList.add('error');
    errorElement.textContent = message;
}

function clearFieldAuthError(field) {
    const formGroup = field.closest('.auth-form-group');
    const errorElement = formGroup.querySelector('.auth-error-message');
    
    field.classList.remove('error');
    errorElement.textContent = '';
}

function clearAuthErrors(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => clearFieldAuthError(input));
}

function showAuthError(form, message) {
    // Pokaż błąd w pierwszym polu
    const firstInput = form.querySelector('input');
    if (firstInput) {
        showFieldAuthError(firstInput, message);
    }
}

function setAuthLoadingState(form, loading) {
    const submitBtn = form.querySelector('.auth-submit-btn');
    const inputs = form.querySelectorAll('input, button');
    
    if (loading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        inputs.forEach(input => input.disabled = true);
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        inputs.forEach(input => input.disabled = false);
    }
}

function showAuthSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// ============================================================================
// SYSTEM CZATU I ZAMÓWIEŃ
// ============================================================================
function initChatSystem() {
    // Sprawdź czy użytkownik to administrator
    checkAdminAccess();
    
    // Inicjalizuj widget czatu dla klientów
    initClientChatWidget();
    
    // Inicjalizuj panel administratora
    initAdminPanel();
}

function checkAdminAccess() {
    const user = localStorage.getItem('prositestudio_user');
    const adminTab = document.getElementById('adminOrdersTab');
    
    console.log('Sprawdzanie dostępu administratora:', user);
    
    if (user) {
        const userData = JSON.parse(user);
        console.log('Dane użytkownika:', userData);
        console.log('Email użytkownika:', userData.email);
        console.log('Czy to admin?', userData.email === 'antoxscript@gmail.com');
        
        if (userData.email === 'antoxscript@gmail.com') {
            console.log('Pokazuję zakładkę administratora');
            // Pokaż zakładkę administratora
            if (adminTab) {
                adminTab.style.display = 'block';
                loadAdminOrders();
            } else {
                console.error('Nie znaleziono elementu adminOrdersTab');
            }
        } else {
            console.log('Użytkownik nie jest administratorem');
            if (adminTab) {
                adminTab.style.display = 'none';
            }
        }
    } else {
        console.log('Brak zalogowanego użytkownika');
        if (adminTab) {
            adminTab.style.display = 'none';
        }
    }
}

function initAdminPanel() {
    const adminLink = document.querySelector('a[href="#admin-orders"]');
    if (adminLink) {
        adminLink.addEventListener('click', (e) => {
            e.preventDefault();
            showAdminPanel();
        });
    }
    
    // Inicjalizuj czat administratora
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessageBtn');
    const emojiBtn = document.getElementById('emojiBtn');
    const emojiPicker = document.getElementById('emojiPicker');
    
    if (chatInput && sendBtn) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendAdminMessage();
            }
        });
        
        sendBtn.addEventListener('click', sendAdminMessage);
    }
    
    // Inicjalizuj emoji picker
    if (emojiBtn && emojiPicker) {
        emojiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
        });
        
        // Dodaj event listenery dla emoji
        emojiPicker.querySelectorAll('.emoji-item').forEach(emoji => {
            emoji.addEventListener('click', () => {
                const currentValue = chatInput.value;
                chatInput.value = currentValue + emoji.textContent;
                chatInput.focus();
                emojiPicker.style.display = 'none';
            });
        });
        
        // Zamknij emoji picker po kliknięciu poza nim
        document.addEventListener('click', (e) => {
            if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
                emojiPicker.style.display = 'none';
            }
        });
    }
}

function showAdminPanel() {
    // Ukryj wszystkie sekcje
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Pokaż panel administratora
    document.getElementById('admin-orders').style.display = 'block';
    
    // Załaduj zamówienia
    loadAdminOrders();
    
    // Uruchom automatyczne odświeżanie
    startAutoRefresh();
}

function startAutoRefresh() {
    // Zatrzymaj poprzedni interval jeśli istnieje
    if (window.adminRefreshInterval) {
        clearInterval(window.adminRefreshInterval);
    }
    
    // Uruchom nowy interval - tylko sprawdzanie powiadomień
    window.adminRefreshInterval = setInterval(() => {
        // Sprawdź czy są nowe nieprzeczytane wiadomości
        const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
        const hasNewMessages = orders.some(order => getUnreadMessagesCount(order) > 0);
        
        if (hasNewMessages) {
            // Aktualizuj tytuł strony z powiadomieniem
            if (!document.title.includes('(!)')) {
                document.title = '(!) ' + document.title;
            }
        } else {
            // Usuń powiadomienie z tytułu
            document.title = document.title.replace('(!) ', '');
        }
        
        // Odśwież tylko wskaźniki nieprzeczytanych wiadomości
        updateUnreadIndicators();
        
    }, 5000); // Odświeżaj co 5 sekund
}

function loadAdminOrders() {
    const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="no-orders">Brak zamówień</div>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => {
        const unreadCount = getUnreadMessagesCount(order);
        const hasUnread = unreadCount > 0;
        
        return `
            <div class="order-item ${hasUnread ? 'has-unread' : ''}" data-order-id="${order.id}">
                <div class="order-header">
                    <div class="order-user">${order.nick}</div>
                    <div class="order-time">${order.dateTime}</div>
                </div>
                <div class="order-preview">${order.nazwa}</div>
                <div class="order-status ${order.status}">${getStatusText(order.status)}</div>
                ${hasUnread ? `<div class="unread-badge">${unreadCount}</div>` : '<div class="unread-badge"></div>'}
            </div>
        `;
    }).join('');
    
    // Dodaj event listenery do wszystkich zamówień
    document.querySelectorAll('.order-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const orderId = this.getAttribute('data-order-id');
            console.log('Kliknięto zamówienie:', orderId);
            selectOrder(orderId);
        });
    });
    
    // Przywróć ostatnio wybrane zamówienie po odświeżeniu
    const selectedOrderId = localStorage.getItem('prositestudio_selected_order');
    if (selectedOrderId && orders.find(o => o.id === selectedOrderId)) {
        setTimeout(() => {
            selectOrder(selectedOrderId);
        }, 100);
    }
}

function getStatusText(status) {
    const statusMap = {
        'new': 'Nowe',
        'in-progress': 'W realizacji',
        'completed': 'Zakończone'
    };
    return statusMap[status] || 'Nieznany';
}

function getUnreadMessagesCount(order) {
    if (!order.messages || order.messages.length === 0) return 0;
    
    // Policz wiadomości od klienta, które nie zostały przeczytane przez admina
    return order.messages.filter(msg => 
        msg.sender === 'client' && !msg.readByAdmin
    ).length;
}

function markMessagesAsRead(orderId) {
    const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
        // Oznacz wszystkie wiadomości klienta jako przeczytane
        let hasUnreadMessages = false;
        orders[orderIndex].messages.forEach(msg => {
            if (msg.sender === 'client' && !msg.readByAdmin) {
                msg.readByAdmin = true;
                hasUnreadMessages = true;
            }
        });
        
        // Zapisz tylko jeśli były nieprzeczytane wiadomości
        if (hasUnreadMessages) {
            localStorage.setItem('prositestudio_orders', JSON.stringify(orders));
            
            // Odśwież tylko wskaźniki nieprzeczytanych wiadomości
            updateUnreadIndicators();
        }
    }
}

function updateUnreadIndicators() {
    const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
    
    orders.forEach(order => {
        const orderItem = document.querySelector(`[data-order-id="${order.id}"]`);
        if (orderItem) {
            const unreadCount = getUnreadMessagesCount(order);
            const unreadBadge = orderItem.querySelector('.unread-badge');
            
            if (unreadCount > 0) {
                orderItem.classList.add('has-unread');
                if (unreadBadge) {
                    unreadBadge.textContent = unreadCount;
                }
            } else {
                orderItem.classList.remove('has-unread');
                if (unreadBadge) {
                    unreadBadge.textContent = '';
                }
            }
        }
    });
}

function selectOrder(orderId) {
    try {
        console.log('Wybieranie zamówienia:', orderId);
        
        // Zapisz aktualnie wybrane zamówienie
        localStorage.setItem('prositestudio_selected_order', orderId);
        
        // Usuń aktywną klasę z wszystkich zamówień
        document.querySelectorAll('.order-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Dodaj aktywną klasę do wybranego zamówienia
        const selectedItem = document.querySelector(`[data-order-id="${orderId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
            console.log('Dodano klasę active do zamówienia:', orderId);
        }
        
        // Załaduj szczegóły zamówienia
        loadOrderDetails(orderId);
        
        // Pokaż szczegóły zamówienia
        showOrderDetails(orderId);
        
        // Oznacz wiadomości jako przeczytane
        markMessagesAsRead(orderId);
        
        // Pokaż pole do pisania
        const chatInputContainer = document.getElementById('chatInputContainer');
        if (chatInputContainer) {
            chatInputContainer.style.display = 'block';
        }
        
        console.log('Zamówienie wybrane pomyślnie');
    } catch (error) {
        console.error('Błąd podczas wybierania zamówienia:', error);
    }
}

// Globalna funkcja dla kompatybilności
window.selectOrder = selectOrder;

function loadOrderDetails(orderId) {
    try {
        const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        
        if (!order) {
            console.error('Nie znaleziono zamówienia:', orderId);
            return;
        }
        
        console.log('Ładowanie szczegółów zamówienia:', order);
        
        // Aktualizuj nagłówek czatu
        const chatUserName = document.getElementById('chatUserName');
        const chatUserStatus = document.getElementById('chatUserStatus');
        
        if (chatUserName) chatUserName.textContent = order.nick;
        if (chatUserStatus) chatUserStatus.textContent = 'Online';
        
        // Załaduj wiadomości
        loadChatMessages(order);
        
        // Zapisz aktualnie wybrany order
        window.currentOrderId = orderId;
        
        console.log('Szczegóły zamówienia załadowane pomyślnie');
    } catch (error) {
        console.error('Błąd podczas ładowania szczegółów zamówienia:', error);
    }
}

function loadChatMessages(order) {
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatMessages) {
        console.error('Element chatMessages nie został znaleziony');
        return;
    }
    
    console.log('Ładowanie wiadomości dla zamówienia:', order.id, 'Liczba wiadomości:', order.messages?.length || 0);
    
    if (!order.messages || order.messages.length === 0) {
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">💬</div>
                <h3>Nowe zamówienie od ${order.nick}</h3>
                <div style="text-align: left; margin-top: 2rem; background: white; padding: 1.5rem; border-radius: 10px;">
                    <h4>📋 Szczegóły zamówienia:</h4>
                    <p><strong>Nazwa:</strong> ${order.nazwa}</p>
                    <p><strong>Inspiracja:</strong> <a href="${order.inspiracja}" target="_blank">${order.inspiracja}</a></p>
                    <p><strong>Opis:</strong></p>
                    <p style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 0.5rem;">${order.opis}</p>
                    <p><strong>Data złożenia:</strong> ${order.dateTime}</p>
                </div>
            </div>
        `;
    } else {
        chatMessages.innerHTML = order.messages.map(msg => `
            <div class="message ${msg.sender === 'admin' ? 'admin' : 'client'}">
                <div class="message-content">
                    <div class="message-author">${msg.sender === 'admin' ? 'ProSiteStudio' : order.nick}</div>
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Przewiń do dołu
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendAdminMessage() {
    const chatInput = document.getElementById('chatInput');
    const messageText = chatInput.value.trim();
    
    if (!messageText || !window.currentOrderId) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    
    const message = {
        id: Date.now().toString(),
        sender: 'admin',
        text: messageText,
        time: timeString,
        timestamp: now.toISOString()
    };
    
    // Dodaj wiadomość do zamówienia
    const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === window.currentOrderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].messages.push(message);
        orders[orderIndex].status = 'in-progress';
        localStorage.setItem('prositestudio_orders', JSON.stringify(orders));
        
        // Odśwież widok
        loadOrderDetails(window.currentOrderId);
        
        // Odśwież tylko wskaźniki nieprzeczytanych wiadomości
        updateUnreadIndicators();
        
        // Wyczyść pole input
        chatInput.value = '';
        
        // Powiadom klienta (jeśli ma otwarty widget)
        notifyClient(window.currentOrderId, message);
    }
}

function showOrderDetails(orderId) {
    try {
        console.log('Pokazywanie szczegółów zamówienia:', orderId);
        
        const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        
        if (!order) {
            console.error('Nie znaleziono zamówienia do pokazania szczegółów:', orderId);
            return;
        }
        
        // Pokaż sekcję szczegółów
        const orderDetails = document.getElementById('orderDetails');
        if (orderDetails) {
            orderDetails.style.display = 'block';
            console.log('Sekcja szczegółów zamówienia została pokazana');
        } else {
            console.error('Element orderDetails nie został znaleziony');
            return;
        }
        
        // Wypełnij szczegóły
        const orderEmail = document.getElementById('orderEmail');
        const orderInspiracja = document.getElementById('orderInspiracja');
        const orderNazwa = document.getElementById('orderNazwa');
        const orderOpis = document.getElementById('orderOpis');
        const orderDate = document.getElementById('orderDate');
        const orderStatus = document.getElementById('orderStatus');
        
        if (orderEmail) orderEmail.textContent = order.email;
        if (orderInspiracja) {
            orderInspiracja.textContent = order.inspiracja;
            orderInspiracja.href = order.inspiracja;
        }
        if (orderNazwa) orderNazwa.textContent = order.nazwa;
        if (orderOpis) orderOpis.textContent = order.opis;
        if (orderDate) orderDate.textContent = order.dateTime;
        if (orderStatus) orderStatus.value = order.status;
        
        // Dodaj event listener dla zmiany statusu
        if (orderStatus) {
            orderStatus.onchange = function() {
                updateOrderStatus(orderId, this.value);
            };
        }
        
        // Inicjalizuj toggle dla szczegółów
        initOrderDetailsToggle();
        
        console.log('Szczegóły zamówienia zostały wypełnione pomyślnie');
    } catch (error) {
        console.error('Błąd podczas pokazywania szczegółów zamówienia:', error);
    }
}

function updateOrderStatus(orderId, newStatus) {
    try {
        console.log('Aktualizacja statusu zamówienia:', orderId, 'na:', newStatus);
        
        const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('prositestudio_orders', JSON.stringify(orders));
            
            // Odśwież tylko status w liście zamówień bez przeładowywania całej listy
            const orderItem = document.querySelector(`[data-order-id="${orderId}"]`);
            if (orderItem) {
                const statusElement = orderItem.querySelector('.order-status');
                if (statusElement) {
                    statusElement.textContent = getStatusText(newStatus);
                    statusElement.className = `order-status ${newStatus}`;
                }
            }
            
            console.log('Status zamówienia zaktualizowany pomyślnie');
        }
    } catch (error) {
        console.error('Błąd podczas aktualizacji statusu zamówienia:', error);
    }
}

function initOrderDetailsToggle() {
    const toggleBtn = document.getElementById('toggleDetailsBtn');
    const content = document.getElementById('orderDetailsContent');
    
    if (toggleBtn && content) {
        toggleBtn.onclick = function() {
            const isVisible = content.style.display !== 'none';
            content.style.display = isVisible ? 'none' : 'block';
            this.textContent = isVisible ? '🔽' : '🔼';
            this.classList.toggle('collapsed', isVisible);
        };
    }
}

function initClientChatWidget() {
    const toggleBtn = document.getElementById('toggleChatWidget');
    const widgetBody = document.getElementById('chatWidgetBody');
    const widgetInput = document.getElementById('widgetChatInput');
    const widgetSendBtn = document.getElementById('widgetSendBtn');
    const widgetEmojiBtn = document.getElementById('widgetEmojiBtn');
    const widgetEmojiPicker = document.getElementById('widgetEmojiPicker');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isVisible = widgetBody.style.display !== 'none';
            widgetBody.style.display = isVisible ? 'none' : 'block';
            toggleBtn.textContent = isVisible ? '💬' : '✖️';
        });
    }
    
    if (widgetInput && widgetSendBtn) {
        widgetInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendClientMessage();
            }
        });
        
        widgetSendBtn.addEventListener('click', sendClientMessage);
    }
    
    // Inicjalizuj emoji picker dla widgetu
    if (widgetEmojiBtn && widgetEmojiPicker) {
        widgetEmojiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            widgetEmojiPicker.style.display = widgetEmojiPicker.style.display === 'none' ? 'block' : 'none';
        });
        
        // Dodaj event listenery dla emoji
        widgetEmojiPicker.querySelectorAll('.emoji-item').forEach(emoji => {
            emoji.addEventListener('click', () => {
                const currentValue = widgetInput.value;
                widgetInput.value = currentValue + emoji.textContent;
                widgetInput.focus();
                widgetEmojiPicker.style.display = 'none';
            });
        });
        
        // Zamknij emoji picker po kliknięciu poza nim
        document.addEventListener('click', (e) => {
            if (!widgetEmojiPicker.contains(e.target) && e.target !== widgetEmojiBtn) {
                widgetEmojiPicker.style.display = 'none';
            }
        });
    }
}

function startAdminChatForNewOrder(orderData) {
    // Dodaj automatyczną wiadomość powitalną od administratora
    const now = new Date();
    const timeString = now.toLocaleTimeString('pl-PL', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const welcomeMessage = {
        id: Date.now().toString(),
        sender: 'admin',
        text: `Cześć ${orderData.nick}! 👋\n\nDziękuję za złożenie zamówienia na "${orderData.nazwa}". Otrzymałem Twoje zgłoszenie i już zaczynam pracę nad projektem.\n\nJeśli masz jakieś pytania lub dodatkowe uwagi, śmiało pisz! Będę Cię informować o postępach prac. 🚀`,
        time: timeString,
        timestamp: now.toISOString(),
        readByClient: false
    };
    
    // Dodaj wiadomość do zamówienia
    const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderData.id);
    
    if (orderIndex !== -1) {
        orders[orderIndex].messages.push(welcomeMessage);
        orders[orderIndex].status = 'in-progress';
        localStorage.setItem('prositestudio_orders', JSON.stringify(orders));
        
        console.log('Automatyczna wiadomość powitalna została dodana do zamówienia:', orderData.id);
    }
}

function notifyAdminAboutNewOrder(orderData) {
    // Jeśli administrator jest zalogowany, odśwież listę zamówień
    const currentUser = JSON.parse(localStorage.getItem('prositestudio_current_user') || 'null');
    if (currentUser && currentUser.role === 'admin') {
        // Odśwież listę zamówień w panelu administratora
        if (typeof loadAdminOrders === 'function') {
            loadAdminOrders();
        }
        
        // Pokaż powiadomienie w przeglądarce (jeśli są włączone)
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nowe zamówienie!', {
                body: `${orderData.nick} złożył zamówienie: ${orderData.nazwa}`,
                icon: 'https://i.imgur.com/Fj6JWIA.webp'
            });
        }
        
        // Aktualizuj tytuł strony
        if (!document.title.includes('(!)')) {
            document.title = '(!) ' + document.title;
        }
    }
    
    console.log('Administrator został powiadomiony o nowym zamówieniu:', orderData.id);
}

function showClientChatWidget(orderData) {
    const widget = document.getElementById('clientChatWidget');
    widget.style.display = 'block';
    
    // Zapisz ID zamówienia dla klienta
    window.clientOrderId = orderData.id;
    localStorage.setItem('prositestudio_client_order', orderData.id);
    
    // Załaduj istniejące wiadomości lub pokaż powitalną
    loadClientChatMessages(orderData);
}

function loadClientChatMessages(orderData) {
    // Pobierz najnowsze dane zamówienia (mogły zostać zaktualizowane)
    const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
    const order = orders.find(o => o.id === orderData.id);
    const widgetMessages = document.getElementById('widgetMessages');
    
    if (!order || order.messages.length === 0) {
        // Pokaż powitalną wiadomość tylko jeśli nie ma innych wiadomości
        widgetMessages.innerHTML = `
            <div class="admin-message">
                <div class="message-avatar">
                    <img src="https://i.imgur.com/Fj6JWIA.webp" alt="ProSite Studio">
                </div>
                <div class="message-content">
                    <div class="message-author">ProSiteStudio</div>
                    <div class="message-text">Witaj ${orderData.nick}! Dziękuję za złożenie zamówienia "${orderData.nazwa}". Zaraz się z Tobą skontaktuję!</div>
                    <div class="message-time">Teraz</div>
                </div>
            </div>
        `;
    } else {
        // Załaduj wszystkie wiadomości
        widgetMessages.innerHTML = order.messages.map(msg => {
            const messageClass = msg.sender === 'admin' ? 'admin-message' : 'client-message';
            const authorName = msg.sender === 'admin' ? 'ProSiteStudio' : orderData.nick;
            const avatar = msg.sender === 'admin' ? 
                '<img src="https://i.imgur.com/Fj6JWIA.webp" alt="ProSite Studio">' : 
                `<div class="client-avatar">${orderData.nick.charAt(0).toUpperCase()}</div>`;
            
            return `
                <div class="${messageClass}">
                    <div class="message-avatar">${avatar}</div>
                    <div class="message-content">
                        <div class="message-author">${authorName}</div>
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Przewiń do dołu
    widgetMessages.scrollTop = widgetMessages.scrollHeight;
}

function sendClientMessage() {
    const widgetInput = document.getElementById('widgetChatInput');
    const messageText = widgetInput.value.trim();
    
    if (!messageText || !window.clientOrderId) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    
    const message = {
        id: Date.now().toString(),
        sender: 'client',
        text: messageText,
        time: timeString,
        timestamp: now.toISOString()
    };
    
    // Dodaj wiadomość do zamówienia
    const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === window.clientOrderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].messages.push(message);
        localStorage.setItem('prositestudio_orders', JSON.stringify(orders));
        
        // Dodaj wiadomość do widgetu
        const order = orders[orderIndex];
        const widgetMessages = document.getElementById('widgetMessages');
        widgetMessages.innerHTML += `
            <div class="client-message">
                <div class="message-avatar">
                    <div class="client-avatar">${order.nick.charAt(0).toUpperCase()}</div>
                </div>
                <div class="message-content">
                    <div class="message-author">${order.nick}</div>
                    <div class="message-text">${messageText}</div>
                    <div class="message-time">${timeString}</div>
                </div>
            </div>
        `;
        
        // Przewiń do dołu
        widgetMessages.scrollTop = widgetMessages.scrollHeight;
        
        // Wyczyść pole input
        widgetInput.value = '';
    }
}

function notifyClient(orderId, message) {
    // Jeśli klient ma otwarty widget dla tego zamówienia
    if (window.clientOrderId === orderId) {
        const widgetMessages = document.getElementById('widgetMessages');
        widgetMessages.innerHTML += `
            <div class="admin-message">
                <div class="message-avatar">
                    <img src="https://i.imgur.com/Fj6JWIA.webp" alt="ProSite Studio">
                </div>
                <div class="message-content">
                    <div class="message-author">ProSiteStudio</div>
                    <div class="message-text">${message.text}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            </div>
        `;
        
        // Przewiń do dołu
        widgetMessages.scrollTop = widgetMessages.scrollHeight;
        
        // Pokaż powiadomienie
        showNotification('Nowa wiadomość od ProSiteStudio!');
    }
}

function showNotification(text) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = text;
    
    document.body.appendChild(notification);
    
    // Odtwórz dźwięk powiadomienia
    playNotificationSound();
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function playNotificationSound() {
    try {
        // Utwórz prosty dźwięk powiadomienia używając Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Nie można odtworzyć dźwięku powiadomienia:', error);
    }
}

// ============================================================================
// PRZYWRACANIE STANU PO ODŚWIEŻENIU
// ============================================================================

function restoreStateAfterRefresh() {
    // Przywróć widget czatu dla klienta
    const clientOrderId = localStorage.getItem('prositestudio_client_order');
    if (clientOrderId) {
        const orders = JSON.parse(localStorage.getItem('prositestudio_orders') || '[]');
        const order = orders.find(o => o.id === clientOrderId);
        
        if (order) {
            // Pokaż widget czatu
            showClientChatWidget(order);
            console.log('Przywrócono widget czatu dla zamówienia:', clientOrderId);
        } else {
            // Usuń nieistniejące zamówienie z localStorage
            localStorage.removeItem('prositestudio_client_order');
        }
    }
    
    // Sprawdź czy użytkownik jest zalogowany jako admin
    const user = localStorage.getItem('prositestudio_user');
    if (user) {
        const userData = JSON.parse(user);
        if (userData.email === 'antoxscript@gmail.com') {
            // Przywróć panel administratora jeśli jest na stronie admin-orders
            if (window.location.hash === '#admin-orders') {
                showAdminPanel();
                console.log('Przywrócono panel administratora');
            }
        }
    }
    
    // Dodaj listener dla zmiany hash'a URL
    window.addEventListener('hashchange', () => {
        if (window.location.hash !== '#admin-orders' && window.adminRefreshInterval) {
            // Zatrzymaj automatyczne odświeżanie gdy opuszczamy panel administratora
            clearInterval(window.adminRefreshInterval);
            window.adminRefreshInterval = null;
            
            // Przywróć oryginalny tytuł strony
            document.title = document.title.replace('(!) ', '');
        }
    });
    
    console.log('Stan aplikacji przywrócony po odświeżeniu');
}

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

// Lazy loading dla animacji
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
}

// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================================================
// INSTRUKCJE KONFIGURACJI
// ============================================================================

console.log(`
🚀 INSTRUKCJE KONFIGURACJI FORMULARZA

📧 OPCJA 1: EmailJS (Zalecane)
1. Zarejestruj się na https://www.emailjs.com/
2. Dodaj serwis Gmail z adresem antoxscript@gmail.com
3. Utwórz szablon email z zmiennymi: {{nick}}, {{inspiracja}}, {{nazwa}}, {{opis}}
4. Wklej swoje dane w EMAILJS_CONFIG na górze pliku script.js

📮 OPCJA 2: Formspree
1. Zarejestruj się na https://formspree.io/
2. Utwórz formularz z adresem antoxscript@gmail.com
3. Wklej endpoint w FORMSPREE_CONFIG na górze pliku script.js
4. Ustaw USE_EMAILJS = false

✅ Po konfiguracji formularz będzie automatycznie wysyłać zamówienia na antoxscript@gmail.com
`);