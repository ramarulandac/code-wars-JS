
const fooBarQuix = (number) => {
     
    // character & number value errors
    if(!(typeof number === 'number' && number >= 0 && number <= 100)){
     console.log(`Value ${number} isn't number data type or it's not value between 0 to 100..`)    
    }

    let divisors = [3,5,7]
    let fooBarQuix = ['Foo','Bar','Quix']

    let result = [] //  Result from the hasNumbers function
    let response = '' // response from fooBarQuix function

    const isDivisible = (value, base) => {  // Tell me how natural numbers relates to each other on a div operation here
        return value%base === 0
    }

    const hasNumbers = (value, numbers) => {  // Just look for the wiwii numbers and their correspondence words for foo-Bar-Quix 
        
        let ten = Math.trunc(value/10)
        let unit = value%10

        numbers.forEach((x,y) => (x === ten)? result.push(fooBarQuix[y]):null)
        numbers.forEach((x,y) => (x === unit)? result.push(fooBarQuix[y]):null)

        // Nothing to play with? -> empty string
        if (result.length > 0) {
            return result.reduce((x,y) => x + y)
        } else return ''        
    }    

    // has the value divisors
    divisors.forEach((x,y) => {
        (isDivisible(number,x))? response += fooBarQuix[y]:null;       
    })

    // has the value digits according to fooBarQuix wiwii digits correspondence?
    response += hasNumbers(number,divisors)

    return response;
}


console.log(fooBarQuix(21))