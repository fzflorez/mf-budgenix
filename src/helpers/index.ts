export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace(/\s/g, '')
}

export const formatDate = (date: string) => {
  const objDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('es-ES', options).format(objDate)
}