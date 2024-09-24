export default eventHandler(async () => {
  const subscriptions = await useDrizzle()
    .select()
    .from(tables.subscriptions)
    .all();
  console.log("subscriptions", subscriptions);
  return subscriptions;
});
