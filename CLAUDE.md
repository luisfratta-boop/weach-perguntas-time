# Weach | Perguntas do time

Página interna em que o time da Weach Group responde, por escrito e em cerca de 5 minutos, de 4 a 5 perguntas abertas da sua função. As respostas vão para uma planilha no Google Sheets e viram matéria-prima de conteúdo para Instagram e LinkedIn.

## Sobre a Weach
- Veículo de mídia de performance com mais de 12 anos de mercado e mais de 4 mil anunciantes.
- Frentes: Programática, Performance, Dados & Inteligência e Influencers. Atende grandes agências e marcas, com foco no automotivo. Vende gestão e veiculação em ChatGPT Ads.
- Posicionamento (de `fontes/Quem é a Weach.pdf`): a Weach entende como o consumidor se comporta e transforma esse entendimento em estratégia de mídia e performance. Fica no cruzamento entre mídia, performance, dados, tecnologia e comportamento.
- **Não deve parecer:** agência genérica, agência de social media, "empresa que faz tráfego", empresa de IA, consultoria corporativa ou marca que só fala de métrica. ChatGPT Ads é nova fronteira da jornada, não "modinha de IA".
- **Tom:** inteligente sem ser intelectual, seguro sem arrogância, humano sem texto corporativo, provocativo sem polêmica artificial. A autoridade é construída pelo conteúdo, não declarada ("Na Weach fazemos…" não serve).
- **Filtro de toda ideia:** mostra que a Weach entende de mídia, comportamento ou performance? Diferencia de uma agência comum? É relevante agora? Gera conversa real?

## Regras de conteúdo (sempre)
1. Nunca usar nome de cliente nem número de campanha. Se aparecer, anonimizar e sinalizar.
2. Sem política, eleição ou notícias.
3. Nunca atribuir uma fala a alguém sem aprovação da pessoa.
4. Português do Brasil, textos humanos, diretos e leves. **Sem travessões.**

## Identidade visual (do pitch em `fontes/`)
- Fundo em degradê azul: `#021B51` > `#02316D` > `#0561BC` > `#036DCF`. Texto branco.
- Destaque amarelo `#F8B804`: barrinha curta acima dos títulos, botões, barra de progresso e o círculo desenhado à mão (SVG) em volta de uma palavra do título de abertura.
- Montserrat (Google Fonts). Títulos com duas linhas: a primeira em Regular, a segunda em Bold.
- Logo "w." branco no canto superior direito (`assets/logo-w.png`, recortado do slide do pitch por `tools/recortar-logo.ps1`; troque pelo arquivo oficial se houver).
- Cards arredondados em `#05265D`, muito respiro, sem sombra pesada e sem ícone genérico.

## Estrutura
| Caminho | O que é |
|---|---|
| `index.html` | A página inteira (HTML, CSS e JS). `SCRIPT_URL` no topo do `<script>` |
| `data/perguntas.json` | Banco de perguntas: `rodada_atual`, `max_por_funcao`, `funcoes`, `perguntas[]` com `id, funcoes, pergunta, formatos, rodada, ativa` |
| `apps-script.gs` | Google Apps Script: grava na aba Respostas e cria a aba Painel |
| `PUBLICAR.md` | Passo a passo: planilha, GitHub + Vercel e nova rodada |
| `.claude/commands/transformar.md` | Comando `/transformar` |
| `respostas/` | CSVs exportados da aba Respostas (fora do git) |
| `conteudos/` | `ideias.md` e `ideias.csv` gerados pelo `/transformar` (fora do git) |
| `fontes/` | Pitch e "Quem é a Weach" (fora do git e do deploy) |

## Fluxo
1. **Rodada.** Em `data/perguntas.json`, defina `rodada_atual` e ative as perguntas (`"ativa": "sim"`). Cada função vê no máximo 5: as "da casa" (função em primeiro lugar em `funcoes`) vêm antes das compartilhadas, e no fim entra **uma** pergunta ativa de "Todas as funções", que reveza a cada rodada. Depois é só `git push`, que o Vercel publica.
2. **Coleta.** O link vai por WhatsApp e e-mail. Cada envio grava uma linha por resposta na aba Respostas, com status `nova`. O Painel mostra quem respondeu por função e quantas respostas estão como nova, aproveitada ou descartada.
3. **Transformar.** Exporte a aba Respostas em CSV para `respostas/` e rode `/transformar`. As ideias saem em `conteudos/ideias.md` e `conteudos/ideias.csv`, agrupadas por formato e com a origem. Depois de usar uma ideia, marque a resposta como `aproveitada` na planilha.

### Rodadas planejadas para "Todas as funções"
- Rodada 1: P23 · Rodada 2: P24 · Rodada 3: P25
- P06 (Liderança/Operação) fica para a rodada 2.
- Na rodada 1, Planejamento de mídia tem 6 perguntas ativas (P05 + P16 a P20). Pelo limite de 5, a P05 aparece só para Liderança.

## Formatos de conteúdo
carrossel curto (republicado no LinkedIn) · estudo (Instagram enxuto e LinkedIn em documento) · tipos de pessoa em vídeo · série da operação (comédia de escritório com virada técnica) · novelinha · Daniel na câmera · Alberto & Bia (a planejadora Bia e o cachorro Alberto, falas curtas, fecho com humor) · material para o planejador usar com o cliente · institucional.
