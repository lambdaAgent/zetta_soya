const formatCurrency = function(currency){
  currency = String(Number(currency).toFixed(0));
  //loop from right
  let resultWithThousandSeparator = '';
  let numberWithoutComma = '';
  for (var i=currency.length-1; i >= 0; i--){
    numberWithoutComma = currency[i] + numberWithoutComma;
    resultWithThousandSeparator = currency[i] + resultWithThousandSeparator;
    if (numberWithoutComma.length % 3 === 0 &&  i !== 0){
      resultWithThousandSeparator = '.' + resultWithThousandSeparator;
    }
  }
  let result = "Rp " + resultWithThousandSeparator + ",00"
  return result;
};

module.exports = {
  formatCurrency
};