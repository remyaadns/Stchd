import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from '@/components/ui/text';
import ThreadsIcon from '@/assets/icons/threads';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Route } from 'expo-router/build/Route';
import { router } from 'expo-router';


export default ({ children, onPress, buttonText }: { children: React.ReactNode; onPress: () => void; buttonText: string }) => {
    // return (
    //     <SafeAreaView className="flex-1 justify-start items-center pt-10">
    //         <KeyboardAvoidingView
    //             // className="flex-1 justify-start items-center"
    //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //             style={{ flex: 1 }}>
    //             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //                 {/* <VStack className="flex-1"> */}
    //                 <VStack className="justify-between h-full w-full">

    //                     <VStack className="items-center justify-center">
    //                         <ThreadsIcon size={40} />
    //                         <Text className="text-xl font-bold text-black">Threads</Text>
    //                     </VStack>
    //                     {children}
    //                     <VStack className="items-center justify-center">
    //                         <Button onPress={onPress} className='w-full bg-black p-5 rounded-lg'>
    //                             <ButtonText>Sign Up</ButtonText>
    //                         </Button>
    //                     </VStack>
    //                 </VStack>
    //             </TouchableWithoutFeedback>
    //         </KeyboardAvoidingView>
    //     </SafeAreaView>
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <VStack className="justify-between h-full w-full">
                        <VStack className="items-center justify-center mt-8 mb-4">
                        {/* <VStack className="mt-8 mb-8"> */}
                            <HStack className="justify-between items-center w-full px-6">
                                <Button onPress={() => router.back()} size='lg' variant='link' className='flex-row items-start '>
                                    <ButtonText>Back</ButtonText>
                                </Button>
                                <ThreadsIcon size={40} />
                                {/* <Button onPress={() => router.back()} size='lg' variant='link' className='flex-row items-end '> */}
                                <View className="w-10"/>
                            </HStack>
                        </VStack>
                        <VStack className="flex-1 justify-center items-center px-4">
                            {children}
                        </VStack>
                        <VStack className="items-center justify-center mb-8">
                            <Button onPress={onPress} className="w-3/4 bg-black p-5 rounded-lg justify-center items-center">
                                <ButtonText>{buttonText}</ButtonText>
                            </Button>
                        </VStack>
                    </VStack>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}