import React from 'react';
import { FlatList, Pressable, SafeAreaView } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import ThreadsIcon from '@/assets/icons/threads';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Images, Camera, ImagePlay, Mic, Hash, MapPin } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';
import { Divider } from '@/components/ui/divider';
import { supabase } from '@/lib/supabase';


export default () => {
  const { user } = useAuth();
  // console.log('user:', user);
  const [threads, setThreads] = React.useState([]);
  const pathname = usePathname();

  React.useEffect (() => {
    if(pathname === '/') getThreads();
  }, [pathname]);

  const getThreads = async () => {
    const {data, error} = await supabase.from('Post').select('*, User(*)').order('created_at', {ascending: false});
    console.log(data, error)
    if(!error) setThreads (data);
  }

  return (
    // <SafeAreaView className="flex-1 justify-start items-start pt-10">
    <SafeAreaView>
      <HStack className="items-center justify-center pt-10">
        <ThreadsIcon size={40} />
      </HStack>
      <Pressable onPress={() => {
        router.push('/post');
      }}>
      <HStack className="items-center px-5">
        <Avatar size="md" className='mt-6'  >
          <AvatarFallbackText>{user?.username}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: user?.avatar,
            }}
          className="w-12 h-12 rounded-full"
          />
        </Avatar>
        <Card size="md" className="mx-3 bg-transparent">
          <VStack className='p-3' space='lg'>
            <VStack>
              <Heading size="md" className="mb-1 text-black">
                {user?.username || "No username"}
              </Heading>
              <Text size="md" className="text-gray-500"> What's New?</Text>
            </VStack>
            <HStack className="items-center" space="3xl" >
              <Images size={24} color="gray" strokeWidth={1.5} />
              <Camera size={24} color="gray" strokeWidth={1.5} />
              <ImagePlay size={24} color="gray" strokeWidth={1.5} />
              <Mic size={24} color="gray" strokeWidth={1.5} />
              <Hash size={24} color="gray" strokeWidth={1.5} />
              <MapPin size={24} color="gray" strokeWidth={1.5} />
            </HStack>
          </VStack>
        </Card>
      </HStack>
      <Divider/>
      <VStack space='lg'>
       <FlatList
       data={threads}
       renderItem={({item}) => {
        return (
        <HStack className='items-center p-5'>
           <Avatar size="md" className='mt-6'  >
          <AvatarFallbackText>{user?.username}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: user?.avatar,
            }}
          className="w-12 h-12 rounded-full"
          />
        </Avatar>
        <VStack className='flex-1'>
          <HStack className='items-center'>
          <Text size='md' bold>{item.User.username}</Text>
          <Text size='md' className='text-gray-500 mx-5'>.</Text>
          <Text size='md'  className='text-gray-500 text-xs'>{new Date(item.created_at).toLocaleDateString()}</Text>
          </HStack>
        <Text size='md'>{item.text}</Text>
        </VStack>
        </HStack>
        )
   }}   />
      </VStack>
        </Pressable>
    </SafeAreaView>
  );
}