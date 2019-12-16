
/**************************************************************
 Romano | Árabe 
--------|-------
 I | 1 
 V | 5 
 X | 10 
 L | 50 
 C | 100 
 D | 500 
 M | 1000
 
 
### Reglas

Sólo se contemplan números entre el 1 y el 3999

* Los símbolos I, X, C y M se pueden repetir hasta tres veces.
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

### Ejercicios

* Crear una función para pasar de número romanos a árabes
* Crear una función para pasar de árabes a romanos
* Hacer un validador de números romanos **********************/



const romanNumberValidator = (romanNumbers) => {

    let romanDictionary = {

        'I':1,
        'V':5,
        'X':10,
        'L':50,
        'C':100,
        'D':500,
        'M':1000
    }

    let romanArrayNumber = romanNumbers.split('') 
   
    let valid; // expression valid?
    let repeat = 0; // repeating counter
    let i = 0;
    let token; 
    let tokenValue;
    let nextToken;
    let nextTokenValue;

    do {
        // prior token ever
        valid = false;
        token = romanArrayNumber[i];
        tokenValue = romanDictionary[token]   

        i++; // go ahead to next token

        nextToken = romanArrayNumber[i]
        nextTokenValue = romanDictionary[nextToken]      
        
        // Repeating rule
        if (nextToken === token && (token ==='I' || token === 'X' || token === 'C' || token === 'M') && repeat < 4){
            valid = true;
            repeat++ // repeating token just one more
        // Bigger values at right
        } else if (tokenValue > nextTokenValue && ((nextToken ==='I' || nextToken === 'X' || nextToken === 'C')||
                                                            (nextToken ==='V' || nextToken === 'L' || nextToken === 'D'))){
            valid = true;
        // Fewer Values at right    
        } else if (tokenValue < nextTokenValue && ((nextToken ==='V' && token === 'I') ||(nextToken ==='X' && token === 'I') ||
                                                            (nextToken ==='L' && token === 'X') ||(nextToken ==='C' && token === 'X')||
                                                            (nextToken ==='M' && token === 'C') ||(nextToken ==='D' && token === 'C'))){
            valid = true;
        }    

     // Out of tokens or valid false? get the hell out of here
     //otherwise stay    
    } while(i < romanArrayNumber.length -1 && valid == true) 
  
    return valid
}

console.log(romanNumberValidator('MV'))
console.log(romanNumberValidator('MMDCDLXIX'))
