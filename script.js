// Landing Page NatyFLORA - JavaScript Interativo
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos DOM
    const ctaButtons = document.querySelectorAll('#cta-primary, #cta-secondary, #cta-final');
    const faqItems = document.querySelectorAll('.faq-item');
    const countdownElements = {
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    // Configurações
    const CONFIG = {
        countdownEndTime: new Date().getTime() + (10 * 60 * 1000), // 10 minutos
        whatsappNumber: '5517981103203',
        whatsappMessage: 'Olá! Gostaria de comprar o Kit Tira Manchas NatyFLORA por R$ 99,90 (50% de desconto)!',
        trackingEvents: {
            ctaClick: 'cta_click',
            faqOpen: 'faq_open',
            whatsappClick: 'whatsapp_click',
            pageView: 'page_view'
        }
    };
    
    // Inicialização
    init();
    

    // Floating Buy Button
    function setupFloatingBuyButton() {
        const floatingBtn = document.getElementById('floating-buy-btn');
        
        if (floatingBtn) {
            // Click handler
            floatingBtn.addEventListener('click', function() {
                // Abrir modal de checkout
                showModal('checkout');
                
                // Efeito visual no clique
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
            
            // Botão sempre visível
            floatingBtn.style.display = 'flex';
                        floatingBtn.style.opacity = '1';
            floatingBtn.style.visibility = 'visible';
        }
    }

    // Buying Notifications System - REMOVIDO

    function init() {
        setupCountdown();
        setupFAQ();
        setupCTAs();
        setupWhatsApp();
        setupScrollAnimations();
        setupParallax();
        setupCardHoverEffects();
        setupTypingEffect();
        setupAnimatedCounters();
        setupHeaderScroll();
        // setupBuyingNotifications(); // REMOVIDO
        setupFloatingBuyButton();
        trackPageView();
    }
    
    
    // Countdown Timer
    function setupCountdown() {
        if (!countdownElements.minutes) return;
        
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = CONFIG.countdownEndTime - now;
            
            if (timeLeft > 0) {
                const minutes = Math.floor(timeLeft / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
                countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
            } else {
                // Tempo esgotado
                countdownElements.minutes.textContent = '00';
                countdownElements.seconds.textContent = '00';
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // FAQ Accordion
    function setupFAQ() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fechar todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle do item atual
                item.classList.toggle('active', !isActive);
                
                // Tracking
                if (!isActive) {
                    trackEvent(CONFIG.trackingEvents.faqOpen, {
                        question: question.textContent.trim()
                    });
                }
            });
        });
    }
    
    // CTAs (Call-to-Actions)
    function setupCTAs() {
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const buttonText = button.textContent.trim();
                const buttonId = button.id;
                
                // Tracking
                trackEvent(CONFIG.trackingEvents.ctaClick, {
                    button_text: buttonText,
                    button_id: buttonId,
                    position: getButtonPosition(button)
                });
                
                // Ações baseadas no botão
                if (buttonId === 'cta-primary' || buttonId === 'cta-final') {
                    handlePrimaryCTA();
                } else if (buttonId === 'cta-secondary') {
                    handleSecondaryCTA();
                }
            });
        });
    }
    
    function handlePrimaryCTA() {
        // Simular redirecionamento para checkout
        showModal('checkout');
    }
    
    function handleSecondaryCTA() {
        // Abrir WhatsApp
        openWhatsApp();
    }
    
    function getButtonPosition(button) {
        const rect = button.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top < viewportHeight * 0.3) return 'above_fold';
        if (rect.top < viewportHeight * 0.7) return 'middle';
        return 'below_fold';
    }
    
    // WhatsApp Integration
    function setupWhatsApp() {
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                trackEvent(CONFIG.trackingEvents.whatsappClick);
                openWhatsApp();
            });
        }
    }
    
    function openWhatsApp() {
        const message = encodeURIComponent(CONFIG.whatsappMessage);
        const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
        window.open(url, '_blank');
    }
    
    // Modal System
    function showModal(type) {
        const modal = createModal(type);
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Fechar modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                closeModal(modal);
            }
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal(modal);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    function createModal(type) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        let content = '';
        
        if (type === 'checkout') {
            content = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Finalizar Compra</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="product-summary">
                            <h4>Kit Tira Manchas NatyFLORA</h4>
                            <div class="price-breakdown">
                                <div class="price-line">
                                    <span>Valor original:</span>
                                    <span class="old-price">R$ 199,90</span>
                                </div>
                                <div class="price-line">
                                    <span>Desconto (50%):</span>
                                    <span class="discount">-R$ 100,00</span>
                                </div>
                                <div class="price-line total">
                                    <span>Total:</span>
                                    <span class="final-price">R$ 99,90</span>
                                </div>
                            </div>
                        </div>
                        <div class="checkout-options">
                            <button class="btn-primary" onclick="proceedToCheckout()">
                                🛒 Ir para o Pagamento
                            </button>
                            <button class="btn-secondary" onclick="openWhatsApp()">
                                📞 Falar com Especialista
                            </button>
                        </div>
                        <div class="trust-badges">
                            <div class="trust-badge">🔒 Compra 100% Segura</div>
                            <div class="trust-badge">🚚 Frete Grátis</div>
                            <div class="trust-badge">🛡️ Garantia 30 dias</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        modal.innerHTML = content;
        return modal;
    }
    
    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // Scroll Animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Adicionar delay escalonado para elementos em sequência
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        const animatedElements = document.querySelectorAll(
            '.problem-item, .benefit-card, .testimonial-card, .feature-item, .before-after-card'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Efeito de parallax suave - DESABILITADO para melhor performance
    function setupParallax() {
        // Parallax desabilitado para melhor performance
    }
    
    // Efeito de hover nos cards
    function setupCardHoverEffects() {
        const cards = document.querySelectorAll('.benefit-card, .problem-item, .before-after-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Efeito de digitação no título
    function setupTypingEffect() {
        const title = document.querySelector('.hero-title');
        if (!title) return;
        
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80); // Mais rápido
            }
        };
        
        // Iniciar efeito após 500ms
        setTimeout(typeWriter, 500);
    }
    
    // Contador animado para estatísticas
    function setupAnimatedCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const duration = 1500; // Mais rápido
            const step = target / (duration / 20); // Menos frames
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.floor(current) + '%';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (counter.textContent.includes('/')) {
                    counter.textContent = Math.floor(current) + '/5';
                }
            }, 20); // Menos frequente
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Header Scroll Effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Tracking/Analytics
    function trackEvent(eventName, properties = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, properties);
        }
        
        // Console log para debug
        console.log('Event tracked:', eventName, properties);
    }
    
    function trackPageView() {
        trackEvent(CONFIG.trackingEvents.pageView, {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Utility Functions
    function proceedToCheckout() {
        // Rastrear evento de início do checkout
        trackEvent('checkout_started');
        
        // Redirecionar para página de checkout
        // Substitua pela URL real do seu sistema de checkout
        window.location.href = 'https://checkout.natyflora.com.br/kit-tira-manchas';
    }
    
    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy Loading para imagens
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Performance: Debounce para eventos de scroll
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
    
    // Otimização: Throttle para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Inicializar lazy loading
    setupLazyLoading();
    
    // Expor funções globais para uso em HTML
    window.openWhatsApp = openWhatsApp;
    window.proceedToCheckout = proceedToCheckout;
    
    console.log('🚀 Landing Page NatyFLORA carregada com sucesso!');
});

// CSS adicional para modais (adicionado via JavaScript para não poluir o CSS principal)
const modalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-overlay.show {
    opacity: 1;
}

.modal-content {
    background: white;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.modal-overlay.show .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.close-modal {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0.5rem;
    line-height: 1;
}

.close-modal:hover {
    color: #374151;
}

.modal-body {
    padding: 1.5rem;
}

.product-summary h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1f2937;
}

.price-breakdown {
    margin-bottom: 1.5rem;
}

.price-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
}

.price-line.total {
    border-top: 2px solid #e5e7eb;
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 0.5rem;
}

.old-price {
    text-decoration: line-through;
    color: #6b7280;
}

.discount {
    color: #dc2626;
    font-weight: 600;
}

.final-price {
    color: #1e40af;
    font-size: 1.2rem;
}

.checkout-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.trust-badges {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.trust-badge {
    font-size: 0.9rem;
    color: #6b7280;
    text-align: center;
}

.header.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .checkout-options {
        flex-direction: column;
    }
    
    .trust-badges {
        flex-direction: column;
        align-items: center;
    }
}
</style>
`;

// Adicionar estilos do modal ao head
document.head.insertAdjacentHTML('beforeend', modalStyles);
