// ////////////////////////////////////////////////////////////////////////////////

// import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import { Input, InputField, } from '@/components/ui/input';
// import { useAuth } from '@/providers/AuthProvider';
// import React from 'react';
// import { Text } from '@/components/ui/text';
// import { supabase } from '@/lib/supabase';
// import { router } from 'expo-router';
// import { useRouter } from 'expo-router';
// import Layout from './_layout';


// export default () => {
//     // const { user } = useAuth();
//     const [phone, setPhone] = React.useState('');
//     const router = useRouter();

//     const handleSignIn = async () => {

//         const { data, error } = await supabase.auth.signInWithOtp({
//             phone: `+1${phone}`,
//         })
//         if (!error) {
//             router.push({
//                 pathname: '/(auth)/verify',
//                 params: { phone: `+1${phone}` }
//             });
//         }

//     }
//     /////////////////////////////////////////////////
// return (
//         <Layout onPress={handleSignIn} buttonText='Sign In'>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={{ flex: 1 }}
//             >
//                 <ScrollView
//                     contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 32 }}
//                     keyboardShouldPersistTaps="handled"
//                 >
//                     <Text className="text-lg font-bold text-black mb-4">Enter your phone number</Text>
//                     <Input
//                         variant="outline"
//                         size="md"
//                         className="w-72 border border-gray-400 rounded bg-white"
//                     >
//                         <InputField
//                             placeholder="Enter your phone number..."
//                             value={phone}
//                             onChangeText={setPhone}
//                             keyboardType="phone-pad"
//                             secureTextEntry={true}
//                         />
//                     </Input>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </Layout>
// );
// }




// /app/auth/index.tsx
import { KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import Layout from './_layout';

export default () => {
    const navigateToPhone = () => {
        router.push('/(auth)/phone');
    };

    return (
        <Layout onPress={navigateToPhone} buttonText='Continue with Phone'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 32 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <VStack className="items-center space-y-6">
                        <Text className="text-2xl font-bold text-black text-center">Welcome to Threads</Text>
                        <Text className="text-gray-600 text-center">Choose how you'd like to continue</Text>
                        
                        <VStack className="space-y-4 mt-8">
                            <Pressable 
                                onPress={() => router.push('/(auth)/login')}
                                className="w-72 p-4 border-2 border-gray-300 rounded-lg items-center"
                            >
                                <Text className="text-black font-medium">Sign In with Email</Text>
                            </Pressable>
                            
                            <Pressable 
                                onPress={() => router.push('/(auth)/signup')}
                                className="w-72 p-4 border-2 border-gray-300 rounded-lg items-center"
                            >
                                <Text className="text-black font-medium">Create Account with Email</Text>
                            </Pressable>
                        </VStack>
                    </VStack>
                </ScrollView>
            </KeyboardAvoidingView>
        </Layout>
    );
}