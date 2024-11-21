type DateOptions = {
  day?: boolean;
  month?: boolean;
  year?: boolean;
  hour?: boolean;
  minute?: boolean;
  second?: boolean;
  locale?: string;
};

export function formatDate(date: Date, options: DateOptions = {}): string {
  const { day = true, month = true, year = true, hour = false, minute = false, second = false, locale = 'en-US' } = options;

  const optionsIntl: Intl.DateTimeFormatOptions = {
    day: day ? '2-digit' : undefined,
    month: month ? '2-digit' : undefined,
    year: year ? 'numeric' : undefined,
    hour: hour ? '2-digit' : undefined,
    minute: minute ? '2-digit' : undefined,
    second: second ? '2-digit' : undefined,
  };

  console.log(new Intl.DateTimeFormat(locale, optionsIntl).format(date))

  return new Intl.DateTimeFormat(locale, optionsIntl).format(date);
}

// Ejemplos de uso:
// const date = new Date();

// console.log(formatComplexDate(date, { day: true, month: true, year: true })); // 20/11/2024
// console.log(formatComplexDate(date, { day: true, month: true, year: true, hour: true, minute: true })); // 20/11/2024, 17:57
// console.log(formatComplexDate(date, { day: true, month: true, year: true, hour: true, minute: true, second: true })); // 20/11/2024, 17:57:00
// console.log(formatComplexDate(date, { day: true, month: true, year: true, locale: 'es-ES' })); // 20/11/2024 (formato español)
