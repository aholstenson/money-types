import { Decimal } from 'numeric-types/decimal';
import { AbstractMoney } from './abstract-money';
import { CurrencyUnit, Currencies } from '../currency';
import { MoneyOptions } from './money-options';

const PATTERN = /^([A-Z]{3}) ((?:[-\+]?\d+)(?:\.(\d*))?(?:e(?:[-\+]?\d+))?)$/;

export class Money extends AbstractMoney<Decimal> {

	constructor(amount: Decimal, currencyUnit: CurrencyUnit, options?: MoneyOptions) {
		super(amount, currencyUnit, options);
	}

	public static fromNumber(amount: number, currencyUnit: CurrencyUnit, options?: MoneyOptions): Money {
		return new Money(Decimal.fromNumber(amount), currencyUnit, options);
	}

	public static fromDecimal(amount: Decimal, currencyUnit: CurrencyUnit, options?: MoneyOptions): Money {
		return new Money(amount, currencyUnit, options);
	}

	public static parse(value: string, currencies: Currencies, options?: MoneyOptions): Money {
		const matched = PATTERN.exec(value.trim());
		if(! matched) {
			throw new Error('Invalid string representation of money');
		}

		const currencyUnit = currencies.get(matched[1]);
		if(! currencyUnit) {
			throw new Error('Currency unit ' + matched[1] + ' not found');
		}

		const decimal = Decimal.parse(matched[2]);

		return new Money(decimal, currencyUnit, options);
	}
}
