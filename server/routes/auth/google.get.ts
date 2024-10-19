export default defineOAuthGoogleEventHandler({
  config: {
    authorizationParams: {
      access_type: "offline",
    },
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        username: user.name,
        email: user.email,
        avatar: null,
      },
      loggedInAt: Date.now(),
    });

    return sendRedirect(event, "/dashboard");
  },
});
