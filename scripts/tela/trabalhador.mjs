// Worker da geração de telas (scripts/tela/integracao.mjs): recebe uma tarefa, executa, avisa.
import { parentPort } from 'node:worker_threads';
import { executar } from './integracao.mjs';

parentPort.on('message', async (t) => {
  try {
    await executar(t);
    parentPort.postMessage({ ok: true });
  } catch (e) {
    parentPort.postMessage({ erro: String(e?.stack ?? e) });
  }
});
