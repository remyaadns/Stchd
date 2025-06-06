import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useRouter } from 'expo-router';

export default () => {
  const { user } = useAuth();
  const [phone, setPhone] = React.useState('');
    const router = useRouter();

  const handleSignIn = async () => {
    console.log(phone)

    const { data, error } = await supabase.auth.signInWithOtp({
      phone: `+1${phone}`,
    })
    if (!error) {
        router.push({
            pathname: '/(auth)/verify',
            params: { phone: `+1${phone}` }
        });
    }
    console.log(data, error)
  }

 return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingTop: 64, paddingHorizontal: 16, gap: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <Input variant='outline' size="md" className="w-full">
            <InputField
              placeholder="Enter Text here"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              secureTextEntry={true}
            />
          </Input>
          <Button onPress={handleSignIn} className="w-full bg-black p-5 rounded-lg">
            <ButtonText>Sign In</ButtonText>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}