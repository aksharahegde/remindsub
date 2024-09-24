export enum PaymentMethod {
  CARD = "Card",
  APPLE_PAY = "Apple Pay",
  GOOGLE_PAY = "Google Pay",
  PAYPAL = "Paypal",
  RAZORPAY = "Razorpay",
  STRIPE = "Stripe",
  WALLET = "Wallet",
}

export enum BillingPeriod {
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export enum Currency {
  USD = "USD",
  INR = "INR",
  EUR = "EUR",
}

export enum Plan {
  FREE = "Free",
  BASIC = "Basic",
  PREMIUM = "Premium",
}

export enum Status {
  ACTIVE = "Active",
  CANCELED = "Canceled",
}

export interface Subscription {
  id?: number;
  appName: string;
  icon: string;
  plan: Plan;
  amount: number;
  currency: Currency;
  billingPeriod: BillingPeriod;
  firstPaymentDate: string;
  category: string;
  paymentMethod: PaymentMethod;
  remarks?: string;
  status: Status;
  createdAt: string;
}
