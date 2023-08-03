// 1.

const 
   VALIDATION_MESSAGE = 'Некорректный ввод!',
   VALUE_1 = 'Значение 1',
   VALUE_2 = 'Значение 2';

function validate(value) {
   return value || value === 0 && !isNaN((value));
}

function validateBase(value){
   return validate(value) && value >= 2 && value <= 36;
}

function main() {
   const 
      value1 = prompt(VALUE_1),
      value2 = prompt(VALUE_2);

   if (validate(value1) && validateBase(value2)) {
      console.log(Number(value1).toString(value2));
   } else {
      console.log(VALIDATION_MESSAGE);
   }
};

// 2.

function main2() {
   const 
      value1 = prompt(VALUE_1),
      value2 = prompt(VALUE_2);

   if (validate(value1) && validate(value2)) {
      const 
         numberValue1 = Number(value1),
         numberValue2 = Number(value2);

      const 
         res1 = numberValue1 + numberValue2,
         res2 = numberValue1 / numberValue2;

      console.log('Ответ: ' + res1 + ", " + res2);

   } else {
      console.log(VALIDATION_MESSAGE);
   }
};
