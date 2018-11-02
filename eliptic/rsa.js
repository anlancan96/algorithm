function gcd(a, b) {
    if(a < b) {
        return gcd(b, a)
    }
    if(a % b == 0) {
        return b
    }
    return gcd(b, a%b)
} // greatest common divisor

// utility function to find pow(x, y) 
// under given modulo mod 

function pow(x, y, mod) {
    if (y == 0) 
            return 1; 
    let temp = pow(x, parseInt(y / 2), mod) % mod; 
    temp = (temp * temp) % mod; 
    if (y % 2 == 1) 
        temp = (temp * x) % mod; 
    return temp; 
}

function isCarmichaelNumber(n) 
{ 
    for (let b = 2; b < n; b++) { 
        // If "b" is relatively prime to n 
        if (gcd(b, n) == 1) 

            // And pow(b, n-1)%n is not 1, 
            // return false. 
            if (pow(b, n - 1, n) != 1) 
                return 0; 
    } 
    return 1; 
}

function lcm(a, b) {
    let temp = (a > b) ? a : b;
    while(true) {
        if(temp % a == 0 && temp % b == 0) {
            break;
        }
        temp ++;
    }
    return temp;
} // least common multiple


//example

function main() {
    let p = 5, q = 7 // prime number
    let n = p * q;
    let carmichalNumber = lcm(p - 1, q - 1); // is λ(n)
    let e = 2;
   
    while (e <= carmichalNumber) {
        if(gcd(e, carmichalNumber) == 1) {
            break;
        }
        e++;
    }
    let d = 1; //private key
   
    while (true) {
        if((d * e - 1) % carmichalNumber == 0) {
            break;
        }
        d++;
    }
    
    let m = 32;
    // encrypt message 
    let c = Math.pow(m, e) % n;
    console.log('encrypt', c)
    // decrypt message
    m = Math.pow(c, d) % n;
    console.log('message', m);
}
main()
