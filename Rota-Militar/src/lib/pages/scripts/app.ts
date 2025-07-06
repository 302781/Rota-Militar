// app.ts

// Declaração de tipo para o objeto global window
declare global {
    interface Window {
        app: AppManager;
    }
}

class AppManager {
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

// Inicializa o gerenciador de app assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppManager();
});