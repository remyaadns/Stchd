import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button,ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default () => {
    const [token, setToken] = React.useState('');
    const  {phone}= useLocalSearchParams();

    const handleVerify = async () => {
        const { data, error } = await supabase.auth.verifyOtp({
            phone: phone as string , token, type: 'sms'
        })
        console.log(data, error);
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <Text className='text-2xl font-bold p-10'>Verify</Text>
        <ScrollView
          contentContainerStyle={{ paddingTop: 64, paddingHorizontal: 16, gap: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <Input variant='outline' size="md" className="w-full">
            <InputField
              placeholder="Enter Text here"
              value={token}
              onChangeText={setToken}
              keyboardType="phone-pad"
            />
          </Input>
          <Button onPress={handleVerify} className="w-full bg-black p-5 rounded-lg">
            <ButtonText>Verify</ButtonText>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}