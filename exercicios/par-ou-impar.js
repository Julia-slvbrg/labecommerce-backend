function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
  
const numPc = getRndInteger(1, 10)
const choiceParam = process.argv[2]
const numUser = process.argv[3]


const game = (numPc + Number(numUser)) % 2

console.log({game}, {numPc})

if(game == 0 && choiceParam.toLowerCase() === 'par'){
    console.log(`Você escolheu par e o computador escolheu ímpar. O resultado foi ${Number(numPc) + Number(numUser)}. Você ganhou!`)
}else if(game != 0 && choiceParam.toLowerCase() === 'par'){
    console.log(`Você escolheu par e o computador escolheu ímpar. O resultado foi ${numPc + Number(numUser)}. Você perdeu!`)
}else if(game == 0 && choiceParam.toLowerCase() === 'impar'){
    console.log(`Você escolheu ímpar e o computador escolheu par. O resultado foi ${numPc + Number(numUser)}. Você perdeu!`)
}else if(game != 0 && choiceParam.toLowerCase() === 'impar'){
    console.log(`Você escolheu ímpar e o computador escolheu par. O resultado foi ${numPc + Number(numUser)}. Você ganhou!`)
} 

