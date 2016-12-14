export function requiredDigit(value) {
  if (value == null || value == '') return 'This field is required.';
  var regex = /^[0-9.,]+$/;
  if (regex.test(value)) return true;
  return 'This field can only be filled with numbers';
}
