export default oauthGoogleEventHandler({
  config: {
    authorizationParams: {
      access_type: "offline",
    },
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        username: user.login,
        email: user.email,
        avatar: user.avatar_url,
      },
      loggedInAt: Date.now(),
    });

    return sendRedirect(event, "/");
  },
});
