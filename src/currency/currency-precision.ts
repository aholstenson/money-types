/**
 * Precision of a currency.
 */
export interface CurrencyPrecision {
	/**
	 * The number of digits to show after the decimal sign for this currency.
	 */
	readonly decimalDigits: number;

	/**
	 * Rounding to apply to the decimal part. If specified this defines the
	 * largest decimal value something can be. So if a currency rounds to
	 * the nearest `.50` this would be `50`.
	 */
	readonly decimalRounding?: number;
}
