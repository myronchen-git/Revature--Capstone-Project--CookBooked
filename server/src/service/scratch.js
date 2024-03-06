const str1 = 'hel$o';
const str2 = 'hell@o';
const str3 = 'hello1';

const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

console.log(specialChars.test(str1));
console.log(specialChars.test(str2));
console.log(specialChars.test(str3));
