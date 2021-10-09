export const isValidCPF = (cpf: string) => {
  let sum;
  let rest;
  sum = 0;
  if (cpf === '000.000.000-00' || cpf === '00000000000') return false;

  const CPFFormatted = cpf.replace(/[^0-9 ]/g, '');

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(CPFFormatted.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(CPFFormatted.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(CPFFormatted.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(CPFFormatted.substring(10, 11))) return false;
  return true;
}
