---
description: Transforma as respostas novas do time (CSV da aba Respostas) em ideias de conteúdo por formato
argument-hint: "[caminho do CSV] (opcional; padrão: o CSV mais recente em respostas/)"
---

Você vai transformar respostas do time da Weach em ideias de conteúdo para Instagram e LinkedIn. Antes de começar, leia o `CLAUDE.md` deste projeto: ele tem o tom, as regras e o que a Weach não deve parecer.

## 1. Entrada

- CSV: `$ARGUMENTS`. Se vier vazio, use o `.csv` modificado mais recentemente em `respostas/`. Se não houver nenhum, avise e pare.
- É o CSV exportado da aba **Respostas** (Arquivo > Fazer download > CSV). Colunas: `Data e hora, Rodada, Nome, Função, ID da pergunta, Pergunta, Formatos, Resposta, Status`.
- Leia também `data/perguntas.json`. Os formatos de cada pergunta vêm de lá, pelo `id`. Use a coluna `Formatos` do CSV só se o id não existir no JSON.
- Considere **somente** as linhas com `Status` = `nova` (ignore maiúsculas e espaços). Se nenhuma linha estiver como nova, avise e pare.

## 2. Para cada resposta "nova"

Gere de **2 a 4 ideias**, sempre nos formatos ligados à pergunta. Se a pergunta tem um formato só, faça ângulos diferentes dentro dele. Uma resposta curta ou rasa pode render só 2 ideias. Não force.

Cada ideia tem:
- **Formato** e **canal**, conforme a tabela abaixo
- **Gancho**: a primeira frase ou o primeiro slide, do jeito que vai ao ar. Curto, específico e sem clichê.
- **Ângulo**: em 1 ou 2 frases, que ponto de vista da Weach a peça defende e por que alguém do mercado pararia para ver
- **Estrutura**: um esboço curto (slides, cenas ou falas), de 3 a 6 linhas
- **Depende de**: `social media`, `time` ou `Daniel` (pode ser mais de um, ver tabela)
- **Origem**: nome, função e id da pergunta de quem respondeu (uso interno)
- **Alertas**, quando houver (ver regras)

### Formatos

| Formato | Canal | O que é | Depende de (padrão) |
|---|---|---|---|
| carrossel | Instagram, republicado no LinkedIn | Carrossel curto de 5 a 7 slides com uma ideia só e fecho com ponto de vista | social media |
| estudo | Instagram enxuto + LinkedIn em documento (PDF) | Leitura de mercado com dado ou raciocínio. No Instagram vai a versão curta, no LinkedIn o documento completo | social media (o time valida os dados) |
| tipos de pessoa | Vídeo curto (Reels/LinkedIn) | "Tipos de pessoa que existem em…", com o time interpretando os tipos | time |
| série da operação | Vídeo em episódios | A situação real vira episódio de comédia de escritório **com virada técnica**: a graça abre, o aprendizado de mídia fecha | time |
| novelinha | Vídeo em capítulos | Drama exagerado de uma situação da campanha, com gancho de "continua" | time |
| Daniel na câmera | Vídeo do Daniel (founder) falando direto | Opinião forte e curta, de 30 a 60 segundos, com uma tese só | Daniel |
| Alberto & Bia | Vídeo/animação curta | A planejadora Bia e o cachorro Alberto. Falas curtas, Alberto pergunta ou confunde, Bia explica, **fecho com humor** | social media |
| material para usar | Peça para o planejador mandar ao cliente | Um guia, checklist ou "respostas para as perguntas que todo cliente faz" | social media + time |
| institucional | Instagram + LinkedIn | Mostra como a Weach trabalha por meio de um ponto de vista, sem "Na Weach fazemos…" | social media |

## 3. Regras (sem exceção)

1. **Nunca use nome de cliente, marca anunciante ou agência parceira, nem número de campanha** (verba, CPL, ROAS, %, volume, prazo específico). Se aparecer na resposta, troque nas ideias por algo genérico, como "uma montadora", "um cliente do varejo", "o custo por lead caiu pela metade" (sem o número exato) ou "[número omitido]". Marque a ideia com `ALERTA: anonimizado` e diga o que foi trocado.
2. **Sem política, eleição ou notícias do dia.** Se a resposta depender disso, não gere ideias para ela. Liste a resposta em "Respostas não aproveitadas" com o motivo.
3. **Nunca atribua a fala a alguém sem aprovação.** O nome de quem respondeu aparece só no campo Origem, que é interno. Se a ideia usar a frase da pessoa ou mostrar a pessoa (vídeo com o time, citação), marque `Precisa de aprovação de <nome> antes de usar`.
4. A ideia precisa passar no filtro do `CLAUDE.md`: mostrar que a Weach entende de mídia, de comportamento ou de performance, e não parecer agência genérica nem "5 dicas de tráfego".
5. Português do Brasil, frases curtas, **sem travessões** (use ponto, vírgula ou dois-pontos).
6. Nada de inventar dado. Se a ideia pedir um número, escreva `[dado a levantar com o time]`.

## 4. Saída

Antes de gravar, se já existir `conteudos/ideias.md` ou `conteudos/ideias.csv`, mova as versões antigas para `conteudos/arquivo/` com a data no nome (`ideias-AAAA-MM-DD.md`).

### `conteudos/ideias.md`
```
# Ideias de conteúdo | Rodada <n>
Gerado em <data> a partir de <arquivo.csv> · <x> respostas novas · <y> ideias

## Resumo
- tabela: formato | nº de ideias | depende de
- alertas (anonimizações e aprovações pendentes)

## <Formato> (<n> ideias)
### <Gancho>
- **Canal:** …
- **Ângulo:** …
- **Estrutura:** …
- **Depende de:** …
- **Origem:** <Nome> · <Função> · <ID> (uso interno)
- **Alertas:** …

(… um bloco por formato, na ordem da tabela de formatos, pulando os vazios)

## Respostas não aproveitadas
- <Nome> · <ID>: motivo
```

### `conteudos/ideias.csv`
UTF-8 com cabeçalho, separado por vírgula, com aspas em todos os campos:
`formato,canal,gancho,angulo,estrutura,depende_de,origem_nome,origem_funcao,id_pergunta,rodada,data_resposta,alertas,precisa_aprovacao`
(`precisa_aprovacao` = `sim` ou `não`; a `estrutura` vai em uma linha, com os itens separados por " / ")

## 5. No fim

Mostre no chat um resumo de 4 a 6 linhas: quantas ideias por formato, quantas dependem do Daniel, e os alertas. Lembre que, depois de usar uma ideia, o status da resposta na planilha deve mudar para `aproveitada`.
