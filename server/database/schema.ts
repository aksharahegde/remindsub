import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const paymentMethods = sqliteTable('payment_methods', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

const billingPeriods = ['weekly', 'monthly', 'yearly'] as const;

export const subscriptions = sqliteTable('subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  appName: text('app_name').notNull(),
  icon: text('icon').notNull(),
  plan: text('plan').notNull().$type<'Free' | 'Basic' | 'Premium'>(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  billingPeriod: text('billing_period').notNull().$type<typeof billingPeriods[number]>(),
  firstPaymentDate: integer("first_payment_date", { mode: "timestamp" }).notNull(),
  category: text('category').notNull(),
  paymentMethod: text('payment_method').notNull(),
  remarks: text('remarks'),
  status: text('status').notNull().$type<'Active' | 'Canceled'>(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const notificationSettings = sqliteTable('notification_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  platform: text('platform').notNull().$type<'discord' | 'telegram' | 'slack'>(),
  webhookUrl: text('webhook_url').notNull(),
  isEnabled: integer('is_enabled').notNull().default(1),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// Keep track of the history of the subscription. so that we can show the chart later
export const subscriptionHistory = sqliteTable('subscription_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  subscriptionId: integer('subscription_id').references(() => subscriptions.id).notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  paymentMethod: integer('payment_method').references(() => paymentMethods.id).notNull(),
});
