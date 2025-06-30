// Teste da funcionalidade de recorrência
// Este arquivo testa se a lógica de recorrência anual e mensal está funcionando

// Simulação da função gerarRecorrenciasVirtuais do useDespesas.js
function gerarRecorrenciasVirtuais(listaDespesas) {
   const novasDespesas = [...listaDespesas];
   const hoje = new Date();
   const limiteMeses = 12; // até 12 meses à frente
   const limiteAnos = 5; // até 5 anos à frente

   listaDespesas.forEach((despesa) => {
      if (despesa.tipo === 'recorrente' && despesa.recorrencia && despesa.data) {
         const dataOriginal = new Date(despesa.data);
         if (despesa.recorrencia === 'mensal') {
            for (let i = 1; i <= limiteMeses; i++) {
               const dataNova = new Date(dataOriginal);
               dataNova.setMonth(dataNova.getMonth() + i);
               // Só gera se for no futuro
               if (dataNova > hoje) {
                  novasDespesas.push({
                     ...despesa,
                     key: `${despesa.key}_recorrente_mensal_${i}`,
                     data: dataNova.toISOString(),
                     recorrenciaVirtual: true,
                  });
               }
            }
         } else if (despesa.recorrencia === 'anual') {
            for (let i = 1; i <= limiteAnos; i++) {
               const dataNova = new Date(dataOriginal);
               dataNova.setFullYear(dataNova.getFullYear() + i);
               if (dataNova > hoje) {
                  novasDespesas.push({
                     ...despesa,
                     key: `${despesa.key}_recorrente_anual_${i}`,
                     data: dataNova.toISOString(),
                     recorrenciaVirtual: true,
                  });
               }
            }
         }
      }
   });
   return novasDespesas;
}

// Dados de teste com datas mais recentes
const hoje = new Date();
const proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 15);
const proximoAno = new Date(hoje.getFullYear() + 1, hoje.getMonth(), 20);

const despesaRecorrenteMensal = {
   key: 'teste_mensal_1',
   titulo: 'Teste Recorrência Mensal',
   valor: 100,
   tipo: 'recorrente',
   recorrencia: 'mensal',
   data: proximoMes.toISOString(), // Próximo mês
   status: 'pendente',
};

const despesaRecorrenteAnual = {
   key: 'teste_anual_1',
   titulo: 'Teste Recorrência Anual',
   valor: 500,
   tipo: 'recorrente',
   recorrencia: 'anual',
   data: proximoAno.toISOString(), // Próximo ano
   status: 'pendente',
};

const despesaUnica = {
   key: 'teste_unico_1',
   titulo: 'Teste Despesa Única',
   valor: 50,
   tipo: 'unico',
   data: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 5).toISOString(), // 5 dias à frente
   status: 'pendente',
};

// Lista de despesas para teste
const listaDespesas = [despesaRecorrenteMensal, despesaRecorrenteAnual, despesaUnica];

// Executar teste
console.log('=== TESTE DE RECORRÊNCIA ===');
console.log('Data atual:', hoje.toLocaleDateString('pt-BR'));
console.log('');

console.log('Despesas originais:', listaDespesas.length);
listaDespesas.forEach((despesa) => {
   console.log(
      `- ${despesa.titulo} (${despesa.tipo}) - ${new Date(despesa.data).toLocaleDateString('pt-BR')}`,
   );
});

console.log('');
console.log('Gerando recorrências virtuais...');
const despesasComRecorrencias = gerarRecorrenciasVirtuais(listaDespesas);

console.log('');
console.log('Total de despesas após gerar recorrências:', despesasComRecorrencias.length);

// Filtrar apenas as recorrências virtuais
const recorrenciasVirtuais = despesasComRecorrencias.filter((despesa) => despesa.recorrenciaVirtual);

console.log('');
console.log('Recorrências virtuais geradas:', recorrenciasVirtuais.length);

// Agrupar por tipo de recorrência
const recorrenciasMensais = recorrenciasVirtuais.filter((despesa) =>
   despesa.key.includes('_recorrente_mensal_'),
);

const recorrenciasAnuais = recorrenciasVirtuais.filter((despesa) =>
   despesa.key.includes('_recorrente_anual_'),
);

console.log('');
console.log('Recorrências mensais geradas:', recorrenciasMensais.length);
recorrenciasMensais.slice(0, 5).forEach((despesa) => {
   console.log(`- ${despesa.titulo} - ${new Date(despesa.data).toLocaleDateString('pt-BR')}`);
});

console.log('');
console.log('Recorrências anuais geradas:', recorrenciasAnuais.length);
recorrenciasAnuais.slice(0, 3).forEach((despesa) => {
   console.log(`- ${despesa.titulo} - ${new Date(despesa.data).toLocaleDateString('pt-BR')}`);
});

// Verificar se as datas estão corretas
console.log('');
console.log('=== VERIFICAÇÃO DE DATAS ===');

// Verificar recorrência mensal
const dataOriginalMensal = new Date(despesaRecorrenteMensal.data);
console.log('Data original mensal:', dataOriginalMensal.toLocaleDateString('pt-BR'));

recorrenciasMensais.slice(0, 3).forEach((despesa, index) => {
   const dataRecorrencia = new Date(despesa.data);
   const mesEsperado = dataOriginalMensal.getMonth() + index + 1;
   const anoEsperado =
      dataOriginalMensal.getFullYear() + Math.floor((dataOriginalMensal.getMonth() + index + 1) / 12);
   const mesReal = dataRecorrencia.getMonth();
   const anoReal = dataRecorrencia.getFullYear();

   console.log(
      `Mensal ${index + 1}: ${dataRecorrencia.toLocaleDateString(
         'pt-BR',
      )} (Esperado: ${mesEsperado}/${anoEsperado}, Real: ${mesReal}/${anoReal})`,
   );
});

// Verificar recorrência anual
const dataOriginalAnual = new Date(despesaRecorrenteAnual.data);
console.log('');
console.log('Data original anual:', dataOriginalAnual.toLocaleDateString('pt-BR'));

recorrenciasAnuais.slice(0, 3).forEach((despesa, index) => {
   const dataRecorrencia = new Date(despesa.data);
   const anoEsperado = dataOriginalAnual.getFullYear() + index + 1;
   const anoReal = dataRecorrencia.getFullYear();

   console.log(
      `Anual ${index + 1}: ${dataRecorrencia.toLocaleDateString(
         'pt-BR',
      )} (Esperado: ${anoEsperado}, Real: ${anoReal})`,
   );
});

console.log('');
console.log('=== FIM DO TESTE ===');
