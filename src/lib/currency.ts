// Servicio para obtener tasas de cambio
// Usa exchangerate-api.io (gratis, 1500 requests/mes)

const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/EUR';

interface ExchangeRates {
    base: string;
    rates: Record<string, number>;
    date: string;
}

let cachedRates: ExchangeRates | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Obtiene las tasas de cambio actualizadas
 * Cache de 24 horas para no exceder límites de API
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
    const now = Date.now();

    // Usar caché si es reciente
    if (cachedRates && (now - lastFetch) < CACHE_DURATION) {
        return cachedRates;
    }

    try {
        const response = await fetch(EXCHANGE_API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();
        cachedRates = data;
        lastFetch = now;

        return data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);

        // Si falla, usar tasas aproximadas de respaldo
        return {
            base: 'EUR',
            rates: {
                EUR: 1,
                USD: 1.09,
                BRL: 6.20,
                MXN: 19.50,
                COP: 4300,
                ARS: 1050,
            },
            date: new Date().toISOString()
        };
    }
}

/**
 * Convierte un monto de una moneda a otra
 */
export function convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: ExchangeRates
): number {
    if (fromCurrency === toCurrency) {
        return amount;
    }

    // Convertir a EUR primero (base)
    const amountInEUR = fromCurrency === 'EUR'
        ? amount
        : amount / rates.rates[fromCurrency];

    // Luego a la moneda destino
    const convertedAmount = toCurrency === 'EUR'
        ? amountInEUR
        : amountInEUR * rates.rates[toCurrency];

    return convertedAmount;
}

/**
 * Formatea un monto con su moneda
 */
export function formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Convierte y formatea un monto mostrando ambas monedas
 * Ejemplo: "29.00 USD (≈26.50 EUR)"
 */
export function formatWithConversion(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: ExchangeRates
): string {
    if (fromCurrency === toCurrency) {
        return formatCurrency(amount, fromCurrency);
    }

    const converted = convertCurrency(amount, fromCurrency, toCurrency, rates);
    return `${formatCurrency(amount, fromCurrency)} (≈${formatCurrency(converted, toCurrency)})`;
}
