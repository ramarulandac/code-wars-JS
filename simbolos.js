
const romanNumberValidator = romanNumber => { 
    
    let romanDictionary = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000 }
    let romanArrayNumber = romanNumber.split('') 
   
    let valid; // expression valid?
    let repeat = 0; // repeating counter
    let i = 0;
    let token; 
    let tokenValue;
    let nextToken;
    let nextTokenValue;

    do {
        valid = false; // everything is false til the opposite is truth
        token = romanArrayNumber[i];  // prior token ever
        tokenValue = romanDictionary[token]   
  
        if(tokenValue && romanArrayNumber.length === 1) return true;// just 1 token? easy peasy

        i++; // go ahead and catch the next token and its value
        nextToken = romanArrayNumber[i]
        nextTokenValue = romanDictionary[nextToken]      
        
        // Repeating rule
        if (nextToken === token && (token ==='I' || token === 'X' || token === 'C' || token === 'M') && repeat < 2){
            valid = true;
            repeat++ // repeating token please one more
        // Bigger values at right rule
        } else if (tokenValue > nextTokenValue && ((nextToken ==='I' || nextToken === 'X' || nextToken === 'C')||
                                                            (nextToken ==='V' || nextToken === 'L' || nextToken === 'D'))){
            valid = true;
        // Fewer Values at left rule   
        } else if (tokenValue < nextTokenValue && ((nextToken ==='V' && token === 'I') ||(nextToken ==='X' && token === 'I') ||
                                                   (nextToken ==='L' && token === 'X') ||(nextToken ==='C' && token === 'X')||
                                                   (nextToken ==='M' && token === 'C') ||(nextToken ==='D' && token === 'C'))){
            valid = true;
        }    

     // Out of tokens or valid false? get the hell out of here, otherwise stay    
    } while(i < romanArrayNumber.length-1 && valid == true) 
  
    return valid
}

console.log(romanNumberValidator('CM'));

// Arab to roman number
const arabToRomanNumber = number => {

    if (typeof number != 'number' || number <= 0 || number > 3999) console.log(`${number} No valid data type or integer value isn't between 1 - 3999 `);

    let base = [1000,100,10,1] // base to split decimal system numbers
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

const romanToArabNumber = romanNumber => {
    
    let romanDictionary = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000 }
    let romanArrayNumber = romanNumber.split('') 
    let i = 0;
    let token;
    let tokenValue;
    let number=0;

    if (romanNumberValidator(romanNumber)){

        do {
            token = romanArrayNumber[i]
            tokenValue = romanDictionary[token]
            nextToken = romanArrayNumber[i+1]
          
            if(romanDictionary[nextToken] > tokenValue && ((token === 'I' && (nextToken === 'V' || nextToken === 'X'))||
                                                           (token === 'X' && (nextToken === 'L' || nextToken === 'C'))||
                                                           (token === 'C' && (nextToken === 'D' || nextToken === 'M')) )){

               number += romanDictionary[nextToken] - tokenValue 
               i++
            } else {            
                number += tokenValue            
            }

            i++
            
        } while(i < romanArrayNumber.length)

        return number

    } else {
        console.log(`${romanNumber} It's not a valid Roman Number..`)
        return console.log(`Try a valid one`)
    }
}
