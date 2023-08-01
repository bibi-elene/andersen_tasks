/* 1) 
С помощью встроенной браузерной функции prompt поочерёдно ввести два значения. 
Если оба значения являются валидными числами, 
то вывести в консоли результат в виде первого числа в системе счисления второго.
Если хотя бы одно из введённых значений является некорректным числом, 
вывести в консоли сообщение: "Некорректный ввод!" и завершить программу.

> Примеры:
Вводим 10 и 2, получаем 1010
Вводим 872 и 8, получаем 1550
Вводим 2 и 'abc', получаем "Некорректный ввод!" 

*/

function validate(value) {
   const base = parseInt(value)
   return !isNaN((base)) && value.trim() !== ''
}

function validateBase(value){
   const base = parseInt(value);
   return !isNaN(base) && value.trim() !== '' && base >= 2 && base <= 36;
}

function main(){
   const value1 = prompt('Значение1')
   const value2 = prompt('Значение2')

   if (validate(value1) && validateBase(value2)){
      console.log(Number(value1).toString(value2))
   } else {
      console.log('Некорректный ввод!')
   }  
}

/* 2) 
С помощью встроенной браузерной функции prompt поочерёдно ввести два значения. 
Если первое значение является невалидным числом, вывести в консоли сообщение: 
"Некорректный ввод!" и завершить программу. 
В ином случае, если второе значение является невалидным числом 
вывести такое же сообщение об ошибке и завершить программу. 
Если оба значения являются валидными числами, то вывести в консоль результат в виде: 
"Ответ: [сумма двух чисел], [частное двух чисел]."

> Примеры:
Вводим 10 и 2, получаем "Ответ: 12, 5."
Вводим 872 и 8, получаем "Ответ: 880, 109."
Вводим 'abc', получаем "Некорректный ввод!"

*/

function validate2(value) {
   return !isNaN((value)) && value.trim() !== ''
}

function main2(){
   const value1 = prompt('Значение1')
   const value2 = prompt('Значение2')

   if (validate(value1) && validate(value2)){
      const numberValue1 = Number(value1);
      const numberValue2 = Number(value2);
      const res1 = numberValue1 + numberValue2;
      const res2 = numberValue1 / numberValue2;
      console.log(res1, res2)
   } else {
      console.log('Некорректный ввод!')
   }
}
