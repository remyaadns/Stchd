import { useAuth } from '@/providers/AuthProvider';
import User from '@/components/shared/user';


export default () => {
  const { user } = useAuth();
  console.log(user);
  return <User user={user} />;
}