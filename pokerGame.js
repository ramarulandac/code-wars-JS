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
let Value = {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'T':10,'J':11,'Q':12,'K':13,'A':14}

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




class pokerGame {
    
    constructor() {

    }   

   



}

class player {

    constructor(name, mano) {
        this.name = name
        this.handCards = handCards
    }
    




}


class Plays {
    
    constructor(handCards){
        this.handCards = handCards
    }
    
    getPairsThreeOfKind() {

        let pairsThreeOfKindAux = {}
        let pairsThreeOfKind = {}

        this.handCards.forEach(card => {

            let valueSuiteArray = card.split('') 
            let cardValue = valueSuiteArray[0]; 
             console.log(cardValue)
            pairsThreeOfKind.hasOwnProperty(cardValue)? pairsThreeOfKind[cardValue]++:pairsThreeOfKind[cardValue] = 1            

        });


        for(let key in pairsThreeOfKind){
            if(pairsThreeOfKind[key]>1) pairsThreeOfKindAux[key] = pairsThreeOfKind[key];
        }        

        return pairsThreeOfKindAux        
    }
  
    getHighestCard() {

        let highestCard = ''

        this.handCards.forEach(card => {   

            let valueSuiteArray = card.split('')
            let cardValue = valueSuiteArray[0]; 

            (highestCard < Value[cardValue])? highestCard = cardValue: null;
        })

        return highestCard;
    }



    getResult() {



    }
}


let plays = new Plays(['2H','4S','4C','2D','4H'])


console.log(plays.getPairsThreeOfKind())
console.log(plays.getHighestCard())