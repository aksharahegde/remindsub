export default defineEventHandler(async (event) => {
  const _session = await requireUserSession(event);
  const { user }: any = _session;
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
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
  console.log(body);
  const subscription = await useDrizzle()
    .insert(tables.subscriptions)
    .values({
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
      createdAt: new Date(),
      email: user.email,
    })
    .returning()
    .get();
  return subscription;
});
