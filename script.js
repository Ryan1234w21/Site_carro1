// Dados dos carros
const carsData = [
    {
        id: 1,
        name: "Ferrari F8 Tributo",
        price: 2500000,
        priceFormatted: "R$ 2.500.000",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "esportivo",
        year: 2024,
        engine: "3.9L V8",
        power: "720 cv"
    },
    {
        id: 2,
        name: "Porsche 911 Turbo S",
        price: 1800000,
        priceFormatted: "R$ 1.800.000",
        image: "https://images.unsplash.com/photo-1503376780359-7e7b3f0a3b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "esportivo",
        year: 2024,
        engine: "3.8L Boxer",
        power: "650 cv"
    },
    {
        id: 3,
        name: "Mercedes-Benz S63",
        price: 1200000,
        priceFormatted: "R$ 1.200.000",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "sedan",
        year: 2024,
        engine: "4.0L V8",
        power: "612 cv"
    },
    {
        id: 4,
        name: "Lamborghini Urus",
        price: 3200000,
        priceFormatted: "R$ 3.200.000",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "suv",
        year: 2024,
        engine: "4.0L V8",
        power: "650 cv"
    },
    {
        id: 5,
        name: "BMW M8 Competition",
        price: 1500000,
        priceFormatted: "R$ 1.500.000",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "esportivo",
        year: 2024,
        engine: "4.4L V8",
        power: "625 cv"
    },
    {
        id: 6,
        name: "Range Rover Sport",
        price: 950000,
        priceFormatted: "R$ 950.000",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "suv",
        year: 2024,
        engine: "3.0L V6",
        power: "400 cv"
    },
    {
        id: 7,
        name: "Audi RS7",
        price: 1100000,
        priceFormatted: "R$ 1.100.000",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "sedan",
        year: 2024,
        engine: "4.0L V8",
        power: "600 cv"
    },
    {
        id: 8,
        name: "Porsche Cayenne Turbo",
        price: 1400000,
        priceFormatted: "R$ 1.400.000",
        image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "suv",
        year: 2024,
        engine: "4.0L V8",
        power: "550 cv"
    }
];

// Sistema de usuários
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let chatMessages = [];
let currentProposalCar = null;
let currentTestDriveCar = null;
let currentNegotiationCar = null;
let negotiationStep = 1;

// Adicionar estilo de animação float
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyle);

// ==================== SISTEMA DE PARTÍCULAS ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(155, 89, 182, ${Math.random() * 0.5})`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        particle.style.opacity = Math.random();
        particlesContainer.appendChild(particle);
    }
}

// ==================== ANIMAÇÃO DE NÚMEROS ====================
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                num.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                num.textContent = target + (target === 98 ? '%' : '+');
            }
        };
        updateNumber();
    });
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;
    
    const hoverElements = document.querySelectorAll('button, a, .car-card, .filter-btn, .user-menu, .info-card, .feature');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ==================== SISTEMA DE CHAT ====================
function initChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessagesDiv = document.getElementById('chatMessages');
    
    if (!chatToggle || !chatContainer) return;
    
    let isOpen = false;
    
    chatToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            chatContainer.classList.add('open');
        } else {
            chatContainer.classList.remove('open');
        }
    });
    
    chatClose.addEventListener('click', () => {
        isOpen = false;
        chatContainer.classList.remove('open');
    });
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessagesDiv.appendChild(messageDiv);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        chatMessages.push({ text, isUser, time });
    }
    
    function getBotResponse(message) {
        const msg = message.toLowerCase();
        if (msg.includes('olá') || msg.includes('oi') || msg.includes('ola')) {
            return "Olá! 😊 Como posso ajudá-lo hoje? Tem interesse em algum veículo específico?";
        } else if (msg.includes('test drive') || msg.includes('testdrive')) {
            return "Que ótimo! Para agendar um test drive, basta clicar no botão 'Test Drive' no card do veículo que você tem interesse. É rápido e fácil! 🚗";
        } else if (msg.includes('negociar') || msg.includes('negociação') || msg.includes('proposta')) {
            return "Para negociar um veículo, clique no botão 'Negociar' no card do carro. Você poderá fazer uma oferta personalizada e definir as condições de pagamento! 💰";
        } else if (msg.includes('preço') || msg.includes('valor')) {
            return "Nossos veículos variam de R$ 950.000 a R$ 3.200.000. Posso te ajudar com algum modelo específico?";
        } else if (msg.includes('ferrari')) {
            return "A Ferrari F8 Tributo está disponível por R$ 2.500.000. É um dos nossos veículos mais procurados! Quer fazer uma proposta ou agendar um test drive?";
        } else if (msg.includes('porsche')) {
            return "Temos o Porsche 911 Turbo S por R$ 1.800.000 e o Cayenne Turbo por R$ 1.400.000. Qual te interessa?";
        } else if (msg.includes('financiamento')) {
            return "Trabalhamos com financiamento em até 36x com as melhores taxas do mercado. Nossos consultores podem te ajudar com as melhores condições!";
        } else if (msg.includes('garantia')) {
            return "Todos os nossos veículos possuem garantia estendida de 3 anos e revisões gratuitas nos primeiros 12 meses!";
        } else if (msg.includes('localização') || msg.includes('endereço')) {
            return "Estamos localizados na Avenida Paulista, 1000 - São Paulo, SP. Funcionamos de segunda a sexta, das 9h às 19h, e aos sábados das 9h às 14h.";
        } else {
            return "Obrigado pela mensagem! 🚗 Nossa equipe entrará em contato em breve para te ajudar com sua solicitação. Enquanto isso, você pode explorar nossos veículos no site!";
        }
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, false);
            }, 500);
        }
    }
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Função global para abrir chat
window.openChat = () => {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        chatContainer.classList.add('open');
    }
};

// ==================== SISTEMA DE LOGIN/REGISTRO ====================
function initAuth() {
    const userMenu = document.getElementById('userMenu');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (!userMenu || !userNameDisplay) return;
    
    if (currentUser) {
        userNameDisplay.textContent = currentUser.name.split(' ')[0];
    } else {
        userNameDisplay.textContent = 'Entrar';
    }
    
    userMenu.onclick = () => {
        if (currentUser) {
            if (confirm('Deseja sair da sua conta?')) {
                logout();
            }
        } else {
            loginModal.style.display = 'block';
        }
    };
    
    // Fechar modais
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.onclick = () => {
            if (loginModal) loginModal.style.display = 'none';
            if (registerModal) registerModal.style.display = 'none';
            const proposalModal = document.getElementById('proposalModal');
            const testDriveModal = document.getElementById('testDriveModal');
            const negotiationModal = document.getElementById('negotiationModal');
            if (proposalModal) proposalModal.style.display = 'none';
            if (testDriveModal) testDriveModal.style.display = 'none';
            if (negotiationModal) negotiationModal.style.display = 'none';
        };
    });
    
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                userNameDisplay.textContent = user.name.split(' ')[0];
                loginModal.style.display = 'none';
                showNotification(`Bem-vindo de volta, ${user.name}!`, 'success');
                document.getElementById('loginForm').reset();
            } else {
                showNotification('E-mail ou senha incorretos!', 'error');
            }
        };
    }
    
    // Registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('As senhas não coincidem!', 'error');
                return;
            }
            
            if (users.find(u => u.email === email)) {
                showNotification('E-mail já cadastrado!', 'error');
                return;
            }
            
            const newUser = { name, email, phone, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            showNotification('Cadastro realizado com sucesso! Faça login.', 'success');
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
            document.getElementById('registerForm').reset();
        };
    }
    
    // Trocar entre modais
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    if (showRegister) {
        showRegister.onclick = (e) => {
            e.preventDefault();
            if (loginModal) loginModal.style.display = 'none';
            if (registerModal) registerModal.style.display = 'block';
        };
    }
    
    if (showLogin) {
        showLogin.onclick = (e) => {
            e.preventDefault();
            if (registerModal) registerModal.style.display = 'none';
            if (loginModal) loginModal.style.display = 'block';
        };
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) userNameDisplay.textContent = 'Entrar';
    showNotification('Você saiu da sua conta!', 'warning');
}

// ==================== FUNÇÕES DE PROPOSTA ====================
window.showProposalModal = function(carId) {
    if (!currentUser) {
        showNotification('Você precisa estar logado para fazer uma proposta!', 'warning');
        document.getElementById('loginModal').style.display = 'block';
        return;
    }
    
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    currentProposalCar = car;
    const carSummary = document.getElementById('carSummary');
    if (carSummary) {
        carSummary.innerHTML = `
            <h3 style="margin-bottom: 0.5rem;">${car.name}</h3>
            <p style="color: var(--primary); font-weight: bold; margin-bottom: 0.5rem;">${car.priceFormatted}</p>
            <p style="font-size: 0.9rem; color: var(--gray);">${car.year} | ${car.engine} | ${car.power}</p>
        `;
    }
    
    const proposalName = document.getElementById('proposalName');
    const proposalEmail = document.getElementById('proposalEmail');
    if (proposalName) proposalName.value = currentUser.name;
    if (proposalEmail) proposalEmail.value = currentUser.email;
    
    const proposalValue = document.getElementById('proposalValue');
    const paymentTerms = document.getElementById('paymentTerms');
    const proposalMessage = document.getElementById('proposalMessage');
    if (proposalValue) proposalValue.value = '';
    if (paymentTerms) paymentTerms.value = '';
    if (proposalMessage) proposalMessage.value = '';
    
    document.getElementById('proposalModal').style.display = 'block';
};

function saveProposal(proposalData) {
    const proposals = JSON.parse(localStorage.getItem('proposals')) || [];
    proposals.push({
        ...proposalData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('proposals', JSON.stringify(proposals));
}

// ==================== FUNÇÕES DE TEST DRIVE ====================
window.showTestDriveModal = function(carId) {
    if (!currentUser) {
        showNotification('Você precisa estar logado para agendar um test drive!', 'warning');
        document.getElementById('loginModal').style.display = 'block';
        return;
    }
    
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    currentTestDriveCar = car;
    const testDriveCarSummary = document.getElementById('testDriveCarSummary');
    if (testDriveCarSummary) {
        testDriveCarSummary.innerHTML = `
            <h3 style="margin-bottom: 0.5rem;">${car.name}</h3>
            <p style="color: var(--primary); font-weight: bold; margin-bottom: 0.5rem;">${car.priceFormatted}</p>
            <p style="font-size: 0.9rem; color: var(--gray);">${car.year} | ${car.engine} | ${car.power}</p>
        `;
    }
    
    const tdName = document.getElementById('tdName');
    const tdEmail = document.getElementById('tdEmail');
    const tdPhone = document.getElementById('tdPhone');
    if (tdName) tdName.value = currentUser.name;
    if (tdEmail) tdEmail.value = currentUser.email;
    if (tdPhone) tdPhone.value = currentUser.phone || '';
    
    const tdCpf = document.getElementById('tdCpf');
    const tdDate = document.getElementById('tdDate');
    const tdTime = document.getElementById('tdTime');
    const tdAddress = document.getElementById('tdAddress');
    const tdLicenseType = document.getElementById('tdLicenseType');
    const tdTerms = document.getElementById('tdTerms');
    
    if (tdCpf) tdCpf.value = '';
    if (tdDate) tdDate.value = '';
    if (tdTime) tdTime.value = '';
    if (tdAddress) tdAddress.value = '';
    if (tdLicenseType) tdLicenseType.value = '';
    if (tdTerms) tdTerms.checked = false;
    
    if (tdDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tdDate.min = tomorrow.toISOString().split('T')[0];
    }
    
    document.getElementById('testDriveModal').style.display = 'block';
};

function saveTestDrive(testDriveData) {
    const testDrives = JSON.parse(localStorage.getItem('testDrives')) || [];
    testDrives.push({
        ...testDriveData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'scheduled'
    });
    localStorage.setItem('testDrives', JSON.stringify(testDrives));
}

// ==================== FUNÇÕES DE NEGOCIAÇÃO ====================
window.showNegotiationModal = function(carId) {
    if (!currentUser) {
        showNotification('Você precisa estar logado para negociar!', 'warning');
        document.getElementById('loginModal').style.display = 'block';
        return;
    }
    
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    currentNegotiationCar = car;
    const negotiationCarSummary = document.getElementById('negotiationCarSummary');
    if (negotiationCarSummary) {
        negotiationCarSummary.innerHTML = `
            <h3 style="margin-bottom: 0.5rem;">${car.name}</h3>
            <p style="color: var(--primary); font-weight: bold; margin-bottom: 0.5rem;">${car.priceFormatted}</p>
            <p style="font-size: 0.9rem; color: var(--gray);">${car.year} | ${car.engine} | ${car.power}</p>
        `;
    }
    
    const announcedPrice = document.getElementById('announcedPrice');
    if (announcedPrice) {
        announcedPrice.textContent = car.priceFormatted;
    }
    
    const negValue = document.getElementById('negValue');
    const negVehicleCondition = document.getElementById('negVehicleCondition');
    const negEntry = document.getElementById('negEntry');
    const negInstallments = document.getElementById('negInstallments');
    const negTradeIn = document.getElementById('negTradeIn');
    const negMessage = document.getElementById('negMessage');
    
    if (negValue) negValue.value = '';
    if (negVehicleCondition) negVehicleCondition.value = '';
    if (negEntry) negEntry.value = '';
    if (negInstallments) negInstallments.value = '';
    if (negTradeIn) negTradeIn.value = '';
    if (negMessage) negMessage.value = '';
    
    const offerPrice = document.getElementById('offerPrice');
    if (offerPrice) offerPrice.textContent = 'R$ 0';
    
    const priceDifference = document.getElementById('priceDifference');
    if (priceDifference) priceDifference.innerHTML = '';
    
    negotiationStep = 1;
    updateNegotiationSteps();
    
    document.getElementById('negotiationModal').style.display = 'block';
};

function updateNegotiationSteps() {
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.negotiation-step');
    const prevBtn = document.querySelector('.prev-step');
    const nextBtn = document.querySelector('.next-step');
    const submitBtn = document.querySelector('.submit-negotiation');
    
    steps.forEach((step, index) => {
        if (index + 1 === negotiationStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    stepContents.forEach((content, index) => {
        if (index + 1 === negotiationStep) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    if (prevBtn) {
        prevBtn.style.display = negotiationStep === 1 ? 'none' : 'block';
    }
    
    if (nextBtn) {
        nextBtn.style.display = negotiationStep === 3 ? 'none' : 'block';
    }
    
    if (submitBtn) {
        submitBtn.style.display = negotiationStep === 3 ? 'block' : 'none';
    }
    
    if (negotiationStep === 3) {
        updateNegotiationSummary();
    }
}

function updateNegotiationSummary() {
    const offerValue = parseFloat(document.getElementById('negValue')?.value) || 0;
    const vehicleCondition = document.getElementById('negVehicleCondition')?.value || '';
    const entryPercent = document.getElementById('negEntry')?.value || '';
    const installments = document.getElementById('negInstallments')?.value || '';
    const tradeIn = document.getElementById('negTradeIn')?.value || '';
    
    const discount = currentNegotiationCar.price - offerValue;
    const discountPercent = ((discount / currentNegotiationCar.price) * 100).toFixed(1);
    
    const summaryCar = document.getElementById('summaryCar');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryOffer = document.getElementById('summaryOffer');
    const summaryDiscount = document.getElementById('summaryDiscount');
    const summaryTerms = document.getElementById('summaryTerms');
    
    if (summaryCar) summaryCar.textContent = currentNegotiationCar.name;
    if (summaryPrice) summaryPrice.textContent = currentNegotiationCar.priceFormatted;
    if (summaryOffer) summaryOffer.textContent = `R$ ${offerValue.toLocaleString()}`;
    if (summaryDiscount) {
        summaryDiscount.textContent = discount > 0 
            ? `R$ ${discount.toLocaleString()} (${discountPercent}% de desconto)`
            : discount < 0 
                ? `R$ ${Math.abs(discount).toLocaleString()} acima do valor`
                : 'Valor exato do anúncio';
    }
    
    let termsText = `${vehicleCondition || 'Não especificado'}`;
    if (entryPercent) termsText += `, Entrada: ${entryPercent}%`;
    if (installments) termsText += `, ${installments}x`;
    if (tradeIn === 'Sim') termsText += `, Com troca de veículo`;
    
    if (summaryTerms) summaryTerms.textContent = termsText;
}

function saveNegotiation(negotiationData) {
    const negotiations = JSON.parse(localStorage.getItem('negotiations')) || [];
    negotiations.push({
        ...negotiationData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('negotiations', JSON.stringify(negotiations));
}

// ==================== CARREGAR CARROS ====================
function loadCars(category = 'all') {
    const carsGrid = document.getElementById('carsGrid');
    if (!carsGrid) return;
    
    const filteredCars = category === 'all' 
        ? carsData 
        : carsData.filter(car => car.category === category);
    
    carsGrid.innerHTML = filteredCars.map(car => `
        <div class="car-card" data-category="${car.category}">
            <div class="car-image-container">
                <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
            </div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-price">${car.priceFormatted}</div>
                <div class="car-specs">
                    <span><i class="fas fa-calendar"></i> ${car.year}</span>
                    <span><i class="fas fa-engine"></i> ${car.engine}</span>
                    <span><i class="fas fa-gauge-high"></i> ${car.power}</span>
                </div>
                <div class="car-buttons">
                    <button class="car-btn" onclick="showProposalModal(${car.id})">
                        <i class="fas fa-gavel"></i> Proposta
                    </button>
                    <button class="car-btn car-btn-secondary" onclick="showTestDriveModal(${car.id})">
                        <i class="fas fa-key"></i> Test Drive
                    </button>
                    <button class="car-btn car-btn-secondary" onclick="showNegotiationModal(${car.id})">
                        <i class="fas fa-handshake"></i> Negociar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== FILTROS ====================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            loadCars(category);
        });
    });
}

// ==================== MENU MOBILE ====================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ==================== FORMULÁRIO DE CONTATO ====================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;
        
        if (name && email && message) {
            const contactData = {
                name,
                email,
                phone: document.getElementById('phone')?.value || '',
                message,
                date: new Date().toISOString()
            };
            
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push(contactData);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            
            showNotification(`Obrigado ${name}! Sua mensagem foi enviada com sucesso.`, 'success');
            form.reset();
        }
    });
}

// ==================== FORMULÁRIO DE PROPOSTA ====================
function initProposalForm() {
    const form = document.getElementById('proposalForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const proposalValue = parseFloat(document.getElementById('proposalValue')?.value);
        const paymentTerms = document.getElementById('paymentTerms')?.value;
        const message = document.getElementById('proposalMessage')?.value;
        
        if (!proposalValue || proposalValue <= 0) {
            showNotification('Por favor, insira um valor válido para a proposta!', 'error');
            return;
        }
        
        if (!paymentTerms) {
            showNotification('Por favor, selecione as condições de pagamento!', 'error');
            return;
        }
        
        const proposal = {
            carId: currentProposalCar.id,
            carName: currentProposalCar.name,
            carPrice: currentProposalCar.price,
            proposedValue: proposalValue,
            paymentTerms: paymentTerms,
            message: message,
            user: {
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone
            }
        };
        
        saveProposal(proposal);
        
        const difference = currentProposalCar.price - proposalValue;
        let messageText = `Proposta enviada com sucesso! Aguarde nosso contato.`;
        
        if (difference > 0) {
            const discountPercent = ((difference / currentProposalCar.price) * 100).toFixed(1);
            messageText = `Proposta enviada! Você ofereceu ${discountPercent}% abaixo do valor. Nossa equipe analisará e entrará em contato em até 24h.`;
        } else if (difference < 0) {
            messageText = `Proposta enviada! Você ofereceu um valor acima do anunciado. Nossa equipe entrará em contato para finalizar a negociação.`;
        }
        
        showNotification(messageText, 'success');
        document.getElementById('proposalModal').style.display = 'none';
        form.reset();
    });
}

// ==================== FORMULÁRIO DE TEST DRIVE ====================
function initTestDriveForm() {
    const form = document.getElementById('testDriveForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('tdName')?.value;
        const email = document.getElementById('tdEmail')?.value;
        const phone = document.getElementById('tdPhone')?.value;
        const cpf = document.getElementById('tdCpf')?.value;
        const date = document.getElementById('tdDate')?.value;
        const time = document.getElementById('tdTime')?.value;
        const address = document.getElementById('tdAddress')?.value;
        const licenseType = document.getElementById('tdLicenseType')?.value;
        const terms = document.getElementById('tdTerms')?.checked;
        
        if (!name || !email || !phone || !cpf || !date || !time || !address || !licenseType) {
            showNotification('Por favor, preencha todos os campos!', 'error');
            return;
        }
        
        if (!terms) {
            showNotification('Você precisa concordar com os termos e condições!', 'error');
            return;
        }
        
        const testDriveData = {
            carId: currentTestDriveCar.id,
            carName: currentTestDriveCar.name,
            carPrice: currentTestDriveCar.price,
            user: { name, email, phone, cpf, address },
            date,
            time,
            licenseType,
            scheduledAt: new Date().toISOString()
        };
        
        saveTestDrive(testDriveData);
        
        const formattedDate = new Date(date).toLocaleDateString('pt-BR');
        showNotification(`Test drive agendado para ${formattedDate} às ${time}! Aguarde confirmação por e-mail.`, 'success');
        document.getElementById('testDriveModal').style.display = 'none';
        form.reset();
    });
}

// ==================== FORMULÁRIO DE NEGOCIAÇÃO ====================
function initNegotiationForm() {
    const prevBtn = document.querySelector('.prev-step');
    const nextBtn = document.querySelector('.next-step');
    const submitBtn = document.querySelector('.submit-negotiation');
    const negValue = document.getElementById('negValue');
    
    if (negValue) {
        negValue.addEventListener('input', () => {
            const offerPrice = document.getElementById('offerPrice');
            const priceDifference = document.getElementById('priceDifference');
            const value = parseFloat(negValue.value) || 0;
            
            if (offerPrice) {
                offerPrice.textContent = `R$ ${value.toLocaleString()}`;
            }
            
            if (priceDifference && currentNegotiationCar) {
                const diff = currentNegotiationCar.price - value;
                if (diff > 0) {
                    priceDifference.innerHTML = `<span style="color: #4CAF50;">💰 Economia de R$ ${diff.toLocaleString()}</span>`;
                } else if (diff < 0) {
                    priceDifference.innerHTML = `<span style="color: #FF9800;">⚠️ R$ ${Math.abs(diff).toLocaleString()} acima do valor</span>`;
                } else {
                    priceDifference.innerHTML = `<span style="color: var(--primary);">✓ Valor exato do anúncio</span>`;
                }
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (negotiationStep > 1) {
                negotiationStep--;
                updateNegotiationSteps();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (negotiationStep === 1) {
                const value = document.getElementById('negValue')?.value;
                const condition = document.getElementById('negVehicleCondition')?.value;
                
                if (!value || parseFloat(value) <= 0) {
                    showNotification('Por favor, insira um valor válido para sua oferta!', 'error');
                    return;
                }
                if (!condition) {
                    showNotification('Por favor, selecione a condição do veículo!', 'error');
                    return;
                }
            }
            
            if (negotiationStep === 2) {
                const entry = document.getElementById('negEntry')?.value;
                const installments = document.getElementById('negInstallments')?.value;
                const tradeIn = document.getElementById('negTradeIn')?.value;
                
                if (!entry || !installments || !tradeIn) {
                    showNotification('Por favor, preencha todas as condições de pagamento!', 'error');
                    return;
                }
            }
            
            if (negotiationStep < 3) {
                negotiationStep++;
                updateNegotiationSteps();
            }
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const value = parseFloat(document.getElementById('negValue')?.value);
            const condition = document.getElementById('negVehicleCondition')?.value;
            const entry = document.getElementById('negEntry')?.value;
            const installments = document.getElementById('negInstallments')?.value;
            const tradeIn = document.getElementById('negTradeIn')?.value;
            const message = document.getElementById('negMessage')?.value;
            
            if (!value || !condition || !entry || !installments || !tradeIn) {
                showNotification('Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            const negotiationData = {
                carId: currentNegotiationCar.id,
                carName: currentNegotiationCar.name,
                carPrice: currentNegotiationCar.price,
                offeredValue: value,
                vehicleCondition: condition,
                entryPercent: entry,
                installments: installments,
                hasTradeIn: tradeIn === 'Sim',
                message: message,
                user: {
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone
                }
            };
            
            saveNegotiation(negotiationData);
            
            const discount = currentNegotiationCar.price - value;
            const discountPercent = ((discount / currentNegotiationCar.price) * 100).toFixed(1);
            
            let messageText = `Proposta de negociação enviada com sucesso!`;
            if (discount > 0) {
                messageText = `Proposta de negociação enviada! Você ofereceu ${discountPercent}% abaixo do valor. Nossa equipe analisará e retornará em breve.`;
            }
            
            showNotification(messageText, 'success');
            document.getElementById('negotiationModal').style.display = 'none';
            negotiationStep = 1;
            updateNegotiationSteps();
        });
    }
}

// ==================== SCROLL SMOOTH ====================
function initSmoothScroll() {
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
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== ANIMAÇÃO AO SCROLL ====================
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// ==================== NOTIFICAÇÃO ====================
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ==================== FUNÇÃO GLOBAL SCROLL ====================
window.scrollToCars = () => {
    document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' });
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadCars();
    initAuth();
    initFilters();
    initMobileMenu();
    initContactForm();
    initProposalForm();
    initTestDriveForm();
    initNegotiationForm();
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimation();
    initChat();
    initCustomCursor();
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
    
    window.onclick = (event) => {
        const modals = ['loginModal', 'registerModal', 'proposalModal', 'testDriveModal', 'negotiationModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
});