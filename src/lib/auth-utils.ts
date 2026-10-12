export function isAdminUser(
  user: { email?: string | null; user_metadata?: Record<string, any> } | null | undefined
): boolean {
  if (!user) return false;
  const role = user.user_metadata?.role;
  const email = user.email?.toLowerCase().trim();

  return (
    role === 'admin' ||
    email === 'admin@lenteraaksara.id' ||
    email === 'olegacor15@gmail.com'
  );
}
