export const formatPrice = (value) => {
  const numericValue = Number(value ?? 0);

  if (numericValue === 0) {
    return 'R$ 0,00';
  }

  const isMinorUnitValue =
    Number.isInteger(numericValue) && numericValue >= 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(isMinorUnitValue ? numericValue / 100 : numericValue);
};
