const formatCurrency = function(currency){
  currency = String(currency.toFixed(0));
  console.log(currency)
  //loop from right
  let result = '';
  let numberWithoutComma = '';
  for (var i=currency.length-1; i >= 0; i--){
  	numberWithoutComma = currency[i] + numberWithoutComma;
  	result = currency[i] + result;
  	if (numberWithoutComma.length % 3 === 0 &&  i !== 0){
  		result = ',' + result;
  	}
  }
  return result;
};

console.log( formatCurrency(15000) );
console.log( formatCurrency(150000) );
console.log( formatCurrency(1500000) );
console.log( formatCurrency(15000000) );
console.log( formatCurrency(150000000) );