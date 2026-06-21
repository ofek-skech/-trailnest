import LoginForm from '@/components/admin/LoginForm';

export const metadata = { title: 'כניסה | CampIL Admin' };

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return <LoginForm unauthorizedError={error === 'unauthorized'} />;
}
