import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge} from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Plus, Heart, MessageCircle, Repeat, Send} from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/lib/types';
import { Pressable, Image, SafeAreaView, ScrollView, View  } from 'react-native';
import { router } from 'expo-router';




export default ({ item }: { item: Post }) => {
    // const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
// const imageUrl = `https://bktikzewfnedxdcyhslv.supabase.co/storage/v1/object/public/files/${item.user_id}/${item.file}`
// console.log('Hardcoded Image URL:', imageUrl);
// console.log('item.file:', item.file);
// console.log('item.user_id:', item.user_id);
// console.log('Full Image URL:', imageUrl);
    return (
          <SafeAreaView className='bg-white'>
            <ScrollView>
        <Pressable onPress={() => router.push({
            // pathname: `/thread`,
                 pathname: `/`,
            params: { id: item.id }
        })}>

            <Card>
                {/* <HStack className='items-center p-5' space='md'> */}
                <HStack className="items-center px-5" >
                    <Avatar size="md" className='mt-6'  >
                        <AvatarBadge size='lg' style={{backgroundColor:'black', alignItems: 'center', justifyContent: 'center' }}>
                            <Plus size={3} color='white' strokeWidth={5} />
                        </AvatarBadge>
                        <AvatarFallbackText>{item?.User?.username}</AvatarFallbackText>
                        <AvatarImage
                            source={{
                                uri: item?.User?.avatar,
                            }}
                            className="w-12 h-12 rounded-full"
                        />
                    </Avatar>
                    {item?.parent_id && <Divider orientation='vertical' className='absolute' style={{ height: 85, bottom: -50}} /> }
                    <VStack className='flex-1' space='md'>
                        <HStack className='items-center' space='md'>
                            <Text size='lg' bold>{item?.User?.username}</Text>
                            {/* <Text size='md'  className='text-gray-500 text-xs mx-5'>{formatDistance(new Date(item.created_at), new Date().getTimezoneOffset(), {addSuffix: true})}</Text> */}
                            <Text size='xs' className='text-gray-500 text-xs mx-5'>{item?.created_at && formatDistanceToNow(new Date(new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000), { addSuffix: true })}</Text>
                        </HStack>
                                {/* <Text size='md'  >{item.text}</Text>
                        {item?.file && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}

                        <HStack className='items-center' space='lg'>
                            <Heart size={20} color='gray' strokeWidth={1.5} />
                            <MessageCircle size={20} color='gray' strokeWidth={1.5} />
                            <Repeat size={20} color='gray' strokeWidth={1.5} />
                            <Send size={20} color='gray' strokeWidth={1.5} />
                        </HStack>
                    </VStack>
                </HStack>
                {/* <Divider className='w-full' style={{ marginTop: 20 }} /> */}
            </Card>
        </Pressable>
        </ScrollView>
        </SafeAreaView>
    )
//     return (
//   <SafeAreaView className='bg-white'>
//     <ScrollView>
//       <Pressable onPress={() => router.push({
//         pathname: `/`,
//         params: { id: item.id }
//       })}>
//         <Card>
//           <HStack className="items-start px-5 py-4" space='md'>
//             {/* Avatar Section */}
//             <VStack className="items-center">
//               <Avatar size="md">
//                 <AvatarBadge 
//                   size='lg' 
//                   style={{
//                     backgroundColor: 'black', 
//                     alignItems: 'center', 
//                     justifyContent: 'center'
//                   }}
//                 >
//                   <Plus size={3} color='white' strokeWidth={5} />
//                 </AvatarBadge>
//                 <AvatarFallbackText>{item?.User?.username}</AvatarFallbackText>
//                 <AvatarImage
//                   source={{
//                     uri: item?.User?.avatar,
//                   }}
//                   className="w-12 h-12 rounded-full"
//                 />
//               </Avatar>
//               {/* Thread line for replies */}
//               {item?.parent_id && (
//                 <Divider 
//                   orientation='vertical' 
//                   className='mt-2' 
//                   style={{ height: 85 }} 
//                 />
//               )}
//             </VStack>

//             {/* Content Section */}
//             <VStack className='flex-1 ml-3' space='sm'>
//               {/* Header with username and timestamp */}
//               <HStack className='items-center justify-between'>
//                 <HStack className='items-center' space='sm'>
//                   <Text size='lg' bold>{item?.User?.username}</Text>
//                   <Text size='xs' className='text-gray-500'>
//                     {item?.created_at && formatDistanceToNow(
//                       new Date(new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000), 
//                       { addSuffix: true }
//                     )}
//                   </Text>
//                 </HStack>
//               </HStack>

//               {/* Post content */}
//               <Text size='md' className='leading-5'>
//                 {item.text}
//               </Text>

//               {/* Image if present */}
//               {item?.file && (
//                 <View className='mt-2'>
//                   <Image 
//                     source={{ uri: imageUrl }} 
//                     style={{ 
//                       width: 100, 
//                       height: 100, 
//                       borderRadius: 10 
//                     }} 
//                   />
//                 </View>
//               )}

//               {/* Action buttons */}
//               <HStack className='items-center mt-3' space='xl'>
//                 <Heart size={20} color='gray' strokeWidth={1.5} />
//                 <MessageCircle size={20} color='gray' strokeWidth={1.5} />
//                 <Repeat size={20} color='gray' strokeWidth={1.5} />
//                 <Send size={20} color='gray' strokeWidth={1.5} />
//               </HStack>
//             </VStack>
//           </HStack>
//         </Card>
//       </Pressable>
//     </ScrollView>
//   </SafeAreaView>
// )
} 