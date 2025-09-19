# Belo&Olimpo Advocacia - Website

## Descrição

Site institucional moderno e sofisticado para a Belo&Olimpo Advocacia, desenvolvido com tecnologias web modernas e design responsivo.

## Características

### Design

- **Paleta de cores**: Azul Royal (#1e3a8a) e Branco (#ffffff)
- **Tipografia**: Playfair Display (títulos) e Inter (corpo do texto)
- **Layout**: Responsivo e mobile-first
- **Efeitos**: Gradientes, animações CSS e transições suaves

### Seções

- **Header**: Navegação fixa com logo elegante
- **Hero**: Seção de destaque com call-to-action
- **Quem Somos**: Missão, visão, valores e estatísticas
- **Serviços**: 6 áreas de atuação detalhadas
- **Informações**: Horários, documentos e dicas jurídicas
- **Contato**: Formulário funcional e informações de contato
- **Footer**: Links úteis e informações institucionais

### Recursos Avançados

- **Chatbot Inteligente**: Assistente virtual com respostas automáticas
- **Formulário de Contato**: Validação completa e feedback visual
- **Navegação Suave**: Scroll suave entre seções
- **Animações**: Contadores animados e efeitos de entrada
- **WhatsApp Flutuante**: Botão de acesso rápido
- **Design Responsivo**: Otimizado para todos os dispositivos

## Estrutura de Arquivos

```
beloeolimpo/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interativo
└── README.md           # Documentação
```

## Funcionalidades JavaScript

### Navegação

- Menu responsivo para mobile
- Navegação suave entre seções
- Destaque da seção ativa
- Efeito de scroll no header

### Animações

- Contadores animados nas estatísticas
- Animações de entrada para cards
- Efeitos de hover e transição

### Chatbot

- Interface moderna e intuitiva
- Respostas automáticas baseadas em palavras-chave
- Opções rápidas para perguntas comuns
- Suporte a múltiplas categorias de dúvidas

### Formulário

- Validação de campos em tempo real
- Formatação automática de telefone
- Sistema de notificações
- Labels animadas

## Cores e Variáveis CSS

```css
:root {
  --primary-color: #1e3a8a; /* Azul Royal */
  --primary-dark: #1e40af;
  --primary-light: #3b82f6;
  --accent-color: #ffffff; /* Branco */
  --text-dark: #1f2937;
  --text-light: #6b7280;
  --background: #ffffff;
  --background-alt: #f8fafc;
}
```

## Fontes Utilizadas

- **Playfair Display**: Títulos e elementos de destaque
- **Inter**: Texto do corpo e elementos secundários
- **Font Awesome**: Ícones e símbolos

## Responsividade

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Características Mobile

- Menu hamburguer
- Layout em coluna única
- Botões e formulários otimizados para toque
- Chatbot adaptado para telas pequenas

## Performance

### Otimizações

- CSS minificado e organizado
- JavaScript com debounce para scroll
- Lazy loading preparado para imagens
- Intersection Observer para animações

### SEO

- Meta tags otimizadas
- Estrutura semântica HTML5
- Schema markup preparado
- URLs amigáveis (âncoras)

## Acessibilidade

- Contraste adequado (WCAG AA)
- Navegação por teclado
- Labels descritivas
- Estrutura semântica correta

## Navegadores Suportados

- Chrome 70+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Instalação e Uso

1. Faça o download dos arquivos
2. Abra o arquivo `index.html` no navegador
3. Para desenvolvimento local, use um servidor web:

   ```bash
   # Com Python
   python -m http.server 8000

   # Com Node.js (http-server)
   npx http-server
   ```

## Personalização

### Cores

Edite as variáveis CSS em `:root` no arquivo `styles.css`

### Conteúdo

Modifique o HTML no arquivo `index.html`

### Funcionalidades

Adicione ou edite comportamentos no arquivo `script.js`

## Chatbot - Palavras-chave

O chatbot responde a palavras-chave nas seguintes categorias:

- **Saudação**: "oi", "olá", "bom dia"
- **Serviços**: "serviços", "direito", "área"
- **Consulta**: "agendar", "consulta", "marcar"
- **Horário**: "horário", "funcionamento", "atende"
- **Contato**: "telefone", "endereço", "contato"
- **Valores**: "preço", "valor", "honorário"

## Melhorias Futuras

- [ ] Integração com CRM
- [ ] Sistema de agendamento online
- [ ] Blog jurídico integrado
- [ ] Área do cliente
- [ ] Múltiplos idiomas
- [ ] PWA (Progressive Web App)
- [ ] Analytics e tracking

## Suporte

Para dúvidas ou suporte técnico, entre em contato com o desenvolvedor.

## Licença

Este projeto foi desenvolvido especificamente para Belo&Olimpo Advocacia.
Todos os direitos reservados.
