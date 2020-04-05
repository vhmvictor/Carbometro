module.exports = function getParams(glicemia, carbTotal, bolusRefeicao, fc, glicemiaAlvo) {

    const glucose = glicemia;
    const cTotal = carbTotal;
    const bRefeicao = bolusRefeicao;
    const ftC = fc;
    const gAlvo = glicemiaAlvo;

    if(!glucose){
        const bolusTotal = (cTotal / bRefeicao)
        return bolusTotal
    }

    const bolusAlimento = (cTotal / bRefeicao);

    const correcao = ((glucose - gAlvo) / ftC);

    const bolusTotal = (bolusAlimento + correcao);

    console.log('Glicemia:  ' + glicemia)
    console.log('Fato de correção:  ' + fc)
    console.log('Glicemia alvo:  ' + glicemiaAlvo)
    console.log('Correção: ' + correcao)
    console.log('Bolus do alimento:  ' + bolusAlimento)
    console.log('Bolus total da refeição:  ' + bolusTotal)

    console.log('carbTotal:  ' + carbTotal);

    return bolusTotal;
}