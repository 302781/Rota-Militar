// scripts/onboarding.ts

import { AppManager } from './app'; // Importa o AppManager

// Declaração de tipo para o objeto global window
declare global {
    interface Window {
        onboarding: OnboardingManager;
        app: AppManager; // Certifica que AppManager também está no window
    }
}

// --- Carrossel de Boas-Vindas (Componente Separado) ---
class WelcomeCarousel {
    private carouselElement: HTMLElement;
    private slides: HTMLElement[];
    private dots: HTMLElement[];
    private currentIndex: number = 0;

    constructor(carouselElement: HTMLElement) {
        this.carouselElement = carouselElement;
        this.slides = Array.from(carouselElement.querySelectorAll('.carousel-slide')) as HTMLElement[];
        this.dots = Array.from(carouselElement.querySelectorAll('.carousel-dot')) as HTMLElement[];

        // Garante que apenas o primeiro slide esteja ativo no início
        this.slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        this.dots.forEach((dot, index) => {
            if (index === 0) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        this.attachNavigationHandler();
    }

    private attachNavigationHandler(): void {
        this.carouselElement.querySelectorAll('.carousel-slide .btn-secondary').forEach(button => {
            button.addEventListener('click', () => this.nextSlide());
        });
    }

    public nextSlide(): void {
        if (this.currentIndex !== -1) {
            this.slides[this.currentIndex].classList.remove('active');
            this.dots[this.currentIndex].classList.remove('active');
        }

        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }
}


// --- Onboarding Manager ---
class OnboardingManager {
    private appManager: AppManager;
    private currentOnboardingStep: number = 0;
    private totalOnboardingSteps: number = 3; // Perfil, Nível Físico, Objetivos
    private onboardingData: { profile?: string; fitnessLevel?: string; objectives?: string[] } = {};

    constructor(appManager: AppManager) {
        this.appManager = appManager;
        this.onboardingData.objectives = []; // Inicializa objetivos apenas uma vez

        // Adiciona event listeners de forma mais controlada
        window.addEventListener('screenShown:profile-setup', () => this.renderProfileSetupScreen());
        window.addEventListener('screenShown:fitness-level', () => this.renderFitnessLevelScreen());
        window.addEventListener('screenShown:objectives-screen', () => this.renderObjectivesScreen());
        window.addEventListener('screenShown:sargento-welcome-screen', (event: Event) => {
            const screenElement = this.appManager.getScreenElement('sargento-welcome-screen');
            if (screenElement) new WelcomeCarousel(screenElement);
        });
         window.addEventListener('screenShown:soldado-welcome-screen', (event: Event) => {
            const screenElement = this.appManager.getScreenElement('soldado-welcome-screen');
            if (screenElement) new WelcomeCarousel(screenElement);
        });
         window.addEventListener('screenShown:tenente-welcome-screen', (event: Event) => {
            const screenElement = this.appManager.getScreenElement('tenente-welcome-screen');
            if (screenElement) new WelcomeCarousel(screenElement);
        });

    }

    // --- Renderização das Telas de Onboarding ---

    private renderProfileSetupScreen(): void {
        const screenHtml = `
            <div class="screen-header">
                <img src="assets/icons/rank.svg" alt="Patente" class="header-icon">
                <h1>Qual a sua Patente no Campo da Vida?</h1>
            </div>
            <div class="screen-content">
                <p>Para quem você está construindo essa rotina?</p>
                <div class="option-card-container">
                    <div class="option-card" data-value="militar">
                        <h3>Militar da Ativa / Reserva</h3>
                        <p>Selecione se você já serve ou serviu.</p>
                    </div>
                    <div class="option-card" data-value="candidato">
                        <h3>Candidato a Carreira Militar</h3>
                        <p>Para quem está se preparando para entrar.</p>
                    </div>
                    <div class="option-card" data-value="civil">
                        <h3>Civil em Busca de Disciplina</h3>
                        <p>Para quem quer a rotina militar para a vida pessoal.</p>
                    </div>
                </div>
            </div>
            <div class="screen-footer">
                <button class="btn btn-primary" id="profile-next-btn" disabled>Próximo</button>
            </div>
        `;
        this.appManager.getScreenElement('profile-setup')!.innerHTML = screenHtml;
        this.updateOnboardingProgress(0);
        this.attachOptionCardHandlers('profile-setup', 'profile', 'profile-next-btn', false);
        // Restaura seleção anterior
        this.restoreSelection('profile-setup', this.onboardingData.profile);
    }

    private renderFitnessLevelScreen(): void {
        const screenHtml = `
            <div class="screen-header">
                <img src="assets/icons/fitness.svg" alt="Fitness Level" class="header-icon">
                <h1>Como Anda o Seu Preparo Físico?</h1>
            </div>
            <div class="screen-content">
                <p>Para que possamos sugerir o TFM ideal, como você se descreve hoje?</p>
                <div class="option-card-container">
                    <div class="option-card" data-value="iniciante">
                        <h3>Iniciante</h3>
                        <p>Começando agora, pouco preparo físico.</p>
                        <span class="tag">1/3</span>
                    </div>
                    <div class="option-card" data-value="intermediario">
                        <h3>Intermediário</h3>
                        <p>Já pratica exercícios, mas não de forma intensa.</p>
                        <span class="tag">2/3</span>
                    </div>
                    <div class="option-card" data-value="avancado">
                        <h3>Avançado</h3>
                        <p>Treino regularmente e tenho bom condicionamento.</p>
                        <span class="tag">3/3</span>
                    </div>
                </div>
            </div>
            <div class="screen-footer">
                <button class="btn btn-primary" id="fitness-next-btn" disabled>Próximo</button>
            </div>
        `;
        this.appManager.getScreenElement('fitness-level')!.innerHTML = screenHtml;
        this.updateOnboardingProgress(1);
        this.attachOptionCardHandlers('fitness-level', 'fitnessLevel', 'fitness-next-btn', false);
        this.restoreSelection('fitness-level', this.onboardingData.fitnessLevel);
    }

    private renderObjectivesScreen(): void {
        const screenHtml = `
            <div class="screen-header">
                <img src="assets/icons/mission.svg" alt="Objetivos" class="header-icon">
                <h1>Qual é a Sua Missão Principal?</h1>
            </div>
            <div class="screen-content">
                <p>O que você mais busca com o nosso aplicativo? (Pode escolher mais de uma)</p>
                <div class="option-card-container">
                    <div class="option-card" data-value="condicionamento">
                        <h3>Melhorar o Condicionamento Físico</h3>
                    </div>
                    <div class="option-card" data-value="disciplina">
                        <h3>Ganhar Disciplina e Foco</h3>
                    </div>
                    <div class="option-card" data-value="taf">
                        <h3>Preparar para Testes Físicos (TAF)</h3>
                    </div>
                    <div class="option-card" data-value="habilidades">
                        <h3>Aprender Habilidades Militares</h3>
                    </div>
                    <div class="option-card" data-value="produtividade">
                        <h3>Aumentar a Produtividade</h3>
                    </div>
                </div>
            </div>
            <div class="screen-footer">
                <button class="btn btn-primary" id="objectives-next-btn" disabled>Concluir Personalização</button>
            </div>
        `;
        this.appManager.getScreenElement('objectives-screen')!.innerHTML = screenHtml;
        this.updateOnboardingProgress(2);
        this.attachOptionCardHandlers('objectives-screen', 'objectives', 'objectives-next-btn', true);
        this.restoreMultiSelection('objectives-screen', this.onboardingData.objectives || []);
    }

    // --- Lógica de Seleção Generalizada ---
    private attachOptionCardHandlers(screenId: string, dataKey: keyof OnboardingManager['onboardingData'], nextBtnId: string, multiSelect: boolean): void {
        const screenElement = this.appManager.getScreenElement(screenId);
        if (!screenElement) return;

        const optionCards = screenElement.querySelectorAll('.option-card');
        const nextButton = screenElement.querySelector(`#${nextBtnId}`) as HTMLButtonElement;

        optionCards.forEach(card => {
            card.addEventListener('click', () => {
                const value = card.getAttribute('data-value');
                if (!value) return;

                if (multiSelect) {
                    // Lógica para seleção múltipla
                    if (!this.onboardingData[dataKey]) {
                        this.onboardingData[dataKey] = [];
                    }
                    const selectedArray = this.onboardingData[dataKey] as string[];
                    const index = selectedArray.indexOf(value);

                    if (index > -1) {
                        selectedArray.splice(index, 1);
                        card.classList.remove('selected');
                    } else {
                        selectedArray.push(value);
                        card.classList.add('selected');
                    }
                    nextButton.disabled = selectedArray.length === 0;
                } else {
                    // Lógica para seleção única
                    optionCards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    this.onboardingData[dataKey] = value;
                    nextButton.disabled = false;
                }
            });
        });

        // Adiciona o listener para o botão de próximo
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (nextBtnId === 'objectives-next-btn') {
                    this.finishOnboarding();
                } else {
                    this.nextStep();
                }
            });
        }
    }

    private restoreSelection(screenId: string, selectedValue?: string): void {
        if (!selectedValue) return;
        const screenElement = this.appManager.getScreenElement(screenId);
        if (screenElement) {
            const card = screenElement.querySelector(`.option-card[data-value="${selectedValue}"]`);
            if (card) {
                card.classList.add('selected');
                // Habilita o botão se houver uma seleção anterior
                const nextBtnId = screenId === 'profile-setup' ? 'profile-next-btn' : 'fitness-next-btn';
                document.getElementById(nextBtnId)?.removeAttribute('disabled');
            }
        }
    }

    private restoreMultiSelection(screenId: string, selectedValues: string[]): void {
        if (!selectedValues || selectedValues.length === 0) return;
        const screenElement = this.appManager.getScreenElement(screenId);
        if (screenElement) {
            selectedValues.forEach(value => {
                const card = screenElement.querySelector(`.option-card[data-value="${value}"]`);
                if (card) {
                    card.classList.add('selected');
                }
            });
            document.getElementById('objectives-next-btn')?.removeAttribute('disabled');
        }
    }

    // --- Navegação entre Steps ---

    public nextStep(): void {
        this.currentOnboardingStep++;
        const steps = ['profile-setup', 'fitness-level', 'objectives-screen'];
        if (this.currentOnboardingStep < steps.length) {
            this.appManager.showScreen(steps[this.currentOnboardingStep]);
        } else {
            console.warn("Navegação inesperada no onboarding.");
        }
    }

    public finishOnboarding(): void {
        console.log("Personalização concluída!", this.onboardingData);
        // Salvar onboardingData (ex: localStorage ou enviar para backend)
        localStorage.setItem('onboardingData', JSON.stringify(this.onboardingData));

        // Determinar qual tela de boas-vindas do plano mostrar
        this.showPlanWelcomeScreenBasedOnProfileAndSubscription();
    }

    private showPlanWelcomeScreenBasedOnProfileAndSubscription(): void {
        // Lógica de mock: Para demonstração, vamos simular que o usuário é sempre "Recruta" após o onboarding,
        // a menos que ele tenha uma assinatura paga (que não está no escopo de simulação atual).
        // Em um app real, você verificaria o status da assinatura do usuário.

        // Por exemplo, podemos simular um cenário onde o perfil "Militar" ou "Candidato"
        // pode levar a uma sugestão de upgrade para Soldado/Sargento mais tarde,
        // mas inicialmente o plano gratuito Recruta é o ponto de entrada.

        // Se o usuário já tiver uma assinatura Sargento/Tenente, mostre a tela de boas-vindas do plano correspondente.
        // Para este MVP, vamos para Recruta após o onboarding inicial.
        // Se a lógica de "assinatura" existir, ela seria verificada aqui.

        // Para simplificar no MVP, sempre vai para Recruta após o onboarding inicial,
        // a não ser que a gente adicione uma lógica para simular uma assinatura existente.
        // Vamos mostrar Recruta por padrão, ou Sargento se for para demonstração do carrossel.

        // Exemplo: Simular que se o perfil for 'militar' ele vai para Sargento (apenas para teste)
        let welcomeHtml: string;
        let screenId: string;

        // Você pode ajustar esta lógica para testar os diferentes planos:
        if (this.onboardingData.profile === 'militar') { // Apenas um exemplo para ver o Sargento
            welcomeHtml = this.generateSargentoWelcomeScreen();
            screenId = 'sargento-welcome-screen';
        } else if (this.onboardingData.fitnessLevel === 'intermediario') { // Outro exemplo para ver o Soldado
             welcomeHtml = this.generateSoldadoWelcomeScreen();
             screenId = 'soldado-welcome-screen';
        } else {
            welcomeHtml = this.generateRecrutaWelcomeScreen();
            screenId = 'recruta-welcome-screen';
        }
        this.appManager.showScreen(screenId, welcomeHtml);
    }

    // --- Geração de Telas de Boas-Vindas dos Planos ---
    // Estas funções geram o HTML para as telas de boas-vindas de cada plano

    public generateRecrutaWelcomeScreen(): string {
        return `
            <div class="screen-header">
                <img src="assets/icons/recruta-badge.svg" alt="Emblema Recruta" class="header-icon">
                <h2>Bem-vindo, Recruta! Sua Jornada Começa Agora!</h2>
            </div>
            <div class="screen-content">
                <p>Você deu o primeiro passo rumo à disciplina e ao alto desempenho. O <strong>Plano Recruta</strong> oferece as ferramentas essenciais para iniciar sua transformação. Prepare-se para experimentar o rigor e a organização da vida militar.</p>
                <div class="option-card-container">
                    <div class="option-card static-card">
                        <h3>Crie Sua Primeira Rotina</h3>
                        <p>Organize seu dia e estabeleça a disciplina.</p>
                    </div>
                    <div class="option-card static-card">
                        <h3>Explore o TFM Básico</h3>
                        <p>Exercícios essenciais para construir sua base física.</p>
                    </div>
                    <div class="option-card static-card">
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

    public generateSoldadoWelcomeScreen(): string {
        return `
            <div class="welcome-carousel">
                <div class="carousel-slide active">
                    <img src="assets/icons/soldier-badge.svg" alt="Soldado" class="feature-icon">
                    <h2>Parabéns, Soldado! Você Elevou o Nível!</h2>
                    <p>Seu comprometimento é digno de um Soldado! Você acaba de desbloquear ferramentas poderosas para levar sua disciplina e condicionamento físico ao próximo patamar.</p>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/multi-routines.svg" alt="Múltiplas Rotinas" class="feature-icon">
                    <h2>Planeje com Precisão: Até 5 Rotinas!</h2>
                    <p>Agora você pode criar e gerenciar <strong>até 5 rotinas personalizadas</strong>! Organize seu treino, estudos e compromissos com a flexibilidade que um Soldado precisa.</p>
                    <button class="btn btn-secondary">Próximo</button>
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

    public generateSargentoWelcomeScreen(): string {
        return `
            <div class="welcome-carousel" id="sargento-carousel">
                <div class="carousel-slide active">
                    <img src="assets/icons/sargento-badge.svg" alt="Sargento" class="feature-icon">
                    <h2>Parabéns, Sargento! Sua Liderança Começa Agora!</h2>
                    <p>Você atingiu um novo patamar de excelência. Com o plano Sargento, seu preparo e suas habilidades táticas alcançam um nível superior. Estamos prontos para a sua próxima missão!</p>
                    <button class="btn btn-secondary">Descubra Seus Novos Poderes</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/infinite-routines.svg" alt="Rotinas Ilimitadas" class="feature-icon">
                    <h2>Controle Total: Rotinas Personalizadas Ilimitadas!</h2>
                    <p>Como um Sargento, você não tem limites para a organização! Crie <strong>quantas rotinas personalizadas quiser</strong>. Planeje desde o seu dia a dia até treinamentos intensos e cenários específicos.</p>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/mission-mode.svg" alt="Modo Missão" class="feature-icon">
                    <h2>Desafie Seus Limites: Modo 'Missão' Ativado!</h2>
                    <p>Pronto para o extremo? O <strong>Modo 'Missão'</strong> agora é seu! Mergulhe em desafios de treinamento rigorosos, com duração de uma semana ou um mês.</p>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/advanced-skills.svg" alt="Habilidades Avançadas" class="feature-icon">
                    <h2>Domine o Campo: Acesso Completo a Habilidades Avançadas!</h2>
                    <p>Um Sargento é um especialista. Com seu novo plano, você tem <strong>acesso total a todas as seções de habilidades e conhecimentos</strong>, incluindo técnicas avançadas.</p>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/log-book.svg" alt="Diário de Bordo" class="feature-icon">
                    <h2>Registre e Seja Reconhecido: Diário & Conquistas!</h2>
                    <p>Sua evolução merece ser celebrada. O <strong>Diário de Bordo expandido</strong> permite análises detalhadas e você coleciona <strong>conquistas e medalhas exclusivas</strong> de Sargento.</p>
                    <button class="btn btn-secondary">Próximo</button>
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

    public generateTenenteWelcomeScreen(): string {
        return `
            <div class="welcome-carousel">
                <div class="carousel-slide active">
                    <img src="assets/icons/lieutenant-badge.svg" alt="Tenente" class="feature-icon">
                    <h2>Bem-vindo, Tenente! Alcance a Elite!</h2>
                    <p>Você chegou ao ápice da disciplina e da estratégia! O plano Tenente oferece o que há de mais avançado para profissionais de segurança e atletas de alto rendimento.</p>
                    <button class="btn btn-secondary">Descubra Seu Poder</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/ai-training.svg" alt="Treino IA" class="feature-icon">
                    <h2>Seu Treinador Virtual: Planos Personalizados por IA!</h2>
                    <p>Receba planos de treinamento adaptativos, desenvolvidos por nossa inteligência artificial para otimizar cada segundo do seu preparo. Exclusivo para Tenentes.</p>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/wearables.svg" alt="Wearables" class="feature-icon">
                    <h2>Dados em Tempo Real: Integração com Wearables!</h2>
                    <p>Conecte seu smartwatch ou monitor cardíaco para registrar seus dados de TFM automaticamente. Integração total para um acompanhamento preciso.</p>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/voice-commands.svg" alt="Comandos de Voz" class="feature-icon">
                    <h2>Mãos Livres: Reconhecimento de Voz!</h2>
                    <p>Controle seu treino com comandos de voz. Mantenha o foco e a fluidez, sem precisar tocar na tela. Máxima eficiência para seu treino.</p>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
                <div class="carousel-slide">
                    <img src="assets/icons/forum.svg" alt="Fórum Oficial" class="feature-icon">
                    <h2>Networking de Elite: Fórum Exclusivo de Oficiais!</h2>
                    <p>Conecte-se e troque experiências em nosso fórum exclusivo para Oficiais. Discussões estratégicas e insights valiosos esperam por você.</p>
                    <button class="btn btn-secondary">Próximo</button>
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

    private updateOnboardingProgress(stepIndex: number): void {
        const progressContainer = document.querySelector('.progress-indicator');
        if (progressContainer) {
            progressContainer.innerHTML = '';
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

// Inicializa o OnboardingManager após o DOM e o AppManager estarem prontos
document.addEventListener('DOMContentLoaded', () => {
    // Certifique-se que window.app está definido antes de instanciar OnboardingManager
    if (window.app) {
        window.onboarding = new OnboardingManager(window.app);
    } else {
        console.error("AppManager não está disponível no objeto window. Verifique a ordem dos scripts.");
    }
});