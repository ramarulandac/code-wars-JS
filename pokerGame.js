'use strict'

let Suit = {'S':'spades','H':'hearts','C':'clubs','D':'diamonds'}

// '':0  - 'Z':20 added to simplify Straight Play search by the expression (Heighest - lowest === 5)
let Value = {'':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'T':10,'J':11,'Q':12,'K':13,'A':14,'Z':20}


let Results = {
    
    'straightFlush': 20,
    'poker': 15,
    'fullhouse': 12,
    'flush': 10,
    'straight': 8,
    'three': 6,
    'double-pair': 4,
    'pair': 2,
    'highestcard': 1
}

class PokerGameApp {
    
    constructor(plays) {
        this.plays = plays;       
    }

    evaluateGame(){
       
        let bet;
        let betAux = 0;
        let betI;
        let betValue = 0;
        let betIAux = -1;
        let playAux;
        let win = 0;
        

        for(let i = 0; i < this.plays.length; i++) { 

            playAux =  this.plays[i]
            
            for (let key in playAux){
               
                    if(key === 'straightFlush' && playAux[key]){
                                           
                        bet = Results['straightFlush'];
                        betValue = playAux['value']
                        betI = i;
                        
                    } if(key === 'poker'){

                        bet = Results['poker'];
                        betValue = playAux['value']
                        betI = i;

                    } if(key === 'fullhouse'){
                        
                        bet = Results['fullhouse'];
                        betValue = playAux['value']
                        betI = i;

                    } if (key === 'flush' && playAux[key]){
                    
                        bet = Results['flush'];
                        betValue = playAux['value']
                        betI = i;
                        break;

                    } if (key === 'straight' && playAux[key]) {

                        bet = Results['straight'];
                        betValue = playAux['value']
                        betI = i;
                        break;

                    } if (key === 'three') {

                        bet = Results['three'];
                        betValue = playAux['value']
                        betI = i;

                    } if (key === 'double-pair') {

                        bet = Results['double-pair'];
                        betValue = playAux['value']
                        betI = i;

                    } if(key === 'pair') {

                        bet = Results['pair'];
                        betValue = playAux['value']
                        betI = i;

                    } if (key === 'highestcard') {

                        bet = Results['highestcard'];
                        betValue = playAux['value']
                        betI = i;
                    }

                    break;                   
                }

              if(betAux < bet) {

                betIAux = betI
                betAux  = bet
                win = 1                

              } else if (betAux === bet) {                 
                
                win = 0
                
              } if (this.plays[0].value > this.plays[1].value){
                  
                betIAux = 0;
                win = 1

              } else if (this.plays[0].value < this.plays[1].value){

                betIAux = 1
                win = 1
              }
        }      
           
          if(win === 1) return { 'player':'winner player ' + (parseInt(betIAux) + 1) , 'handCards':this.plays[betIAux]}
          else return {'deuce': 'deuce'}
    }    

    playGame(){   //
       return this.plays;
    }
}

class Player {

    constructor(name, handCards) {
        this.name = name
        this.handCards = handCards
    }

    getHandCards(){
        return this.handCards
    }

    getName(){
        return this.name
    }

    postPlay(){

        let plays = new Plays(this.handCards)

        let bet = plays.isStraightFlush()
        if(bet.straightFlush) return bet;

        let betPair = plays.getPairs()
        if(betPair.poker) return betPair;

        betPair = plays.getPairs()
        if(betPair.fullhouse) return betPair;

        bet = plays.isFlush()
        if(bet.flush) return bet;

        bet = plays.isStraight()
        if(bet.straight) return bet;  
        
        betPair = plays.getPairs()
        if(betPair.three) return betPair;

        betPair = plays.getPairs()
        if(betPair.double-pair) return betPair;

        betPair = plays.getPairs()
        if(betPair.pair) return betPair;

        bet = plays.highestCard()
        if(bet) return {'highestcard':bet}; 
    }
}


class Plays {
        
        constructor(handCards){
            this.handCards = handCards
        }
        
        getPairs() {             // Get the type of pair: pair simple, double pair, three, poker, full house

            let pairsAux = {}   // collect posible types of pairs
            let pairs = {};      // type of pair                      
            

            this.handCards.forEach(card => { //Classifies all cards by number

                let valueSuiteArray = card.split('') 
                let cardValue = valueSuiteArray[0]; 
               
                pairsAux.hasOwnProperty(cardValue)? pairsAux[cardValue]++ : pairsAux[cardValue] = 1  // Having that card value, then ++1, otherwise.. creates the entry           
            });        

            for(let key in pairsAux){      // Creates the type of pair: pair simple, double pair, three, poker, full house based on pairs Classification

                if(pairsAux[key] == 2) {                                //it's pair?

                    if(pairs['pair']) {                                 // Yes it is pair. is there been pair before?

                        if (pairs['pair'] < Value[key])                 //yup, which one is bigger?

                            pairs = {'double-pair':true,'value': key}               // this one, then double pair - current key

                        else

                            pairs = {'double-pair':true, 'value':pairs['pair']}      // the past one is bigger, then double pair - the prior key

                    } else {                                            //  nope, there isn't

                        pairs = {'pair':true,'value':key }                            //  .. then first pair
                    }                    

                } else if(pairsAux[key] == 3) {          // three

                    if (pairs['pair']) pairs = {'fullhouse':true, 'value':key }; // full house
                    else pairs = {'three':true, 'value':key } 

                } else if(pairsAux[key] == 4){          // poker

                    pairs = {'poker':true, 'value':key}
                }
            }  

            return pairs        
        }
        
        getHighestCard(As) {                                    // Check for the highest value - if As param 'A', check if As might be 1 in Straight play                 

            let highestCard = ''                                 // '' Lowest value on Values dict

            this.handCards.forEach(card => {   

                let valueSuiteArray = card.split('')
                let cardValue = valueSuiteArray[0];

               if(As === 'A' && cardValue === As) cardValue = '1'; // check if the highest might be a 5 card for a Straight play
                
               if(Value[highestCard] < Value[cardValue]) highestCard = cardValue;
            })

            return highestCard;
        }

        getLowestCard(){

            let lowestCard = 'Z'                                   // 'Z' Highest value on Values dict
            this.handCards.forEach(card => {   

                let valueSuiteArray = card.split('')
                let cardValue = valueSuiteArray[0]; 

                if (Value[lowestCard] > Value[cardValue]) lowestCard = cardValue;            
            })

            return lowestCard
        }

        isStraight() {

            const MAX = 14

            let highestCard = this.getHighestCard()
            let lowestCard =  this.getLowestCard()

            if(Value[highestCard] - Value[lowestCard] === 4) return {'straight':true,'value':highestCard} ; // normal Straight play

              // Straight play contains Ace as first Card
            else if(Value[highestCard] === MAX && Value[this.getHighestCard('A')] === 5 )   return {'straight':true,'value':highestCard} ; 

            return  {'straight':false,'value':null};
        }

        isFlush() {

            let suits = {} // collect types of suits

            this.handCards.forEach(card => {   

                let valueSuiteArray = card.split('')
                let cardSuit = valueSuiteArray[1];

                suits.hasOwnProperty(valueSuiteArray[1])?suits[valueSuiteArray[1]]++ : suits[valueSuiteArray[1]]=1;
            })

            if (Object.keys(suits).length === 1) return {'flush':true, 'value':this.getHighestCard()} // tell me, whether there's just one or not.
            else return {'flush':false, 'value':null}
        }

        isStraightFlush() {

            let isFlush = this.isFlush()
            let isStraight = this.isStraight()

            return {'straightFlush':isFlush.flush && isStraight.straight, 'value':isStraight.value}
        }
}


function  main(){

    let player1 = new Player('carlos',['2H','4S','4C','4D','2H'])
    let player2 = new Player('luis',['2H','3H','4H','5H','6H'])
        
    let plays = [player1.postPlay(),player2.postPlay()];
    
    let game = new PokerGameApp(plays)
    let  result = game.evaluateGame();


    if(result.player){
        console.log(`${result.player}`)
        console.log(result.handCards) 
    } 
    else console.log(result.deuce)
}

// Run the business

main()
