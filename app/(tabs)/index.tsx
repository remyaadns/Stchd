import { SafeAreaView,  Text } from 'react-native';
import { HStack } from '@/components/ui/hstack';


export default function HomeScreen() {
  return (
    <SafeAreaView>
      <HStack className="flex-row justify-between p-10 px-4">
        <Text className="text-2xl font-bold">Home</Text>
        <Text className="text-2xl font-bold">Test</Text>
      </HStack>
    </SafeAreaView>
  );
}