import { CurrencyPrecision } from './CurrencyPrecision';

/**
 * Representation of the unit for a currency, such as the Euro or US Dollar.
 */
export interface CurrencyUnit extends CurrencyPrecision {
	/**
	 * Information about how this currency is used in a cash scenario.
	 */
	readonly cash: CurrencyPrecision;

	/**
	 * The three-letter currency code as defined by ISO-4217.
	 */
	readonly code: string;
}
