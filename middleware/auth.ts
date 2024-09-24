export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();
  console.log(user.value);
  if (!user.value) {
    console.log("redirecting to /");
    return navigateTo("/");
  }
});
