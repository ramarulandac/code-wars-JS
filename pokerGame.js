'use strict'

/**
 
* High Card (Carta Más Alta): Para manos que no entran en ninguna de las manos superior, el ganador es aquel que tiene la carta más alta. Si se produce un empate entonces se compara la siguiente carta más alta y así sucesivamente. 

* Pair (Parejas): 2 de las 5 cartas de la mano tienen el mismo valor. Si las dos manos tienen pareja, entonces gana la que tenga la pareja más alta. Si ambas parejas son iguales entonces gana el que tenga la carta más alta. 

* Two Pairs (Dobles Parejas): La mano contiene 2 parejas diferentes. Si las dos manos tienen dobles parejas diferentes entonces gana aquella que tenga la pareja más alta. Si las dos manos tienen las mismas parejas entonces se compara la otra pareja. Si ambas manos tiene las mismas parejas entonces gana el que tenga la carta más alta restante. 

* Three of a Kind (Trio): 3 cartas de la mano tienen el mismo valor. Gana la mano que tiene las 3 cartas con mayor valor. 

* Straight (Escalera): La mano contiene 5 cartas consecutivas. Si las dos manos tienen escalera entonces gana la que tiene la carta más alta. 

* Flush (Color): La mano tiene 5 cartas con la misma cara. Si ambas manos tienen escalera entonces gana el que tenga la carta más alta. 

* Full House (Full): La mano tiene un trío y una pareja. En caso de tener ambas manos full entonces gana el que tenga el trío más alto. 

* Four of a Kind (Poker): 4 cartas con el mismo valor. En caso de tener ambas manos poker gana el que tenga el valor más alto.

* Straight flush (Escalera de Color): 5 cartas de la misma cara pero con valores consecutivos. En caso de tener escalera las dos manos entonces gana el que tenga el valor más alto.
 * 
 */

let Suit = {'S':'spades','H':'hearts','C':'clubs','D':'diamonds'}

// '':0  - 'Z':20 added to simplify Straight Play search by the expression (Heighest - lowest === 5)
let Value = {'':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'T':10,'J':11,'Q':12,'K':13,'A':14,'Z':20}


let Results = {
   /* 'Straight flush':
    'Four of a Kind':
    'Full House':
    'Flush':
    'Straight':
    'Three of a Kind':
    'Two Pairs':
    'Pair':
    'High Card':*/
}




class PokerGame {
    
    constructor() {

    }

}

class Player {

    constructor(name, mano) {
        this.name = name
        this.handCards = handCards
    }
}


class Plays {
        
        constructor(handCards){
            this.handCards = handCards
        }
        
        getPairs() {             // Get the type of pair: pair simple, double pair, three, poker, full house

            let pairsAux = {}   // collect posible pairs & Three kind
            let pairs = {}                           
            

            this.handCards.forEach(card => { //Classifies all cards by number

                let valueSuiteArray = card.split('') 
                let cardValue = valueSuiteArray[0]; 
               
                pairsAux.hasOwnProperty(cardValue)? pairsAux[cardValue]++ : pairsAux[cardValue] = 1  // Having that card value then ++1, otherwise.. creates the entry           
            });        

            for(let key in pairsAux){      // Creates the type of pair: pair simple, double pair, three, poker, full house based on pairs Classification

                if(pairsAux[key] == 2) {                                    //it's pair?

                    if(pairs['pair']) {                                 // Yes it is pair. is there been pair before?

                        if (pairs['pair'] < Value[key])                 //yup, which one is bigger?

                            pairs = {'double pair' : key}               // this one, then double pair - current key

                        else

                            pairs = {'double pair': pairs['pair']}      // the past one is bigger, then double pair - the prior key

                    } else {                                            //  nope, there isn't

                        pairs['pair'] = key                             //  .. then first pair
                    }                    

                } else if(pairsAux[key] == 3) {          // three

                    if (pairs['pair']) pairs = {'full house' : key}; // full house
                    else pairs['three'] = key

                } else if(pairsAux[key] == 4){          // poker

                    pairs['poker'] = key
                }
            }  

            return pairs        
        }

        
        getHighestCard(As) {                                    // Check for the highest value - if As param 'A', check if As might be 1 in Straight play                 

            let highestCard = ''                                 // '' Lowest value on Values dict

            this.handCards.forEach(card => {   

                let valueSuiteArray = card.split('')
                let cardValue = valueSuiteArray[0];

               if(As === 'A' && cardValue === As) cardValue = '1'; // check if the highest might be a 5 card for a traight play
                
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

            if(Value[highestCard] - Value[lowestCard] === 4) return {'straight':true,'value':highestCard} ;                                // normal Straight play                

            else if(Value[highestCard] === MAX && Value[this.getHighestCard('A')] === 5 )   return {'straight':true,'value':highestCard} ; // Straight play - As first Card

            return  {'straight':false,'value':null};
        }

        isFlush() {

            let suits = {}

            this.handCards.forEach(card => {   

                let valueSuiteArray = card.split('')
                let cardSuit = valueSuiteArray[1];

                suits.hasOwnProperty(valueSuiteArray[1])?suits[valueSuiteArray[1]]++ : suits[valueSuiteArray[1]]=1;
            })

            if (Object.keys(suits).length === 1) return {'flush':true, 'value':this.getHighestCard()}
            else return {'flush':false, 'value':null}
        }

        isStraightFlush() {

            let isFlush = this.isFlush()
            let isStraight = this.isStraight()

            return {'straightFlush':isFlush.flush && isStraight.straight, 'value':isStraight.value}
        }


}


let plays = new Plays(['2H','4S','4C','4D','2H'])
let plays1 = new Plays(['2H','3H','4H','5H','6H'])


console.log(plays1.getHighestCard())
console.log(plays1.getHighestCard('A'))
console.log(plays1.isStraight())
console.log(plays1.isFlush())
console.log(plays1.isStraightFlush())
console.log(plays.getPairs())