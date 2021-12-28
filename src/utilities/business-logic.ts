import {
  IComingCustomer,
  ILogin,
  ITax,
  ITaxHistory,
  ITaxInput,
} from "../interfaces/interface";

export const loginAuthenticate = (
  customers: IComingCustomer[],
  authenticationData: ILogin
): IComingCustomer | undefined => {
  const loggedCustomer = customers.find(
    (customer) =>
      customer.username === authenticationData.username.trim() &&
      customer.password === authenticationData.password.trim()
  );
  return loggedCustomer;
};

export const calculateIncomeTax = (
  birthdateSeconds: number,
  income: ITaxInput,
  taxRules: ITax[]
): ITaxHistory => {
  const age: number = calculateAge(birthdateSeconds, Number(income.year));
  const taxRecord: ITaxHistory = {
    year: Number(income.year),
    age: age,
    income: Number(income.income),
    invest: Number(income.invest),
    tax: 0,
  };
  const taxRule: ITax = taxRules.find(
    (rule) => rule.year === taxRecord.year
  ) as ITax;

  let tax = 0;
  const investDeduction: number =
    Number(taxRule.exempt_limit) >= taxRecord.invest
      ? taxRecord.invest
      : Number(taxRule.exempt_limit);
  let calculationAmount = taxRecord.income - investDeduction;
  let cess: number = 0;

  if (age > Number(taxRule.age_exempt.age_above)) {
    const ageExempt = Number(taxRule.age_exempt.exempt);
    calculationAmount -= ageExempt;
  }

  for (
    let index = 0;
    index < (taxRule.tax_bracket as string[]).length;
    index++
  ) {
    const taxBracket: string[] = (taxRule.tax_bracket as string[])[index].split(
      "-"
    );
    const bracketAmount: number =
      taxBracket[1] === "" ? 0 : Number(taxBracket[1]) - Number(taxBracket[0]);
    const taxPercentage: number =
      (taxRule.tax_percentage as number[])[index] / 100;

    if (bracketAmount === 0) {
      tax += calculationAmount * taxPercentage;
      calculationAmount = 0;
    } else if (calculationAmount >= bracketAmount) {
      tax += bracketAmount * taxPercentage;
      calculationAmount -= bracketAmount;
    } else {
      tax += calculationAmount * taxPercentage;
      calculationAmount = 0;
    }

    if (calculationAmount === 0) {
      break;
    }
  }

  if (tax > Number(taxRule.cess_on.amount_above)) {
    cess = tax * (Number(taxRule.cess_on.percentage) / 100);
  }

  tax = tax + cess;
  tax = tax >= 0 ? tax : 0;
  taxRecord.tax = tax;

  return taxRecord;
};

export const moneyWithCommas = (money: number) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateAge = (seconds: number, taxYear: number): number => {
  const birthYear: number = new Date(seconds * 1000).getFullYear();

  return taxYear - birthYear;
};
