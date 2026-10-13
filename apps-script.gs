/**
 * Weach | Perguntas do time
 * Recebe as respostas da página e grava na aba "Respostas".
 * Na primeira execução cria as abas "Respostas" e "Painel".
 *
 * Como publicar: veja PUBLICAR.md (passo 1 a 6).
 */

const ABA_RESPOSTAS = 'Respostas';
const ABA_PAINEL = 'Painel';
const CABECALHO = ['Data e hora', 'Rodada', 'Nome', 'Função', 'ID da pergunta', 'Pergunta', 'Formatos', 'Resposta', 'Status'];
const STATUS = ['nova', 'aproveitada', 'descartada'];
const FUNCOES = ['Liderança', 'Comercial', 'Atendimento', 'Planejamento de mídia', 'Operação de mídia'];

function doPost(e) {
  const trava = LockService.getScriptLock();
  try {
    trava.waitLock(20000);
    const dados = JSON.parse(e.postData.contents);
    if (!dados.nome || !dados.funcao || !Array.isArray(dados.respostas) || !dados.respostas.length) {
      return resposta_({ ok: false, erro: 'Dados incompletos' });
    }
    const aba = prepararPlanilha_().getSheetByName(ABA_RESPOSTAS);
    const agora = new Date();
    const linhas = dados.respostas.map(function (r) {
      return [agora, Number(dados.rodada) || 1, limpar_(dados.nome), limpar_(dados.funcao),
        limpar_(r.id), limpar_(r.pergunta), limpar_(r.formatos), limpar_(r.resposta), 'nova'];
    });
    aba.getRange(aba.getLastRow() + 1, 1, linhas.length, CABECALHO.length).setValues(linhas);
    return resposta_({ ok: true, gravadas: linhas.length });
  } catch (err) {
    return resposta_({ ok: false, erro: String(err) });
  } finally {
    trava.releaseLock();
  }
}

// Permite testar a URL no navegador: deve mostrar {"ok":true,"status":"no ar"}
function doGet() {
  return resposta_({ ok: true, status: 'no ar' });
}

// Rode esta função uma vez pelo editor para criar as abas antes do primeiro envio.
function configurar() {
  prepararPlanilha_();
}

function prepararPlanilha_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA_RESPOSTAS);
  if (!aba) {
    aba = planilha.insertSheet(ABA_RESPOSTAS, 0);
    aba.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO])
      .setFontWeight('bold').setBackground('#021B51').setFontColor('#FFFFFF');
    aba.setFrozenRows(1);
    aba.setColumnWidth(6, 320);
    aba.setColumnWidth(8, 480);
    aba.getRange('A2:A').setNumberFormat('dd/MM/yyyy HH:mm');
    aba.getRange('F2:H').setWrap(true);
    const regra = SpreadsheetApp.newDataValidation().requireValueInList(STATUS, true).setAllowInvalid(false).build();
    aba.getRange('I2:I').setDataValidation(regra);
  }
  if (!planilha.getSheetByName(ABA_PAINEL)) criarPainel_(planilha);
  return planilha;
}

function criarPainel_(planilha) {
  const p = planilha.insertSheet(ABA_PAINEL);
  const R = "'" + ABA_RESPOSTAS + "'!";
  p.getRange('A1').setValue('Painel das respostas').setFontSize(14).setFontWeight('bold');
  p.getRange('A3').setValue('Rodada');
  p.getRange('B3').setValue(1).setBackground('#FFF4CC');
  p.getRange('C3').setValue('mude este número para ver outra rodada').setFontColor('#888888');

  p.getRange('A5:C5').setValues([['Função', 'Pessoas que responderam', 'Respostas']]).setFontWeight('bold');
  FUNCOES.forEach(function (f, i) {
    const l = 6 + i;
    p.getRange(l, 1).setValue(f);
    p.getRange(l, 2).setFormula('=IFERROR(COUNTUNIQUE(FILTER(' + R + 'C2:C, ' + R + 'D2:D=A' + l + ', ' + R + 'B2:B=$B$3)), 0)');
    p.getRange(l, 3).setFormula('=COUNTIFS(' + R + 'D2:D, A' + l + ', ' + R + 'B2:B, $B$3)');
  });
  const tot = 6 + FUNCOES.length;
  p.getRange(tot, 1).setValue('Total').setFontWeight('bold');
  p.getRange(tot, 2).setFormula('=SUM(B6:B' + (tot - 1) + ')').setFontWeight('bold');
  p.getRange(tot, 3).setFormula('=SUM(C6:C' + (tot - 1) + ')').setFontWeight('bold');

  const s = tot + 2;
  p.getRange(s, 1, 1, 3).setValues([['Status', 'Nesta rodada', 'Todas as rodadas']]).setFontWeight('bold');
  STATUS.forEach(function (st, i) {
    const l = s + 1 + i;
    const rotulo = st === 'nova' ? 'nova (a aproveitar)' : st === 'aproveitada' ? 'aproveitada (virou conteúdo)' : 'descartada';
    p.getRange(l, 1).setValue(rotulo);
    p.getRange(l, 2).setFormula('=COUNTIFS(' + R + 'I2:I, "' + st + '", ' + R + 'B2:B, $B$3)');
    p.getRange(l, 3).setFormula('=COUNTIF(' + R + 'I2:I, "' + st + '")');
  });
  p.setColumnWidth(1, 240);
  p.setColumnWidth(2, 200);
  p.setColumnWidth(3, 170);
}

function limpar_(v) {
  // Evita que um texto começando com "=" vire fórmula na planilha
  const s = String(v == null ? '' : v).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function resposta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
