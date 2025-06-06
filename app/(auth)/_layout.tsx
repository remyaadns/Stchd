import { Stack } from "expo-router";

export default () => {
    return (
    <Stack>
      <Stack.Screen name="index"options={{headerShown:false}} />
        <Stack.Screen name="verify"options={{headerShown:false}} />
      <Stack.Screen name="username"options={{headerShown:false}} />
    </Stack>
    );
}