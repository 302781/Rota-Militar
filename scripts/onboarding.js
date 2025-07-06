// onboarding.ts
// Importe AppManager se você estiver usando módulos.
// Para este exemplo simples, assumimos que 'window.app' já está disponível.
class OnboardingManager {
    constructor() {
        this.currentOnboardingStep = 0;
        this.totalOnboardingSteps = 3; // Perfil, Nível Físico, Objetivos
        this.onboardingData = {};
        // Renderiza a primeira tela de onboarding ao carregar o app (ou quando a tela é mostrada)
        window.addEventListener('screenShown:profile-setup', () => this.renderProfileSetupScreen());
        window.addEventListener('screenShown:fitness-level', () => this.renderFitnessLevelScreen());
        window.addEventListener('screenShown:objectives-screen', () => this.renderObjectivesScreen());
    }
    // --- Renderização das Telas de Onboarding ---
    renderProfileSetupScreen() {
        const screenHtml = `
            <div class="screen-header">
                <img src="assets/icons/rank.svg" alt="Patente" class="header-icon">
                <h1>Qual a sua Patente no Campo da Vida?</h1>
            </div>
            <div class="screen-content">
                <p>Para quem você está construindo essa rotina?</p>
                <div class="option-card-container">
                    <div class="option-card" data-value="militar" onclick="window.onboarding.selectProfile('militar', this)">
                        <h3>Militar da Ativa / Reserva</h3>
                        <p>Selecione se você já serve ou serviu.</p>
                    </div>
                    <div class="option-card" data-value="candidato" onclick="window.onboarding.selectProfile('candidato', this)">
                        <h3>Candidato a Carreira Militar</h3>
                        <p>Para quem está se preparando para entrar.</p>
                    </div>
                    <div class="option-card" data-value="civil" onclick="window.onboarding.selectProfile('civil', this)">
                        <h3>Civil em Busca de Disciplina</h3>
                        <p>Para quem quer a rotina militar para a vida pessoal.</p>
                    </div>
                </div>
            </div>
            <div class="screen-footer">
                <button class="btn btn-primary" id="profile-next-btn" disabled onclick="window.onboarding.nextStep()">Próximo</button>
            </div>
        `;
        window.app.getScreenElement('profile-setup').innerHTML = screenHtml;
        this.updateOnboardingProgress(0);
    }
    renderFitnessLevelScreen() {
        const screenHtml = `
            <div class="screen-header">
                <img src="assets/icons/fitness.svg" alt="Fitness Level" class="header-icon">
                <h1>Como Anda o Seu Preparo Físico?</h1>
            </div>
            <div class="screen-content">
                <p>Para que possamos sugerir o TFM ideal, como você se descreve hoje?</p>
                <div class="option-card-container">
                    <div class="option-card" data-value="iniciante" onclick="window.onboarding.selectFitnessLevel('iniciante', this)">
                        <h3>Iniciante</h3>
                        <p>Começando agora, pouco preparo físico.</p>
                        <span class="tag">1/3</span>
                    </div>
                    <div class="option-card" data-value="intermediario" onclick="window.onboarding.selectFitnessLevel('intermediario', this)">
                        <h3>Intermediário</h3>
                        <p>Já pratica exercícios, mas não de forma intensa.</p>
                        <span class="tag">2/3</span>
                    </div>
                    <div class="option-card" data-value="avancado" onclick="window.onboarding.selectFitnessLevel('avancado', this)">
                        <h3>Avançado</h3>
                        <p>Treino regularmente e tenho bom condicionamento.</p>
                        <span class="tag">3/3</span>
                    </div>
                </div>
            </div>
            <div class="screen-footer">
                <button class="btn btn-primary" id="fitness-next-btn" disabled onclick="window.onboarding.nextStep()">Próximo</button>
            </div>
        `;
        window.app.getScreenElement('fitness-level').innerHTML = screenHtml;
        this.updateOnboardingProgress(1);
    }
    renderObjectivesScreen() {
        const screenHtml = `
            <div class="screen-header">
                <img src="assets/icons/mission.svg" alt="Objetivos" class="header-icon">
                <h1>Qual é a Sua Missão Principal?</h1>
            </div>
            <div class="screen-content">
                <p>O que você mais busca com o nosso aplicativo? (Pode escolher mais de uma)</p>
                <div class="option-card-container">
                    <div class="option-card" data-value="condicionamento" onclick="window.onboarding.toggleObjective('condicionamento', this)">
                        <h3>Melhorar o Condicionamento Físico</h3>
                    </div>
                    <div class="option-card" data-value="disciplina" onclick="window.onboarding.toggleObjective('disciplina', this)">
                        <h3>Ganhar Disciplina e Foco</h3>
                    </div>
                    <div class="option-card" data-value="taf" onclick="window.onboarding.toggleObjective('taf', this)">
                        <h3>Preparar para Testes Físicos (TAF)</h3>
                    </div>
                    <div class="option-card" data-value="habilidades" onclick="window.onboarding.toggleObjective('habilidades', this)">
                        <h3>Aprender Habilidades Militares</h3>
                    </div>
                    <div class="option-card" data-value="produtividade" onclick="window.onboarding.toggleObjective('produtividade', this)">
                        <h3>Aumentar a Produtividade</h3>
                    </div>
                </div>
            </div>
            <div class="screen-footer">
                <button class="btn btn-primary" id="objectives-next-btn" disabled onclick="window.onboarding.finishOnboarding()">Concluir Personalização</button>
            </div>
        `;
        window.app.getScreenElement('objectives-screen').innerHTML = screenHtml;
        this.updateOnboardingProgress(2);
        this.onboardingData.objectives = []; // Inicializa para múltiplos
    }
    // --- Lógica de Seleção ---
    selectProfile(value, element) {
        var _a;
        const container = element.closest('.option-card-container');
        if (container) {
            container.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
            element.classList.add('selected');
            this.onboardingData.profile = value;
            (_a = document.getElementById('profile-next-btn')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
        }
    }
    selectFitnessLevel(value, element) {
        var _a;
        const container = element.closest('.option-card-container');
        if (container) {
            container.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
            element.classList.add('selected');
            this.onboardingData.fitnessLevel = value;
            (_a = document.getElementById('fitness-next-btn')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
        }
    }
    toggleObjective(value, element) {
        var _a, _b;
        if (!this.onboardingData.objectives) {
            this.onboardingData.objectives = [];
        }
        const index = this.onboardingData.objectives.indexOf(value);
        if (index > -1) {
            this.onboardingData.objectives.splice(index, 1);
            element.classList.remove('selected');
        }
        else {
            this.onboardingData.objectives.push(value);
            element.classList.add('selected');
        }
        // Habilita o botão se ao menos um objetivo for selecionado
        if (this.onboardingData.objectives.length > 0) {
            (_a = document.getElementById('objectives-next-btn')) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
        }
        else {
            (_b = document.getElementById('objectives-next-btn')) === null || _b === void 0 ? void 0 : _b.setAttribute('disabled', 'true');
        }
    }
    // --- Navegação entre Steps ---
    nextStep() {
        this.currentOnboardingStep++;
        const steps = ['profile-setup', 'fitness-level', 'objectives-screen'];
        if (this.currentOnboardingStep < steps.length) {
            window.app.showScreen(steps[this.currentOnboardingStep]);
        }
        else {
            // Isso não deve ser alcançado via nextStep se finishOnboarding for usado
            console.warn("Navegação inesperada no onboarding.");
        }
    }
    finishOnboarding() {
        console.log("Personalização concluída!", this.onboardingData);
        // Aqui você salvaria onboardingData no localStorage ou enviaria para um backend
        // E então redirecionaria para o Dashboard principal ou para uma tela de boas-vindas do plano (Recruta)
        this.showPlanWelcomeScreenBasedOnProfile();
    }
    showPlanWelcomeScreenBasedOnProfile() {
        // Lógica simples para direcionar o usuário para a tela de boas-vindas do plano gratuito "Recruta"
        // Em um app real, aqui você verificaria se o usuário já tem uma assinatura paga.
        // Por enquanto, todos que terminam o onboarding vão para o Recruta.
        const welcomeScreenHtml = this.generateRecrutaWelcomeScreen();
        window.app.showScreen('recruta-welcome-screen', welcomeScreenHtml);
    }
    // --- Geração de Telas de Boas-Vindas dos Planos ---
    // Estas funções geram o HTML para as telas de boas-vindas de cada plano
    // e seriam chamadas pelo AppManager.showScreen com o HTML injetado.
    generateRecrutaWelcomeScreen() {
        return `
            <div class="screen-header">
                <img src="assets/icons/recruta-badge.svg" alt="Emblema Recruta" class="header-icon">
                <h2>Bem-vindo, Recruta! Sua Jornada Começa Agora!</h2>
            </div>
            <div class="screen-content">
                <p>Você deu o primeiro passo rumo à disciplina e ao alto desempenho. O <strong>Plano Recruta</strong> oferece as ferramentas essenciais para iniciar sua transformação. Prepare-se para experimentar o rigor e a organização da vida militar.</p>
                <div class="option-card-container">
                    <div class="option-card">
                        <h3>Crie Sua Primeira Rotina</h3>
                        <p>Organize seu dia e estabeleça a disciplina.</p>
                    </div>
                    <div class="option-card">
                        <h3>Explore o TFM Básico</h3>
                        <p>Exercícios essenciais para construir sua base física.</p>
                    </div>
                    <div class="option-card">
                        <h3>Registre Seu Desempenho</h3>
                        <p>Acompanhe sua evolução diária no Treinamento Físico.</p>
                    </div>
                </div>
                <p style="margin-top: 20px;">Lembre-se: consistência é mais importante que intensidade no início. Mantenha-se firme!</p>
            </div>
            <div class="screen-footer">
                <button class="btn btn-primary" onclick="window.app.showScreen('main-dashboard')">Começar Minha Rotina</button>
                <button class="btn btn-ghost" onclick="window.app.showScreen('subscriptions-screen')">Conheça Nossos Planos Premium</button>
            </div>
        `;
    }
    generateSoldadoWelcomeScreen() {
        // Implemente a lógica do carrossel para Soldado aqui, similar ao Sargento
        // Para simplificar, vou colocar um placeholder. O ideal seria ter uma lógica de slides.
        return `
            <div class="welcome-carousel">
                <div class="carousel-slide active">
                    <img src="assets/icons/soldier-badge.svg" alt="Soldado" class="feature-icon">
                    <h2>Parabéns, Soldado! Você Elevou o Nível!</h2>
                    <p>Seu comprometimento é digno de um Soldado! Você acaba de desbloquear ferramentas poderosas para levar sua disciplina e condicionamento físico ao próximo patamar.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/multi-routines.svg" alt="Múltiplas Rotinas" class="feature-icon">
                    <h2>Planeje com Precisão: Até 5 Rotinas!</h2>
                    <p>Agora você pode criar e gerenciar <strong>até 5 rotinas personalizadas</strong>! Organize seu treino, estudos e compromissos com a flexibilidade que um Soldado precisa.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/complete-tfm.svg" alt="TFM Completo" class="feature-icon">
                    <h2>Domine Cada Movimento: TFM Completo!</h2>
                    <p>Acesso total à nossa <strong>biblioteca de TFM com vídeos detalhados</strong> de cada exercício. Aprenda a técnica correta e maximize seus resultados.</p>
                    <button class="btn btn-primary" onclick="window.app.showScreen('main-dashboard')">Entendi, Começar Minha Missão Soldado!</button>
                </div>
                <div class="carousel-navigation">
                    <span class="carousel-dot active"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                </div>
            </div>
        `;
    }
    generateSargentoWelcomeScreen() {
        // Replicando a lógica do Sargento aqui, incluindo o carrossel de slides.
        // Em um projeto real, esta lógica estaria em um componente ou módulo separado para reutilização.
        return `
            <div class="welcome-carousel" id="sargento-carousel">
                <div class="carousel-slide active">
                    <img src="assets/icons/sargento-badge.svg" alt="Sargento" class="feature-icon">
                    <h2>Parabéns, Sargento! Sua Liderança Começa Agora!</h2>
                    <p>Você atingiu um novo patamar de excelência. Com o plano Sargento, seu preparo e suas habilidades táticas alcançam um nível superior. Estamos prontos para a sua próxima missão!</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Descubra Seus Novos Poderes</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/infinite-routines.svg" alt="Rotinas Ilimitadas" class="feature-icon">
                    <h2>Controle Total: Rotinas Personalizadas Ilimitadas!</h2>
                    <p>Como um Sargento, você não tem limites para a organização! Crie <strong>quantas rotinas personalizadas quiser</strong>. Planeje desde o seu dia a dia até treinamentos intensos e cenários específicos.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/mission-mode.svg" alt="Modo Missão" class="feature-icon">
                    <h2>Desafie Seus Limites: Modo 'Missão' Ativado!</h2>
                    <p>Pronto para o extremo? O <strong>Modo 'Missão'</strong> agora é seu! Mergulhe em desafios de treinamento rigorosos, com duração de uma semana ou um mês.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/advanced-skills.svg" alt="Habilidades Avançadas" class="feature-icon">
                    <h2>Domine o Campo: Acesso Completo a Habilidades Avançadas!</h2>
                    <p>Um Sargento é um especialista. Com seu novo plano, você tem <strong>acesso total a todas as seções de habilidades e conhecimentos</strong>, incluindo técnicas avançadas.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/log-book.svg" alt="Diário de Bordo" class="feature-icon">
                    <h2>Registre e Seja Reconhecido: Diário & Conquistas!</h2>
                    <p>Sua evolução merece ser celebrada. O <strong>Diário de Bordo expandido</strong> permite análises detalhadas e você coleciona <strong>conquistas e medalhas exclusivas</strong> de Sargento.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                 <div class="carousel-slide">
                    <img src="assets/icons/early-access.svg" alt="Acesso Antecipado" class="feature-icon">
                    <h2>Sempre à Frente: Acesso Antecipado a Novidades!</h2>
                    <p>Como Sargento, você está na vanguarda. Tenha <strong>acesso antecipado a novas funcionalidades e atualizações</strong> do aplicativo. Seja o primeiro a testar as inovações.</p>
                    <button class="btn btn-primary" onclick="window.app.showScreen('main-dashboard')">Entendi, Iniciar Minha Liderança!</button>
                </div>
                <div class="carousel-navigation">
                    <span class="carousel-dot active"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                </div>
            </div>
        `;
    }
    generateTenenteWelcomeScreen() {
        // Implemente a lógica do carrossel para Tenente aqui.
        // Similar ao Sargento, com 6 slides para os 6 recursos exclusivos.
        return `
            <div class="welcome-carousel">
                <div class="carousel-slide active">
                    <img src="assets/icons/lieutenant-badge.svg" alt="Tenente" class="feature-icon">
                    <h2>Bem-vindo, Tenente! Alcance a Elite!</h2>
                    <p>Você chegou ao ápice da disciplina e da estratégia! O plano Tenente oferece o que há de mais avançado para profissionais de segurança e atletas de alto rendimento.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Descubra Seu Poder</button>
                </div>
                 <div class="carousel-slide">
                    <img src="assets/icons/ai-training.svg" alt="Treino IA" class="feature-icon">
                    <h2>Seu Treinador Virtual: Planos Personalizados por IA!</h2>
                    <p>Receba planos de treinamento adaptativos, desenvolvidos por nossa inteligência artificial para otimizar cada segundo do seu preparo. Exclusivo para Tenentes.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                 <div class="carousel-slide">
                    <img src="assets/icons/wearables.svg" alt="Wearables" class="feature-icon">
                    <h2>Dados em Tempo Real: Integração com Wearables!</h2>
                    <p>Conecte seu smartwatch ou monitor cardíaco para registrar seus dados de TFM automaticamente. Integração total para um acompanhamento preciso.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/voice-commands.svg" alt="Comandos de Voz" class="feature-icon">
                    <h2>Mãos Livres: Reconhecimento de Voz!</h2>
                    <p>Controle seu treino com comandos de voz. Mantenha o foco e a fluidez, sem precisar tocar na tela. Máxima eficiência para seu treino.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/forum.svg" alt="Fórum Oficial" class="feature-icon">
                    <h2>Networking de Elite: Fórum Exclusivo de Oficiais!</h2>
                    <p>Conecte-se e troque experiências em nosso fórum exclusivo para Oficiais. Discussões estratégicas e insights valiosos esperam por você.</p>
                    <button class="btn btn-secondary" onclick="window.onboarding.nextCarouselSlide(this.closest('.welcome-carousel'))">Próximo</button>
                </div>
                 <div class="carousel-slide">
                    <img src="assets/icons/mission-planning.svg" alt="Planejamento de Missão" class="feature-icon">
                    <h2>Estratégia Avançada: Planejamento de Missão Completo!</h2>
                    <p>Utilize recursos dedicados ao planejamento de missões, com checklists detalhados e ferramentas de organização para seus maiores desafios.</p>
                    <button class="btn btn-primary" onclick="window.app.showScreen('main-dashboard')">Entendi, Começar Minha Elite!</button>
                </div>
                 <div class="carousel-navigation">
                    <span class="carousel-dot active"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                </div>
            </div>
        `;
    }
    // Lógica para o carrossel de boas-vindas
    nextCarouselSlide(carouselElement) {
        const slides = Array.from(carouselElement.querySelectorAll('.carousel-slide'));
        const dots = Array.from(carouselElement.querySelectorAll('.carousel-dot'));
        const currentActiveIndex = slides.findIndex(slide => slide.classList.contains('active'));
        if (currentActiveIndex !== -1) {
            slides[currentActiveIndex].classList.remove('active');
            dots[currentActiveIndex].classList.remove('active');
        }
        const nextIndex = (currentActiveIndex + 1) % slides.length;
        slides[nextIndex].classList.add('active');
        dots[nextIndex].classList.add('active');
    }
    updateOnboardingProgress(stepIndex) {
        const progressContainer = document.querySelector('.progress-indicator');
        if (progressContainer) {
            progressContainer.innerHTML = ''; // Limpa os pontos existentes
            for (let i = 0; i < this.totalOnboardingSteps; i++) {
                const dot = document.createElement('span');
                dot.classList.add('progress-dot');
                if (i <= stepIndex) {
                    dot.classList.add('active');
                }
                progressContainer.appendChild(dot);
            }
        }
    }
}
// Garante que o onboarding manager seja inicializado após o AppManager
document.addEventListener('DOMContentLoaded', () => {
    // É crucial que window.app já esteja disponível aqui.
    // Se você estiver usando um bundler como Webpack/Parcel,
    // pode usar import/export. Para este exemplo, a ordem dos scripts no HTML é importante.
    window.onboarding = new OnboardingManager();
});
