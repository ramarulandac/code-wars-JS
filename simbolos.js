
// Roman number validator

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

     // Out of tokens or valid false? get the hell out of here, otherwise stay    
    } while(i < romanArrayNumber.length -1 && valid == true) 
  
    return valid
}

// Arab to roman number
function arabToRomanNumber(number) {

    if (typeof number != 'number' && number <= 0 || number >= 3999) throw Error(`${number} data type or integer value is between the range from 1 - 3999 `);

    let base = [1000,100,10,1] // base to split the numbers
    let Thousands = {0:'',1:'M',2:'MM',3:'MMM'}
    let Hundreds = {0:'', 1:'C', 2:'CC', 3:'CCC', 4:'CD', 5:'D', 6:'DC', 7:'DCC', 8:'DCCC', 9:'CM' }
    let Tens = {0:'', 1:'X',2:'XX',3:'XXX', 4:'XL', 5:'L', 6:'LX', 7:'LXX', 8:'LXXX', 9:'XC'}
    let Units = {0:'', 1:'I', 2:'II', 3:'III', 4:'IV', 5:'V', 6:'VI', 7:'VII', 8:'VIII', 9:'IX'}

    let romanNumberArrayIndex = [] //Index to build the roman number searching on the dicts.
    let numberAux = number    
    
    base.forEach(x => { romanNumberArrayIndex.push(Math.trunc(numberAux/x)); // Splitting  decimal system numbers   
                        numberAux =  Math.trunc(numberAux%x)})    

    return Thousands[romanNumberArrayIndex[0]] + Hundreds[romanNumberArrayIndex[1]] + Tens[romanNumberArrayIndex[2]] + Units[romanNumberArrayIndex[3]]

}

console.log(arabToRomanNumber(3004))