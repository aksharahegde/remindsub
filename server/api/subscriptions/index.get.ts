import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  const user: any = await getUserSession(event);
  const subscriptions = await useDrizzle()
    .select()
    .from(tables.subscriptions)
    .where(eq(tables.subscriptions.email, user.user.email));
  return subscriptions;
});
