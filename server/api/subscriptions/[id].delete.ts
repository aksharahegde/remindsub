export default eventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const deletedSubscription = await useDrizzle()
    .delete(tables.subscriptions)
    .where(and(eq(tables.subscriptions.id, Number(id))))
    .returning()
    .get();

  if (!deletedSubscription) {
    throw createError({
      statusCode: 404,
      message: "Subscription not found",
    });
  }
  return deletedSubscription;
});
