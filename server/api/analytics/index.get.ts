import { eq } from "drizzle-orm";

async function getTotalSpend(email: string, billingPeriod: string) {
  const result = await useDrizzle()
    .select({
      month: sql`strftime('%Y-%m', datetime(first_payment_date, 'unixepoch'))`.as("month"),
      totalAmount: sql`SUM(amount) OVER (ORDER BY strftime('%Y-%m', datetime(first_payment_date, 'unixepoch')) ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.as("totalAmount"),
    })
    .from(tables.subscriptions)
    .where(
      and(
        eq(tables.subscriptions.email, email),
        eq(
          tables.subscriptions.billingPeriod,
          billingPeriod as "Weekly" | "Monthly" | "Yearly"
        ),
        eq(tables.subscriptions.status, "Active")
      )
    )
    .groupBy(sql`strftime('%Y-%m', datetime(first_payment_date, 'unixepoch'))`)
    .orderBy(sql`strftime('%Y-%m', datetime(first_payment_date, 'unixepoch'))`)
    .execute();
  return result || 0;
}

export default eventHandler(async (event) => {
  const user: any = await getUserSession(event);
  const query = getQuery(event);
  console.log({ query });
  const { period } = query;
  const spend = await getTotalSpend(user.user.email, period as string);
  console.log({ spend });
  return spend;
});
