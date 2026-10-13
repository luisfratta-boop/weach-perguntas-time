# Como colocar no ar

São duas partes: a planilha, que recebe as respostas, e a página, que vai para o Vercel pelo GitHub.

## Parte 1. Planilha + Apps Script (uns 5 minutos)

1. Crie uma planilha nova no Google Sheets, por exemplo "Weach | Perguntas do time".
2. Abra **Extensões > Apps Script**. Apague o que estiver no editor, cole todo o conteúdo de `apps-script.gs` e salve com Ctrl+S.
3. No topo do editor, escolha a função **configurar** e clique em **Executar**. O Google vai pedir autorização: escolha sua conta, clique em **Avançado > Acessar (não seguro)** e depois em **Permitir**. As abas **Respostas** e **Painel** aparecem na planilha.
4. Clique em **Implantar > Nova implantação**. Na engrenagem, escolha **App da Web** e configure:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   
   Clique em **Implantar** e copie a URL, que termina em `/exec`.
5. Teste a URL abrindo ela no navegador. Ela deve mostrar `{"ok":true,"status":"no ar"}`.
6. Abra `index.html`, procure `const SCRIPT_URL = "";` (fica perto do início do `<script>`), cole a URL entre as aspas e salve.

> Se você alterar o script depois, use **Implantar > Gerenciar implantações > editar (lápis) > Versão: Nova versão**. Assim a URL continua a mesma. Se fizer uma "Nova implantação", a URL muda e você precisa colar a nova na página.

No dia a dia, mude a coluna **Status** de cada resposta para `aproveitada` ou `descartada`. O **Painel** atualiza sozinho. Para ver outra rodada, troque o número na célula B3 do Painel.

## Parte 2. GitHub + Vercel (uns 5 minutos, só na primeira vez)

1. No GitHub, crie um repositório **privado** e **vazio**, sem README, por exemplo `weach-perguntas-time`. Me passe a URL e eu faço o primeiro envio. Se preferir fazer você mesmo, rode na pasta do projeto:
   ```
   git remote add origin https://github.com/SEU-USUARIO/weach-perguntas-time.git
   git push -u origin main
   ```
2. No Vercel, clique em **Add New > Project**, importe o repositório e mantenha tudo no padrão. Não tem build: Framework Preset = **Other**. Clique em **Deploy**.
3. O link fica no formato `weach-perguntas-time.vercel.app`. É ele que vai no WhatsApp e no e-mail.

A partir daí, todo `git push` publica a versão nova sozinho em cerca de 30 segundos. Isso vale para uma rodada nova no `perguntas.json` e para uma troca de texto.

O que vai para o ar: só `index.html`, `assets/` e `data/`. O arquivo `.vercelignore` deixa de fora fontes, respostas, conteúdos e o script. O `.gitignore` mantém respostas reais e ideias geradas fora do GitHub.

## Nova rodada

1. Em `data/perguntas.json`, mude `rodada_atual` (por exemplo, para 2).
2. Troque `"ativa": "sim"`/`"não"` nas perguntas. Deixe só **uma** pergunta de "Todas as funções" ativa.
3. Atualize o campo `rodada` das perguntas que entram agora.
4. Faça `git commit` e `git push`. O link continua o mesmo.

Regra da página: para cada função, ela mostra no máximo `max_por_funcao` perguntas (5). As perguntas "da casa" vêm primeiro, ou seja, aquelas em que a função aparece como **primeira** da lista `funcoes`. Depois vêm as compartilhadas. No fim entra a pergunta ativa de "Todas as funções".
