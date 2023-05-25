function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

//1 - pedra
//2 - papel
//3 - tesoura

const pcChoice = getRndInteger(1, 3);
const userChoice = process.argv[2];

if(pcChoice == 1){
    if(userChoice.toLowerCase() === 'pedra'){
        console.log(`Você escolheu pedra e o computador escolheu pedra. Empate!`)
    }else if(userChoice.toLowerCase() === 'papel'){
        console.log(`Você escolheu papel e o computador escolheu pedra. Você ganhou!`)
    }else{
        console.log(`Você escolheu tesoura e o computador escolheu pedra. Você perdeu!`)
    }
}else if(pcChoice == 2){
    if(userChoice.toLowerCase() === 'pedra'){
        console.log(`Você escolheu pedra e o computador escolheu papel. Você perdeu!`)
    }else if(userChoice.toLowerCase() === 'papel'){
        console.log(`Você escolheu papel e o computador escolheu papel. Empate!`)
    }else{
        console.log(`Você escolheu tesoura e o computador escolheu papel. Você ganhou!`)
    }
}else if(pcChoice == 3){
    if(userChoice.toLowerCase() === 'pedra'){
        console.log(`Você escolheu pedra e o computador escolheu tesoura. Você ganhou!`)
    }else if(userChoice.toLowerCase() === 'papel'){
        console.log(`Você escolheu papel e o computador escolheu tesoura. Você perdeu!`)
    }else{
        console.log(`Você escolheu tesoura e o computador escolheu tesoura. Empate!`)
    }
}