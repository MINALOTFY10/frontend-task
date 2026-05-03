export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                       'Jul','Aug','Sep','Oct','Nov','Dec']

export const generateMonthlyData = (seed: number, min: number, max: number): number[] =>
  MONTHS.map((_, i) => {
    const pseudo = Math.abs(Math.sin(seed + i * 0.9))
    return Math.round(min + pseudo * (max - min))
  })