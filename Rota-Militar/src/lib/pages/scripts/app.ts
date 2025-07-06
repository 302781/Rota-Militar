// app.ts

// Declaração de tipo para o objeto global window
declare global {
    interface Window {
        app: AppManager;
    }
}

export class AppManager {
    private currentScreenId: string = '';
    private screens: Map<string, HTMLElement> = new Map();

    constructor() {
        this.initializeScreens();
        // Exemplo: mostrar a tela de boas-vindas ao carregar
        this.showScreen('welcome-screen');
    }

    private initializeScreens(): void {
        const screenElements = document.querySelectorAll('.app-screen') as NodeListOf<HTMLElement>;
        screenElements.forEach(screen => {
            if (screen.id) {
                this.screens.set(screen.id, screen);
                // Oculta todas as telas inicialmente
                screen.classList.remove('active');
            }
        });
    }

    public showScreen(screenId: string, customContentHTML?: string): void {
        // Oculta a tela atual, se houver
        if (this.currentScreenId) {
            const currentScreen = this.screens.get(this.currentScreenId);
            if (currentScreen) {
                currentScreen.classList.remove('active');
            }
        }

        // Mostra a nova tela
        const nextScreen = this.screens.get(screenId);
        if (nextScreen) {
            // Se houver conteúdo HTML personalizado, injeta-o
            if (customContentHTML) {
                nextScreen.innerHTML = customContentHTML;
            }
            nextScreen.classList.add('active');
            this.currentScreenId = screenId;
            console.log(`Exibindo tela: ${screenId}`);
            // Dispara um evento customizado se necessário (para lógica específica da tela)
            const event = new CustomEvent(`screenShown:${screenId}`);
            window.dispatchEvent(event);
        } else {
            console.error(`Tela com ID "${screenId}" não encontrada.`);
        }
    }

    // Método para obter uma tela específica (útil para injetar conteúdo)
    public getScreenElement(screenId: string): HTMLElement | undefined {
        return this.screens.get(screenId);
    }
}

// Inicializa o AppManager e o expõe globalmente para uso no HTML (se necessário)
document.addEventListener('DOMContentLoaded', () => {
    const appInstance = new AppManager();
    window.app = appInstance; // Mantém a referência global para onclicks no HTML
    // A primeira tela a ser mostrada será gerada e mostrada aqui
    appInstance.showScreen('welcome-screen', generateWelcomeScreenHTML()); // Chama a função para gerar HTML
});

// Movendo a função de geração da welcome screen para cá, ou para um utilitário
function generateWelcomeScreenHTML(): string {
    return `
        <div class="screen-header">
            <img src="assets/icons/military-badge.svg" alt="Emblema Militar" class="header-icon">
            <h1>Bem-vindo ao Comando da Sua Rotina!</h1>
        </div>
        <div class="screen-content">
            <p>Prepare-se para transformar disciplina em desempenho. Para começarmos, precisamos saber um pouco mais sobre você e seus objetivos.</p>
            <button class="btn btn-primary" onclick="window.app.showScreen('profile-setup')">Iniciar Personalização</button>
        </div>
    `;
}