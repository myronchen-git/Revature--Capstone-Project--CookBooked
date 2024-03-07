const validChars = 'abcdefghijklmnopqrstuvwxyz1234567890-_'

let str1 = 'hello123'
let str2 = 'hello%^123'
let str3 = 'te$t_u$rn@me'

let containsSpecialCharacters = false;
for (char of str3) {
    console.log(char);
    if (!validChars.includes(char)) {
        containsSpecialCharacters = true
        break;
    }
}

console.log(containsSpecialCharacters);
