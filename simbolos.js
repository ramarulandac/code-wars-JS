
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

let romanN = {

    'I':1,
    'V':5,
    'X':10,
    'L':50,
    'C':100,
    'D':500,
    'M':1000
}

const RomanValidator = (number) => {
    
    let numberArray = number.split('') 
   
    let flag;
    let repeat = 0;
    let i = 0;

    do {
       
        flag = false;

        let romanNumber = numberArray[i];
        let romanNumberValue = romanN[romanNumber]   

        i++;

        romanNumber1 = numberArray[i]
        romanNumberValue1 = romanN[romanNumber1]      

        console.log()
        
        
        if (romanNumber1 === romanNumber && (romanNumber ==='I' || romanNumber === 'X' || romanNumber === 'C' || romanNumber === 'M') && repeat < 4){
            flag = true;
            repeat++
        } else if (romanNumberValue > romanNumberValue1 && ((romanNumber1 ==='I' || romanNumber1 === 'X' || romanNumber1 === 'C') ||
                                                            (romanNumber1 ==='V' || romanNumber1 === 'L' || romanNumber1 === 'D'))){
            flag = true;
        } else if (romanNumberValue < romanNumberValue1 && ((romanNumber1 ==='V' && romanNumber === 'I') ||(romanNumber1 ==='X' && romanNumber === 'I') ||
                                                            (romanNumber1 ==='L' && romanNumber === 'X') ||(romanNumber1 ==='C' && romanNumber === 'X')||
                                                            (romanNumber1 ==='M' && romanNumber === 'C') ||(romanNumber1 ==='D' && romanNumber === 'C'))){
            flag = true;
        }
    

    } while(i < numberArray.length -1 && flag == true)
  
    return flag

}

function numbersRomanArab(number){
    

}

console.log(RomanValidator('MMDCDLXIX'))
