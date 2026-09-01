# Laboratório de História Preta Tia Simoa

> **Memória em Movimento:** Fragmentos de momentos e ações preservados através do tempo e eternizados pela tecnologia.

O **Laboratório de História Preta Tia Simoa** é um projeto educacional e de produção cultural estudantil sediado na **EEEP Deputado Roberto Mesquita** (Ceará). O objetivo principal do projeto é promover a preservação e a disseminação da memória e história Afro-Cearense, com foco no protagonismo estudantil e na união entre história e tecnologia.

O nome do laboratório homenageia a **Preta Tia Simoa**, mulher negra liberta e liderança popular do século XIX que se destacou nas mobilizações abolicionistas e na histórica Greve dos Jangadeiros (1881) no Ceará.

---

## Funcionalidades da Plataforma

A aplicação web do projeto serve como o ecossistema digital do laboratório, contando com as seguintes páginas e recursos estruturados:

* **Página Principal (`index.html`)**: Apresentação institucional, biografia da Preta Tia Simoa e a seção "Princípios que Nos Formam", detalhando os valores do projeto[cite: 14].
* **Apresentação da Equipe**: Áreas dedicadas à Coordenação Geral (conduzida pela Dra. Stelina Moreira de Vasconcelos Neta) e ao Núcleo Discente (pesquisadores, desenvolvedores, historiadores, suporte e design)[cite: 14].
* **Sistema de Agendamento**: Formulário integrado para a marcação de visitas institucionais, formações, pesquisas orientadas e palestras[cite: 14].
* **Canal de Denúncias**: Espaço seguro para o registro de casos de racismo, LGBTfobia, abuso de autoridade e outras violações, com suporte a envios anônimos e anexação de provas (imagens, vídeos, áudios e PDFs)[cite: 14].
* **Acervo Digital (`acervo.html`)**: Galeria interativa de ações e vivências do coletivo através de fotos e vídeos preservados digitalmente[cite: 14].
* **Painel de Administração (`admin.html`)**: Área restrita para que a equipe possa alimentar a memória do laboratório, gerenciar o acervo e atualizar eventos[cite: 14].

---

## UI/UX e Arquitetura de Estilos (CSS)

O front-end destaca-se por um Design System robusto e responsivo, projetado para oferecer uma experiência visual premium e imersiva:

* **Paleta de Cores e Variáveis (`:root`):** O sistema visual é guiado por variáveis CSS na raiz, garantindo consistência com o uso de gradientes e cores-tema baseadas em tons de ouro (`#c5a059`), terra escurecida (`#000000` / `#141414`) e creme suave (`#f4eee0`)[cite: 10].
* **Tipografia e Hierarquia Visual:** A aplicação combina tipografias elegantes importadas do Google Fonts, adotando a família 'Cormorant Garamond' para textos principais, 'Space Grotesk' para destaques e detalhes modernos, e 'Playfair Display SC' para títulos sofisticados[cite: 10, 14].
* **Efeitos de Vidro (Glassmorphism):** Elementos sobrepostos de interface, como a barra de navegação (`header`), marcadores de categoria e o modal do acervo, utilizam a propriedade `backdrop-filter: blur()` combinada com fundos semitransparentes para criar o efeito moderno de vidro fosco[cite: 9, 11, 12].
* **Layouts Fluidos com Grid e Flexbox:** A interface foi modelada usando `display: grid` com funções avançadas como `repeat(auto-fill, minmax(260px, 1fr))`, o que permite a criação de grades de cartões (`master-grid`) e formulários de agendamento que se rearranjam automaticamente conforme a largura do dispositivo[cite: 11].
* **Animações e Interatividade (`@keyframes`):** A retenção visual de abertura do site é garantida por uma tela de carregamento (*preloader*) com barra de progresso dinâmica e animações em loop CSS para pulsar e emitir brilho (`glow`)[cite: 12]. Além disso, os cartões interativos respondem ao usuário com transições suaves (`transform: translateY` e `box-shadow`) durante o *hover*[cite: 9, 11]. O fundo da aplicação ainda conta com a biblioteca externa Particles.js para interação dinâmica com o ponteiro do mouse[cite: 12, 14].
* **Design 100% Responsivo (Mobile First e Media Queries):** O layout reage nativamente em dispositivos móveis e tablets através de `media queries` configuradas (como limites em 992px, 850px e 768px), o que ativa um menu lateral deslizante oculto e ajusta dinamicamente a estrutura de blocos do rodapé e cartões em telas menores[cite: 9, 13].

---

## Estrutura do Projeto

A organização das pastas e arquivos do repositório foi planejada para facilitar a manutenção e escalabilidade do código:

* **Arquivos Raiz**: Contém as páginas principais (`index.html`, `acervo.html`, `admin.html`) e as diretrizes do projeto (`README.md`)[cite: 14].
* **`assets/css/`**: Folhas de estilo modularizadas por escopo (`global.css`, `index.css`, `responsiveIndex.css`, `preload.css`, `acervo.css`)[cite: 14].
* **`assets/images/`**: Imagens estáticas, fotografias da equipe e logotipos utilizados na interface[cite: 14].
* **`assets/js/`**: Scripts divididos por funcionalidade, incluindo regras de negócio e validações (`index.js`, `email.js`, `denuncia.js`, `acervo.js`, `admin.js`, `preload.js`, `puxarAlunos.js`)[cite: 14].
* **`assets/js/supabase/`**: Diretório dedicado às configurações e integração direta com o banco de dados (Supabase)[cite: 14].

---

## Como Executar o Projeto Localmente

Como o projeto é composto primariamente por arquivos estáticos de front-end, ele pode ser executado facilmente seguindo estes passos:

1. Faça o clone do repositório em sua máquina utilizando o terminal: 
   ```bash
   git clone [https://github.com/guilhxrmxzzs/laboratoriopretatiasimoa.git](https://github.com/guilhxrmxzzs/laboratoriopretatiasimoa.git)