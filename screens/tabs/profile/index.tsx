import { useAuth } from '@/providers/AuthProvider';
import User from '@/components/shared/profile-view';


export default () => {
  const { user } = useAuth();
  // console.log(user);
  return <User user={user} />;
}