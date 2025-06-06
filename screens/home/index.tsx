import { SafeAreaView } from 'react-native';
import { Text } from '@/components/ui/text';

export default () => {
  return (
    <SafeAreaView className="flex-1 justify-start items-start pt-10">
      <Text className="text-2xl font-bold">Home</Text>
    </SafeAreaView>
  );
}