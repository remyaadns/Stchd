import React from 'react';
import { FlatList, Pressable, SafeAreaView, View, Image } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import ThreadsIcon from '@/assets/icons/threads';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Images, Camera, ImagePlay, Mic, Hash, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import { Divider } from '@/components/ui/divider';
import { usePosts } from '@/hooks/use-posts';
import { Plus, Heart, MessageCircle, Repeat, Send } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns'

export default () => {
  const { user } = useAuth();
  // console.log('user:', user);
  const { data, refetch, isLoading } = usePosts();


  return (
    // <SafeAreaView className="flex-1 justify-start items-start pt-10">
    <SafeAreaView className='bg-white'>
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
      </Pressable>
      <Divider />
      <VStack space='lg'>
        <FlatList
          refreshing={isLoading}
          onRefresh={refetch}
          data={data}
          renderItem={({ item }) => {
            // return (
            //   <Card>
            // <HStack className='items-center p-5' space='md'>
            //    <Avatar size="sm" className='mt-6'  >
            //     <AvatarBadge>
            //       <Plus size={12} color='white' />
            //     </AvatarBadge>
            //   <AvatarFallbackText>{user?.username}</AvatarFallbackText>
            //   <AvatarImage
            //     source={{
            //       uri: user?.avatar,
            //     }}
            //   className="w-12 h-12 rounded-full"
            //   />
            // </Avatar>
            // <VStack className='flex-1' space='md'>
            //   <HStack className='items-center' space='md'>
            //   <Text size='lg' bold>{item.User.username}</Text>
            //   {/* <Text size='md'  className='text-gray-500 text-xs mx-5'>{formatDistance(new Date(item.created_at), new Date().getTimezoneOffset(), {addSuffix: true})}</Text> */}
            //   <Text size='xs'  className='text-gray-500 text-xs mx-5'>{item?.created_at && formatDistanceToNow((new Date(item.created_at) - new Date().getTimezoneOffset()* 60000 ), {addSuffix: true})}</Text>
            //   </HStack>
            // <Text size='lg'>{item.text}</Text>
            // <HStack className='items-center' space='lg'>
            //   <Heart size={20} color='gray' strokeWidth={1.5} />
            //   <MessageCircle size={20} color='gray' strokeWidth={1.5} />
            //   <Repeat  size={20} color='gray' strokeWidth={1.5} />
            //   <Send  size={20} color='gray' strokeWidth={1.5} />
            // </HStack>
            // </VStack>
            // </HStack>
            // <Divider className='w-full' style={{marginTop: 20}}/>
            // </Card>
            // )

            // the aligning/formating is better here plus I added the image source for rendering   
            return (
              <Card>
                {/* <HStack className='items-start px-5 py-4' space='md'> */}
                <HStack className="items-center px-5">
                  {/* Avatar Section */}
                  {/* <Avatar size="sm"> */}
                  <Avatar size="sm" className='mt-6'  >
                    <AvatarBadge>
                      <Plus size={8} color='white' />
                    </AvatarBadge>
                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                    <AvatarImage
                      source={{
                        uri: user?.avatar,
                      }}
                      className="w-12 h-12 rounded-full"
                    />
                  </Avatar>

                  {/* Content Section */}
                  <VStack className='flex-1' space='sm'>
                    {/* Header with username and timestamp */}
                    <VStack>
                      <HStack className='items-center' space='sm'>
                        <Text size='lg' bold>{item.User.username}</Text>
                        <Text size='xs' className='text-gray-500'>
                          {item?.created_at && formatDistanceToNow(
                            (new Date(item.created_at) - new Date().getTimezoneOffset() * 60000),
                            { addSuffix: true }
                          )}
                        </Text>
                      </HStack>
                      {item?.Place?.name && <Text size="xs" bold >{item?.Place?.name}</Text>}
                    </VStack>

                    {/* Post content */}
                    <Text size='md' className='leading-6'>
                      {item.text}
                    </Text>
                    <View>
                      <View>
                        {item?.file && (
                          <Image
                            source={{ uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}` }}
                            style={{ width: 100, height: 100, borderRadius: 10 }}
                          />
                        )}
                      </View>
                      {/* Action buttons */}
                      <HStack className='items-center mt-2' space='lg'>
                        <Heart size={20} color='gray' strokeWidth={1.5} />
                        <MessageCircle size={20} color='gray' strokeWidth={1.5} />
                        <Repeat size={20} color='gray' strokeWidth={1.5} />
                        <Send size={20} color='gray' strokeWidth={1.5} />
                      </HStack>
                    </View>
                  </VStack>

                </HStack>

                <Divider className='w-full mt-5' />
              </Card>
            )
          }} />
      </VStack>
    </SafeAreaView>
  );
}