import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, View, FlatList  } from 'react-native';
import ThreadsIcon from '@/assets/icons/threads';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Images, Camera, ImagePlay, Mic, Hash, MapPin } from 'lucide-react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Button, ButtonText } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { Input, InputField } from '@/components/ui/input';
import { Divider } from '@/components/ui/divider';
import PostCard from "./card";
import { Post } from '@/lib/types';

export default () => {
  const { user } = useAuth();
  const DefaultPost: Post = {
  id: Crypto.randomUUID(),
  user_id: user.id,
  parent_id: null,
  text: '',
}


  const [thread, setThread] =React.useState();
  // const [text, setText] = React.useState();
  const [posts, setPosts] = React.useState<Post[]>([]);
  // const [mainText, setMainText] = useState('');
  const [threadText, setThreadText] = useState('');
  const [showThreadInput, setShowThreadInput] = useState(false);

React.useEffect(() => {
  setPosts([DefaultPost]);
}, [])

  const onPress = async () => {
    console.log(posts);
    if (!user) return;
    console.log(posts);

    const {data, error} = await supabase
    .from('Post')
    .insert(posts);
    // console.log(data, error);
    if(!error) router.back();
  }
  

  const handleThreadAdd = () => {
    setShowThreadInput(true);
  }

     const updatePost = (id: string, key: string, value: string ) => {
    setPosts(posts.map((p: Post) => p.id === id ? { ...p, [key]: value } : p));
   }


  return (
    <SafeAreaView className="flex-1  pt-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={25}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack className="flex-1">
            {/* Header */}
            <HStack className='items-center justify-between p-3'>
              <Button onPress={() => router.back()} 
                size='md' 
                variant='link' 
                className='w-14'
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Text size='lg' bold className='text-black text-center flex-1'>New Thread</Text>
              <View className='w-14'/>
            </HStack>
            <Divider className='bg-black'/>
            
            <VStack className='flex-1'>
              {/* Card Start */}
              <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <PostCard post={item} updatePost={updatePost}/>}
              />
                {/* Card End */}

              {/* Thread Addition Avatar - Now closer */}
              <HStack className="items-start px-5 -mt-2">
                <VStack className='items-center'>
                  <Avatar size="sm" className='opacity-100'>
                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                    <AvatarImage
                      source={{ uri: user?.avatar }}
                      className="w-8 h-8 rounded-full"
                    />
                  </Avatar>
                </VStack>
                
                <VStack className="flex-1 mx-3">
                  {!showThreadInput ? (
                    <Button 
                      variant="outline" 
                      className="border-gray-300 bg-transparent rounded-full py-2"
                      // onPress={handleThreadAd}
                       onPress={() => setPosts([...posts,{...DefaultPost, parent_id: posts[0].id }] )}
                    >
                      <ButtonText className="text-gray-500 text-sm">Add to thread</ButtonText>
                    </Button>
                  ) : (
                    <Card size="md" className="bg-transparent">
                      <VStack className='p-3' space='md'>
                        <Input size="md" className='border-0'>
                          <InputField 
                            placeholder="Add to thread..."
                            className='px-0'
                            // value={text}
                            // onChangeText={setText}
                            // multiline
                          />
                        </Input>
                        <HStack className="items-center" space="3xl">
                          <Images size={24} color="gray" strokeWidth={1.5} />
                          <Camera size={24} color="gray" strokeWidth={1.5} />
                          <ImagePlay size={24} color="gray" strokeWidth={1.5} />
                          <Mic size={24} color="gray" strokeWidth={1.5} />
                          <Hash size={24} color="gray" strokeWidth={1.5} />
                        <MapPin size={24} color="gray" strokeWidth={1.5} />
                        </HStack>
                      </VStack>
                    </Card>
                  )}
                </VStack>
              </HStack>

              {/* Bottom Action Bar - Now with spacer */}
              <View className="flex-1" />
              <HStack className='items-center justify-between p-3'>
                <Text size='sm' className="text-gray-500">Anyone can reply & quote</Text>
                <Button
                 className="ml-auto rounded-full py-3 px-6"
              onPress={onPress}
                  // disabled={!mainText.trim()}
                >
                  <ButtonText className="text-white  text-lg">Post</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}