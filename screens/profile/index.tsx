import { SafeAreaView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';


export default () => {
    const { logOut } = useAuth();
  return (
       <SafeAreaView className="flex-1 justify-start items-start pt-10">
      <Text> Profile</Text>
      <Button onPress={logOut} className="w-full bg-black p-5 rounded-lg">
        <ButtonText>Log Out</ButtonText>
      </Button>
    </SafeAreaView>
  );
}