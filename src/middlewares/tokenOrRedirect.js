/**
 * Middleware to check if current user have a JWT
 */
export default async ({ router, redirect, store, route }) => {
  if (route.meta.guest) return

  const redirectPath = `/auth?redirect=${route.path}`
  const { token } = store.getters

  if (!token) {
    router.replace(redirectPath)
  }
}
