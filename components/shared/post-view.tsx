// import React from 'react';
// import { HStack } from '@/components/ui/hstack';
// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
// import { Text } from '@/components/ui/text';
// import { VStack } from '@/components/ui/vstack';
// import { Divider } from '@/components/ui/divider';
// import { Plus, Heart, MessageCircle, Repeat, Send } from 'lucide-react-native';
// import { formatDistanceToNow } from 'date-fns';
// import { Post } from '@/lib/types';
// import { Pressable, Image, SafeAreaView, ScrollView, View } from 'react-native';
// import { router } from 'expo-router';
// import Audio from '@/screens/post/audio';
// import { renderText } from '@/screens/post/input';
// import { supabase } from '@/lib/supabase';
// import { useAuth } from '@/providers/AuthProvider';
// import * as Crypto from "expo-crypto";




// export default ({ item, refetch }: { item: Post, refetch: () => void }) => {
//     const { user } = useAuth();
//     const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
//     // const imageUrl = `https://bktikzewfnedxdcyhslv.supabase.co/storage/v1/object/public/files/${item.user_id}/${item.file}`
//     // console.log('Hardcoded Image URL:', imageUrl);
//     // console.log('item.file:', item.file);
//     // console.log('item.user_id:', item.user_id);
//     // console.log('Full Image URL:', imageUrl);


//     //   console.log('item.text:', item.text);
//     // console.log('Full item:', item);

//     const fileType = item.file?.split('.').pop();
//     const regex = /([#@]\w+)|([^#@]+)/g;
//     const textArray = item?.text?.match(regex) || [];
//     const isLiked = item?.Like?.some((like: { user_id: string }) => like.user_id === user?.id);

//     const addLike = async () => {
//         const { error } = await supabase.from('Like').insert({
//             user_id: user?.id,
//             post_id: item.id
//         });
//         // console.log(data, error);
//         if (!error) refetch();
//     }

//     const removeLike = async () => {
//         const { error } = await supabase.from('Like').delete().eq('user_id', user?.id).eq('post_id', item.id);
//         if (!error) refetch();
//     }

//     const addRepost = async () => {
//         const newPost = {
//             id: Crypto.randomUUID(),
//             user_id: user?.id,
//             parent_id: item.id,
//             text: item.text,
//             file: item.file,
//             place_id: item.place_id,
//             tag_name: item.tag_name,
//             repost_user_id: user?.id
//         }
//         console.log(newPost);
//         //     const { data, error } = await supabase.from('Post').insert(newPost);
//         // });
//         //     if (!error) refetch();
//     }

//     return (
//         <SafeAreaView className='bg-white'>
//             <ScrollView>
//                 <Pressable onPress={() => router.push({
//                     pathname: `/thread`,
//                     //  pathname: `/`,
//                     params: { id: item.id }
//                 })}>

//                     <Card>
//                         {/* <HStack className='items-center p-5' space='md'> */}
//                         <HStack className="items-start px-5" space='sm' >
//                             <Avatar size="sm" className='mt-6'  >
//                                 <AvatarBadge>
//                                     <Plus size={3} color='white' />
//                                 </AvatarBadge>
//                                 <AvatarFallbackText>{item?.User?.username}</AvatarFallbackText>
//                                 <AvatarImage
//                                     source={{
//                                         uri: item?.User?.avatar,
//                                     }}
//                                     className="w-12 h-12 rounded-full"
//                                 />
//                             </Avatar>
//                             {item?.parent_id && <Divider orientation='vertical' className='absolute' style={{ height: 85, bottom: -50 }} />}
//                             <VStack className='flex-1' space='sm'>
//                                 {/* Header with username and timestamp */}
//                                 <VStack >
//                                     {item?.repost_user_id && <HStack className='items-center' space='md'>
//                                         <Repeat size={14} color='black' strokeWidth={2} />
//                                          <Text size="sm" className='mx-2'>Reposted By</Text>
//                                         <Pressable onPress={() => router.push({
//                                             pathname: `/profile`,
//                                             params: { id: item?.repost_user_id }
//                                         })}>
//                                             <Text size="sm" bold>{item?.repost_user?.username}</Text>
//                                         </Pressable>
//                                     </HStack>}
//                                     <HStack className='items-center' space='md'>
//                                         {/* <Text size='md'  className='text-gray-500 text-xs mx-5'>{formatDistance(new Date(item.created_at), new Date().getTimezoneOffset(), {addSuffix: true})}</Text> */}
//                                         <Text size='lg' bold>{item?.User?.username}</Text>
//                                         <Text size='xs' className='text-gray-500 '>
//                                             {item?.created_at && formatDistanceToNow((new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
//                                                 { addSuffix: true }
//                                             )}
//                                         </Text>
//                                     </HStack>
//                                     {/* </HStack> */}
//                                     <VStack >
//                                         {item?.Place?.name && <Text size="xs" bold >{item?.Place?.name}</Text>}
//                                     </VStack>
//                                 </VStack>
//                                 {/* Post content */}
//                                 <Text size='md' className='leading-6' >
//                                     {/* {item.text} */}
//                                     {renderText(textArray)}
//                                 </Text>
//                                 <View>
//                                     <View>
//                                         {/* </View> */}
//                                         {/* {fileType === 'm4a' ? 
//                         <Audio id={item.id} /> 
//                         : <Image source={{ uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}` }}
//                           style={{ width: 100, height: 100, borderRadius: 10 }} /> } */}

//                                         {/* Test */}
//                                         {item?.file && (
//                                             <Image
//                                                 source={{ uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}` }}
//                                                 // style={{ width: 100, height: 100, borderRadius: 10 }}
//                                                 //  className="w-2/3 h-40 rounded-lg mt-2"
//                                                 className="w-full aspect-square rounded-lg"
//                                                 style={{ width: 350, height: 350 }}
//                                             />
//                                         )}
//                                         {/* <Text size='md'  >{item.text}</Text>
//                         {item?.file && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}

//                                         {/* {item?.file && fileType === 'm4a' && <Audio id={item.id} />}
//                                 {item?.file && fileType !== 'm4a' && <Image source={{uri: imageUrl}} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}
//                                         {/* {item?.file && fileType === 'm4a' && <Audio id={item.id} />}
//                                 {item?.file && fileType && fileType !== 'm4a' && <Image source={{uri: imageUrl}} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}

//                                         {/* 
//                                                                  {item?.file && fileType === 'm4a' && <Audio id={item.id} uri={item?.file} />}
//                                 {item?.file && fileType !== 'm4a' && <Image source={{uri: imageUrl}} style={{ width: 100, height: 100, borderRadius: 10 }} />} */}
//                                     </View>
//                                     <HStack className='items-center mt-2' space='lg'>
//                                         <Pressable onPress={isLiked ? removeLike : addLike}>
//                                             <Heart size={20} color={isLiked ? 'red' : 'gray'} strokeWidth={1.5} fill={isLiked ? 'red' : 'transparent'} />
//                                         </Pressable>
//                                         <Pressable onPress={() => router.push({
//                                             pathname: '/thread',
//                                             params: { id: item.id }
//                                         })}>
//                                             <MessageCircle size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                         <Pressable onPress={addRepost}>
//                                             <Repeat size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                         <Pressable onPress={() => { }}>
//                                             <Send size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                     </HStack>
//                                 </View>
//                             </VStack>
//                         </HStack>
//                         {/* <Divider className='w-full' style={{ marginTop: 20 }} /> */}
//                         <Divider className='w-full mt-5' />
//                     </Card>
//                 </Pressable>
//             </ScrollView>
//         </SafeAreaView>
//     )
// } 



////////////////////////////////////////////////////////////////////////
///with assistant from claude.... This works delete above code /////////
/////// this works keep this //////////////////////////////////////////
// import React from 'react';
// import { HStack } from '@/components/ui/hstack';
// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
// import { Text } from '@/components/ui/text';
// import { VStack } from '@/components/ui/vstack';
// import { Divider } from '@/components/ui/divider';
// import { Plus, Heart, MessageCircle, Repeat, Send } from 'lucide-react-native';
// import { formatDistanceToNow } from 'date-fns';
// import { Post } from '@/lib/types';
// import { Pressable, Image, SafeAreaView, ScrollView, View } from 'react-native';
// import { router } from 'expo-router';
// import Audio from '@/screens/post/audio';
// import { renderText } from '@/screens/post/input';
// import { supabase } from '@/lib/supabase';
// import { useAuth } from '@/providers/AuthProvider';
// import * as Crypto from "expo-crypto";
// import { useFollowing } from '@/hooks/use-following';

// export default ({ item, refetch }: { item: Post, refetch: () => void }) => {
//     const { user } = useAuth();
//     const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
//     const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/avatar.jpeg`;

//     const fileType = item.file?.split('.').pop();
//     const regex = /([#@]\w+)|([^#@]+)/g;
//     const textArray = item?.text?.match(regex) || [];
//      const isLiked = item?.Like?.some((like: { user_id: string }) => like.user_id === user?.id);
//      const { data: following, refetch: refetchFollowing } = useFollowing(user?.id || '');
//     // console.log(item);

//     const addLike = async () => {
//         const { error } = await supabase.from('Like').insert({
//             user_id: user?.id,
//             post_id: item.id
//         });
//         if (!error) refetch();
//     }

//     const removeLike = async () => {
//         const { error } = await supabase.from('Like').delete().eq('user_id', user?.id).eq('post_id', item.id);
//         if (!error) refetch();
//     }

//     const followUser = async () => {
//           const { error } =  await supabase.from('Followers').insert({
//             user_id: user?.id,
//             following_user_id: item?.user_id
//         });
//         if (!error) refetchFollowing();
//     }

//     const addRepost = async () => {
//         const newPost = {
//             id: Crypto.randomUUID(),
//             // user_id: user?.id,
//              user_id: item?.user_id,
//             text: item.text,
//             file: item.file,
//             place_id: item.place_id,
//             tag_name: item.tag_name,
//             repost_user_id: user?.id
//         }
//         // console.log(newPost);
    
//         const { data, error } = await supabase.from('Post').insert(newPost);
//         if (!error) refetch();
//     }

//     return (
//         <SafeAreaView className='bg-white'>
//             <ScrollView>
//                     <Card>
//                         <HStack className="items-start px-5" space='sm' >
//                             <Avatar size="md" className='mt-6'  >
//                                 {/* Fixed: Changed from item?.User to item?.user */}
//                                 <AvatarFallbackText>{item?.user?.username}</AvatarFallbackText>
//                                 <AvatarImage
//                                     source={{
//                                         uri: avatarUrl,
//                                     }}
//                                     className="w-12 h-12 rounded-full"
//                                 />
//                             {!following?.includes(item?.user_id) && user?.id !== item?.user_id &&
//                                 <AvatarBadge size='lg' style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
//                                     <Pressable onPress={followUser}>
//                                         <Plus size={3} color='white' />
//                                     </Pressable>
//                                 </AvatarBadge>
//                             }
//                             </Avatar>
//                             {item?.parent_id && <Divider orientation='vertical' className='absolute' style={{ height: 85, bottom: -50 }} />}
//                             <VStack className='flex-1' space='sm'>
//                                 <VStack >
//                                     {/* Fixed: Changed condition from item?.repost_user_id to item?.repost_user */}
//                                     {item?.repost_user && <HStack className='items-center'>
//                                         <Repeat size={14} color='black' strokeWidth={2} />
//                                           <Text size="sm" className='mx-2'>Reposted By</Text>
//                                         <Pressable onPress={() => router.push({
//                                             pathname: `/user`,
//                                             params: {  userId: item?.repost_user_id }
//                                         })}>
//                                             <Text size="sm" bold>{item?.repost_user?.username}</Text>
//                                         </Pressable>
//                                     </HStack>}
//                                 <Pressable onPress={() => router.push({
//                                     pathname: `/user`,
//                                     params: { userId: item?.user_id }
//                                 })}> 
//                                     <HStack className='items-center' space='md'>
//                                         {/* Fixed: Changed from item?.User to item?.user, something is wrong it should be User not user */}
//                                         <Text size='lg' bold>{item?.User?.username}</Text> 
//                                         <Text size='xs' className='text-gray-500 '>
//                                             {item?.created_at && formatDistanceToNow((new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
//                                                 { addSuffix: true }
//                                             )}
//                                         </Text>
//                                     </HStack>
//                                     </Pressable>
//                                     <VStack >
//                                         {/* Fixed: Changed from item?.Place to item?.place */}
//                                         {item?.Place?.name && <Text size="xs" bold >{item?.Place?.name}</Text>}
//                                     </VStack>
//                                 </VStack>
                                
//                                 <Text size='md' className='leading-6' >
//                                     {renderText(textArray)}
//                                 </Text>
                                
//                                 <View>
//                                     <View>
//                                         {item?.file && (
//                                             <Image
//                                                 source={{ uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}` }}
//                                                 className="w-full aspect-square rounded-lg"
//                                                 style={{ width: 350, height: 350 }}
//                                             />
//                                         )}
//                                     </View>
//                                     <HStack className='items-center mt-2' space='lg'>
//                                         <Pressable onPress={isLiked ? removeLike : addLike}>
//                                             <Heart size={20} color={isLiked ? 'red' : 'gray'} strokeWidth={1.5} fill={isLiked ? 'red' : 'transparent'} />
//                                         </Pressable>
//                                         <Pressable onPress={() => router.push({
//                                             pathname: '/thread',
//                                             params: { id: item.id }
//                                         })}>
//                                             <HStack className='items-center'>
//                                             <MessageCircle size={20} color='gray' strokeWidth={1.5} />
//                                              {item?.Post?.length > 0 && <Text size='sm' className='p-1' >{item?.Post?.length}</Text>}
//                                             </HStack>
//                                         </Pressable>
//                                         <Pressable onPress={addRepost}>
//                                             <Repeat size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                         <Pressable onPress={() => { }}>
//                                             <Send size={20} color='gray' strokeWidth={1.5} />
//                                         </Pressable>
//                                     </HStack>
//                                 </View>
//                             </VStack>
//                         </HStack>
//                         <Divider className='w-full mt-5' />
//                     </Card>
//                 {/* </Pressable> */}
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// THIS WORKS BEFORE THE PROPS 

// import React from 'react';
// import { HStack } from '@/components/ui/hstack';
// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
// import { Text } from '@/components/ui/text';
// import { VStack } from '@/components/ui/vstack';
// import { Divider } from '@/components/ui/divider';
// import { Plus, Heart, MessageCircle, Repeat, Send, MoreHorizontal } from 'lucide-react-native';
// import { formatDistanceToNow } from 'date-fns';
// import { Post } from '@/lib/types';
// import { Pressable, Image, View, Dimensions } from 'react-native';
// import { router } from 'expo-router';
// import Audio from '@/screens/post/audio';
// import { renderText } from '@/screens/post/input';
// import { supabase } from '@/lib/supabase';
// import { useAuth } from '@/providers/AuthProvider';
// import * as Crypto from "expo-crypto";
// import { useFollowing } from '@/hooks/use-following';

// const { width: screenWidth } = Dimensions.get('window');

// export default ({ item, refetch, }: { item: Post, refetch: () => void }) => {
//     const { user } = useAuth();
//     const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
//     const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/avatar.jpeg`;

//     const fileType = item.file?.split('.').pop();
//     const regex = /([#@]\w+)|([^#@]+)/g;
//     const textArray = item?.text?.match(regex) || [];
//     const isLiked = item?.Like?.some((like: { user_id: string }) => like.user_id === user?.id);
//     const { data: following, refetch: refetchFollowing } = useFollowing(user?.id || '');

//     const addLike = async () => {
//         const { error } = await supabase.from('Like').insert({
//             user_id: user?.id,
//             post_id: item.id
//         });
//         if (!error) refetch();
//     }

//     const removeLike = async () => {
//         const { error } = await supabase.from('Like').delete().eq('user_id', user?.id).eq('post_id', item.id);
//         if (!error) refetch();
//     }

//     const followUser = async () => {
//         const { error } = await supabase.from('Followers').insert({
//             user_id: user?.id,
//             following_user_id: item?.user_id
//         });
//         if (!error) refetchFollowing();
//     }

//     const addRepost = async () => {
//         const newPost = {
//             id: Crypto.randomUUID(),
//             user_id: item?.user_id,
//             text: item.text,
//             file: item.file,
//             place_id: item.place_id,
//             tag_name: item.tag_name,
//             repost_user_id: user?.id
//         }
        
//         const { data, error } = await supabase.from('Post').insert(newPost);
//         if (!error) refetch();
//     }

//     return (
//         <View className='bg-white'>
//             <View className='px-4 py-3'>
//                 {/* Repost indicator */}
//                 {item?.repost_user && (
//                     <View className='flex-row items-center mb-2' style={{ marginLeft: 60 }}>
//                         <Repeat size={16} color='#666' strokeWidth={1.5} />
//                         <Text size="sm" className='ml-2 text-gray-600'>
//                             Reposted by{' '}
//                             <Pressable onPress={() => router.push({
//                                 pathname: `/user`,
//                                 params: { userId: item?.repost_user_id }
//                             })}>
//                                 <Text size="sm" bold className='text-gray-800'>
//                                     {item?.repost_user?.username}
//                                 </Text>
//                             </Pressable>
//                         </Text>
//                     </View>
//                 )}

//                 <HStack className="items-start" space='sm'>
//                     {/* Avatar with follow badge */}
//                     <View className='relative'>
//                         <Pressable onPress={() => router.push({
//                             pathname: `/user`,
//                             params: { userId: item?.user_id }
//                         })}>
//                             <Avatar size="md" className='border border-gray-100'>
//                                 <AvatarFallbackText>{item?.user?.username || item?.User?.username}</AvatarFallbackText>
//                                 <AvatarImage
//                                     source={{ uri: avatarUrl }}
//                                     className="w-12 h-12 rounded-full"
//                                 />
//                             </Avatar>
//                         </Pressable>
                        
//                         {/* Follow button */}
//                         {!following?.includes(item?.user_id) && user?.id !== item?.user_id && (
//                             <View 
//                                 className='absolute -bottom-1 -right-1 items-center justify-center'
//                                 style={{
//                                     backgroundColor: '#000',
//                                     borderRadius: 12,
//                                     width: 24,
//                                     height: 24,
//                                     elevation: 2, // Android shadow
//                                     shadowColor: '#000', // iOS shadow
//                                     shadowOffset: { width: 0, height: 1 },
//                                     shadowOpacity: 0.2,
//                                     shadowRadius: 2,
//                                 }}
//                             >
//                                 <Pressable 
//                                     onPress={followUser}
//                                     style={{
//                                         width: 24,
//                                         height: 24,
//                                         alignItems: 'center',
//                                         justifyContent: 'center'
//                                     }}
//                                 >
//                                     <Plus size={14} color='white' strokeWidth={2} />
//                                 </Pressable>
//                             </View>
//                         )}
                        
//                         {/* Thread line */}
//                         {item?.parent_id && (
//                             <View 
//                                 className='absolute left-6 top-14' 
//                                 style={{ 
//                                     width: 2, 
//                                     height: 40, 
//                                     backgroundColor: '#e5e7eb' 
//                                 }} 
//                             />
//                         )}
//                     </View>

//                     {/* Main content */}
//                     <VStack className='flex-1' space='xs'>
//                         {/* Header */}
//                         <HStack className='items-center justify-between'>
//                             <HStack className='items-center flex-1' space='xs'>
//                                 <Pressable onPress={() => router.push({
//                                     pathname: `/user`,
//                                     params: { userId: item?.user_id }
//                                 })}>
//                                     <Text size='md' bold className='text-black'>
//                                         {item?.User?.username || item?.user?.username}
//                                     </Text>
//                                 </Pressable>
                                
//                                 <Text size='sm' className='text-gray-500'>
//                                      {item?.created_at && formatDistanceToNow(
//                                         (new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
//                                         { addSuffix: true }    
//                                      )}
//                                 </Text>
//                             </HStack>
                            
//                             <Pressable className='p-2 -mr-2'>
//                                 <MoreHorizontal size={20} color='#666' />
//                             </Pressable>
//                         </HStack>

//                         {/* Location */}
//                         {item?.Place?.name && (
//                             <Text size="sm" className='text-gray-600 -mt-1'>
//                                 📍 {item?.Place?.name}
//                             </Text>
//                         )}

//                         {/* Post content */}
//                         <VStack space='md'>
//                             {/* Text content */}
//                             <Text size='md' className='leading-5 text-black'>
//                                 {renderText(textArray)}
//                             </Text>

//                             {/* Image */}
//                             {item?.file && (
//                                 <View 
//                                     className='overflow-hidden' 
//                                     style={{ 
//                                         borderRadius: 12, 
//                                         borderWidth: 1, 
//                                         borderColor: '#f3f4f6',
//                                         overflow: 'hidden',
//                                     }}
//                                 >
//                                     <Image
//                                         source={{ uri: imageUrl }}
//                                         style={{ 
//                                             width: screenWidth - 80, 
//                                             height: screenWidth - 80,
//                                             maxHeight: 400 ,
//                                             borderRadius: 12,
                                            
//                                         }}
//                                         resizeMode="cover"
//                                     />
//                                 </View>
//                             )}

//                             {/* Actions */}
//                             <HStack className='items-center justify-between' style={{ paddingTop: 16 }}>
//                                 <HStack className='items-center' space='lg'>
//                                     {/* Like */}
//                                     <Pressable 
//                                         onPress={isLiked ? removeLike : addLike}
//                                         className='flex-row items-center'
//                                     >
//                                         <Heart 
//                                             size={22} 
//                                             color={isLiked ? '#ff3040' : '#666'} 
//                                             strokeWidth={1.5} 
//                                             fill={isLiked ? '#ff3040' : 'transparent'} 
//                                         />
//                                         {item?.Like?.length > 0 && (
//                                             <Text size='sm' className='ml-1 text-gray-600'>
//                                                 {item?.Like?.length}
//                                             </Text>
//                                         )}
//                                     </Pressable>

//                                     {/* Comment */}
//                                     <Pressable 
//                                         onPress={() => router.push({
//                                             pathname: '/thread',
//                                             params: { id: item.id }
//                                         })}
//                                         className='flex-row items-center'
//                                     >
//                                         <MessageCircle size={22} color='#666' strokeWidth={1.5} />
//                                         {item?.Post?.length > 0 && (
//                                             <Text size='sm' className='ml-1 text-gray-600'>
//                                                 {item?.Post?.length}
//                                             </Text>
//                                         )}
//                                     </Pressable>

//                                     {/* Repost */}
//                                     <Pressable onPress={addRepost}>
//                                         <Repeat size={22} color='#666' strokeWidth={1.5} />
//                                     </Pressable>

//                                     {/* Share */}
//                                     <Pressable onPress={() => {}}>
//                                         <Send size={22} color='#666' strokeWidth={1.5} />
//                                     </Pressable>
//                                 </HStack>
//                             </HStack>
//                         </VStack>
//                     </VStack>
//                 </HStack>
//             </View>
            
//             {/* Bottom divider */}
//             <View 
//                 className='ml-16' 
//                 style={{ 
//                     height: 1, 
//                     backgroundColor: '#f3f4f6',
//                     marginTop: 12 
//                 }} 
//             />
//         </View>
//     );
// }


// interface PostViewProps {
//     item: Post | null;
//     refetch: () => void;
//     showDivider?: boolean;
// }

////////////////////////////////////// this works has the filter format /////////////////////////////////////////////
import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Plus, Heart, MessageCircle, Repeat, Send, MoreHorizontal } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';
// import { format } from 'date-fns';
// import { format, differenceInHours, differenceInDays, differenceInMinutes } from 'date-fns';
// import {
//   format,
//   differenceInMinutes,
//   differenceInHours,
//   differenceInDays,
//   differenceInSeconds,
// } from 'date-fns';
import { Post } from '@/lib/types';
import { Pressable, Image, View, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Audio from '@/screens/post/audio';
import { renderText } from '@/screens/post/input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import * as Crypto from "expo-crypto";
import { useFollowing } from '@/hooks/use-following';

interface PostViewProps {
    item: Post | null;
    refetch: () => void;
    showDivider?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export default ({ item, refetch, showDivider = false }: PostViewProps ) => {
    if (!item) return null; 

    const { user } = useAuth();
    const imageUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item?.user_id}/${item?.file}`
    const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/avatar.jpeg`;

    const fileType = item.file?.split('.').pop();
    const regex = /([#@]\w+)|([^#@]+)/g;
    const textArray = item?.text?.match(regex) || [];
    
    // Updated to handle the new data structure from your query
    const isLiked = item?.likes?.some((like: { user_id: string }) => like.user_id === user?.id);
    const { data: following, refetch: refetchFollowing } = useFollowing(user?.id || '');

//     const createdAt = new Date(item?.created_at);
//     const now = new Date();
//     const daysDiff = differenceInDays(now, createdAt);

    // let displayTime = '';

// if (daysDiff > 7) {
//   displayTime = format(createdAt, 'dd/MM/yyyy');
// } else if (daysDiff >= 1) {
//   displayTime = `${daysDiff}d`;
// } else {
//   const hoursDiff = differenceInHours(now, createdAt);
//   if (hoursDiff >= 1) {
//     displayTime = `${hoursDiff}h`;
//   } else {
//     const minutesDiff = differenceInMinutes(now, createdAt);
//     if (minutesDiff >= 1) {
//       displayTime = `${minutesDiff}m`;
//     } else {
//       displayTime = 'now'; // 🔥 For posts just created
//     }
//   }
// }

// this these too, it  4 hours off in supabase though which is weird I'm using the basic version 
// const adjustedTimestamp = new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000;
// const now = new Date().getTime(); // Use current time as timestamp too
// let displayTime = '';

// const createdAt = new Date(item?.created_at.replace(' ', 'T') + 'Z');
// const now = new Date();
// const timeDiff = now.getTime() - createdAt.getTime();

// const secondsDiff = Math.floor(timeDiff / 1000);
// const minutesDiff = Math.floor(timeDiff / 60_000);
// const hoursDiff = Math.floor(timeDiff / 3_600_000);
// const daysDiff = Math.floor(timeDiff / 86_400_000);

// let displayTime = '';

// if (daysDiff > 7) {
//   displayTime = format(createdAt, 'dd/MM/yyyy');
// } else if (daysDiff >= 1) {
//   displayTime = `${daysDiff}d`;
// } else if (hoursDiff >= 1) {
//   displayTime = `${hoursDiff}h`;
// } else if (minutesDiff >= 1) {
//   displayTime = `${minutesDiff}m`;
// } else if (secondsDiff >= 1) {
//   displayTime = `${secondsDiff}s`;
// } else {
//   displayTime = 'now';
// }


    const addLike = async () => {
        const { error } = await supabase.from('Like').insert({
            user_id: user?.id,
            post_id: item.id
        });
        if (!error) refetch();
    }

    const removeLike = async () => {
        const { error } = await supabase.from('Like').delete().eq('user_id', user?.id).eq('post_id', item.id);
        if (!error) refetch();
    }

    const followUser = async () => {
        const { error } = await supabase.from('Followers').insert({
            user_id: user?.id,
            following_user_id: item?.user_id
        });
        if (!error) refetchFollowing();
    }

    const addRepost = async () => {
        const newPost = {
            id: Crypto.randomUUID(),
            user_id: item?.user_id,
            text: item.text,
            file: item.file,
            place_id: item.place_id,
            tag_name: item.tag_name,
            repost_user_id: user?.id
        }
        
        const { data, error } = await supabase.from('Post').insert(newPost);
        if (!error) refetch();
    }

    return (
        // <View className='bg-white'>
        <View >
            <View className='px-4 py-3'>
                {/* Repost indicator - Updated to use new data structure */}
                {item?.repost_user && (
                    <View className='flex-row items-center mb-2' style={{ marginLeft: 60 }}>
                        <Repeat size={16} color='#666' strokeWidth={1.5} />
                        <Text size="sm" className='ml-2 text-gray-600'>
                            Reposted by{' '}
                            <Pressable onPress={() => router.push({
                                pathname: `/user`,
                                params: { userId: item?.repost_user_id }
                            })}>
                                <Text size="sm" bold className='text-gray-800'>
                                    {item?.repost_user?.username}
                                </Text>
                            </Pressable>
                        </Text>
                    </View>
                )}

                <HStack className="items-start" space='sm'>
                    {/* Avatar with follow badge */}
                    <View className='relative'>
                        <Pressable onPress={() => router.push({
                            pathname: `/user`,
                            params: { userId: item?.user_id }
                        })}>
                            <Avatar size="md" className='border border-gray-100'>
                                {/* Updated to handle both User and user based on your query structure */}
                                <AvatarFallbackText>{item?.User?.username || item?.user?.username}</AvatarFallbackText>
                                <AvatarImage
                                    source={{ uri: avatarUrl }}
                                    className="w-12 h-12 rounded-full"
                                />
                            </Avatar>
                        </Pressable>
                        
                        {/* Follow button  need this below to wrok new post*/}
                        {!following?.includes(item?.user_id) && user?.id !== item?.user_id && (
                            <View 
                                className='absolute -bottom-1 -right-1 items-center justify-center'
                                style={{
                                    backgroundColor: '#000',
                                    borderRadius: 12,
                                    width: 24,
                                    height: 24,
                                    elevation: 2, // Android shadow
                                    shadowColor: '#000', // iOS shadow
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                }}
                            >
                                <Pressable 
                                    onPress={followUser}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Plus size={14} color='white' strokeWidth={2} />
                                </Pressable>
                            </View>
                        )}
                        
                        {/* Thread line */}
                        {item?.parent_id && (
                            <View 
                                className='absolute left-6 top-14' 
                                style={{ 
                                    width: 2, 
                                    height: 40, 
                                    backgroundColor: '#e5e7eb' 
                                }} 
                            />
                        )}
                    </View>

                    {/* Main content */}
                    <VStack className='flex-1' space='xs'>
                        {/* Header */}
                        <HStack className='items-center justify-between'>
                            <HStack className='items-center flex-1' space='sm'>
                                <Pressable onPress={() => router.push({
                                    pathname: `/user`,
                                    params: { userId: item?.user_id }
                                })}>
                                    <Text size='md' bold className='text-black'>
                                        {item?.User?.username || item?.user?.username}
                                    </Text>
                                </Pressable>
                                
                                <Text size='sm' className='text-gray-500'>
                                     {item?.created_at && formatDistanceToNow(
                                        (new Date(item?.created_at).getTime() - new Date().getTimezoneOffset() * 60000),
                                        { addSuffix: true }    
                                     )}
                                </Text>
                                {/* <Text size="sm" className="text-gray-500">
                                    {displayTime}
  
                                </Text> */}
                            </HStack>
                            
                            <Pressable className='p-2 -mr-2'>
                                <MoreHorizontal size={20} color='#666' />
                            </Pressable>
                        </HStack>

                        {/* Location - Updated to use new data structure */}
                        {item?.place && 
                            <Pressable onPress= { () => router.push( { pathname: '/posts', params: {placeId: item.place_id } })}>
                            <Text size="sm" className='text-gray-600 -mt-1'>
                                📍 {item?.place?.name}
                            </Text>
                            </Pressable>
                        }

                        {/* Post content */}
                        <VStack space='md'>
                            {/* Text content */}
                            <Text size='md' className='leading-5 text-black'>
                                {renderText({ textArray, post: item})}
                            </Text>

                            {/* Image */}
                            {item?.file && (
                                <View 
                                    className='overflow-hidden' 
                                    style={{ 
                                        borderRadius: 12, 
                                        borderWidth: 1, 
                                        borderColor: '#f3f4f6',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Image
                                        source={{ uri: imageUrl }}
                                        style={{ 
                                            width: screenWidth - 80, 
                                            height: screenWidth - 80,
                                            maxHeight: 400 ,
                                            borderRadius: 12,
                                            
                                        }}
                                        resizeMode="cover"
                                    />
                                </View>
                            )}

                            {/* Actions */}
                            <HStack className='items-center justify-between' style={{ paddingTop: 10 }}>
                                <HStack className='items-center' space='lg'>
                                    {/* Like - Updated to use new data structure */}
                                    <Pressable 
                                        onPress={isLiked ? removeLike : addLike}
                                        className='flex-row items-center'
                                    >
                                        <Heart 
                                            size={22} 
                                            color={isLiked ? '#ff3040' : '#666'} 
                                            strokeWidth={1.5} 
                                            fill={isLiked ? '#ff3040' : 'transparent'} 
                                        />
                                        {item?.likes?.length > 0 && (
                                            <Text size='sm' className='ml-1 text-gray-600'>
                                                {item?.likes?.length}
                                            </Text>
                                        )}
                                    </Pressable>

                                    {/* Comment - Updated to use new data structure */}
                                    <Pressable 
                                        onPress={() => router.push({
                                            pathname: '/thread',
                                            params: { id: item.id }
                                        })}
                                        className='flex-row items-center'
                                    >
                                        <MessageCircle size={22} color='#666' strokeWidth={1.5} />
                                        {item?.posts?.length > 0 && (
                                            <Text size='sm' className='ml-1 text-gray-600'>
                                                {item?.posts?.length}
                                            </Text>
                                        )}
                                    </Pressable>

                                    {/* Repost */}
                                    <Pressable onPress={addRepost}>
                                        <Repeat size={22} color='#666' strokeWidth={1.5} />
                                    </Pressable>

                                    {/* Share */}
                                    <Pressable onPress={() => {}}>
                                        <Send size={22} color='#666' strokeWidth={1.5} />
                                    </Pressable>
                                </HStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </HStack>
            </View>
            
            {/* Bottom divider */}
            <View 
                className='ml-16' 
                style={{ 
                    height: 1, 
                    // backgroundColor: '#f3f4f6',
                   backgroundColor: '#C2C3C4',
                    marginTop: 12 
                }} 
            />
        </View>
    );
}