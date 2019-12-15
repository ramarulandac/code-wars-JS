
const fooBarQuix = (number) => {
     
    // character & number value errors
    if(!(typeof number === 'number' && number >= 0 && number <= 100)){
        throw Error(`Value isn't number data type or it's not value between 0 to 100..`)    
    }

    let divisors = [3,5,7]
    let fooBarQuix = ['Foo','Bar','Quix']

    let result = [] // array result from the hasNumbers function
    let response = '' // response from fooBarQuix function

    const isDivisible = (value, base) => {  //
        return value%base === 0
    }

    const hasNumbers = (value, numbers) => {  // returns a string withwords according to fooBarQuix digits correspondence. Value -> number, numbers -> divisors
        
        let ten = Math.trunc(value/10)
        let unit = value%10

        numbers.forEach((x,y) => (x === ten)? result.push(fooBarQuix[y]):null)
        numbers.forEach((x,y) => (x === unit)? result.push(fooBarQuix[y]):null)

        // return empty string if empty otherwise a string
        if (result.length > 0) {
            return result.reduce((x,y) => x + y)
        } else return ''        
    }    

    // has the value divisors
    divisors.forEach((x,y) => {
        (isDivisible(number,x))? response += fooBarQuix[y]:null;       
    })

    // has the value digits according to fooBarQuix digits correspondence
    response += hasNumbers(number,divisors)

    return response;
}


console.log(fooBarQuix(21))