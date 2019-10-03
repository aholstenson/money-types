import { CurrencyUnit } from './CurrencyUnit';

/**
 * Collection of several currencies. Used for things such as parsing and
 * presenting user selectable values.
 */
export interface Currencies {
	get(code: string): CurrencyUnit | undefined;
}
