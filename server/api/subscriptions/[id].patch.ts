export default eventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);
  const {
    appName,
    icon,
    plan,
    category,
    amount,
    currency,
    billingPeriod,
    paymentMethod,
    firstPaymentDate,
    remarks,
    status,
  } = body;
  const subscription = await useDrizzle()
    .update(tables.subscriptions)
    .set({
      appName,
      icon,
      plan,
      category,
      amount,
      currency,
      billingPeriod,
      paymentMethod,
      firstPaymentDate: new Date(firstPaymentDate),
      remarks,
      status,
    })
    .where(eq(tables.subscriptions.id, Number(id)))
    .returning()
    .get();

  return subscription;
});
