// import React from "react";
// import { HStack } from "@/components/ui/hstack";
// import { Button } from "@/components/ui/button";
// import { router, useLocalSearchParams } from "expo-router";
// import { FlatList, Pressable, SafeAreaView, View } from "react-native";
// import { useAuth } from "@/providers/AuthProvider";
// import { ChevronLeft } from "lucide-react-native";
// import { Text } from "@/components/ui/text";
// import { VStack } from "@/components/ui/vstack";
// import { Divider } from "@/components/ui/divider";
// import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
// // import { PostView } from "@/components/ui/post"; 
// import  PostView  from "@/components/shared/post-view";
// // import { useThread } from "@/hooks/use-thread";
// import { usePosts } from "@/hooks/use-posts";


// export default function ThreadScreen() {
//     const { user } = useAuth();
//     const { id } = useLocalSearchParams();
//     // const { data, isLoading, error, refetch } = useThread(id as string);
//     const { data, refetch, isLoading  } = usePosts({ key: 'id', value: id as string, type: 'eq' });

//     if (!data) return null;
//     return (
//         <SafeAreaView className="bg-white flex-1">
//             <HStack className="w-full justify-between items-center p-3">
//                 <Button variant="link" onPress={() => router.back()}>
//                     <ChevronLeft size={20} color="black" />
//                     <Text className="w-12 text-black">Back</Text>
//                 </Button>
//                 <Text className="text-lg font-bold text-black">Thread</Text>
//                 <View className="w-20"/>
//             </HStack>
//             <VStack space="md">
//                 <PostView item={data[0]}/>
//                 <Divider/>
//                  <Text size="lg" bold className=" text-black px-3">Replies</Text>
//                  <Divider/>
//                  <FlatList
//                  data={data?.[0]?.Post}
//                  ListFooterComponent={() =>
//                     <Pressable onPress={() => router.push ({
//                         pathname: '/post',
//                         params: {
//                             threadId: data[0]?.id
//                         }
//                     })}>
//                 <HStack className="items-center" space="md" style={{ paddingHorizontal: 22}}>
//                     <Avatar size="sm">
//                     <AvatarFallbackText>{user?.username}</AvatarFallbackText>
//                     <AvatarImage
//                     source={{
//                         uri: user?.avatar,
//                     }}
//                     />
//                     </Avatar>
//                     <Text>Reply</Text>
//                 </HStack>
//                 </Pressable>
//                  }
//                  renderItem={({ item }) => <PostView item={item} />}
//                  />
//             </VStack>
//         </SafeAreaView>
//     );
// }



////////////////////////////////TESTER, the one above works, this one is better styled//////////////////////////////////////////////////////
/////////////////////////////////////////// this uses older format the one below uses filter format////////////////////////////////////////
// import React from "react";
// import { HStack } from "@/components/ui/hstack";
// import { Button } from "@/components/ui/button";
// import { router, useLocalSearchParams } from "expo-router";
// import { FlatList, Pressable, SafeAreaView, View, ScrollView, StatusBar } from "react-native";
// import { useAuth } from "@/providers/AuthProvider";
// import { ChevronLeft, MessageCircle } from "lucide-react-native";
// import { Text } from "@/components/ui/text";
// import { VStack } from "@/components/ui/vstack";
// import { Divider } from "@/components/ui/divider";
// import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
// import PostView from "@/components/shared/post-view";
// import { usePosts } from "@/hooks/use-posts";

// export default function ThreadScreen() {
//     const { user } = useAuth();
//     const { id } = useLocalSearchParams();
//     const { data, refetch, isLoading } = usePosts({ key: 'id', value: id as string, type: 'eq' });

//     if (!data || !data[0]) {
//         return (
//             <SafeAreaView className="bg-white flex-1">
//                 <View className="flex-1 items-center justify-center">
//                     <Text className="text-gray-500">Loading thread...</Text>
//                 </View>
//             </SafeAreaView>
//         );
//     }

//     const mainPost = data[0];
//     const replies = mainPost?.Post || [];
//     const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${user?.id}/avatar.jpeg`;

//     return (
//         // <SafeAreaView className="bg-white flex-1">
//          <SafeAreaView className="flex-1 pt-2 ">
//             <StatusBar barStyle="dark-content" backgroundColor="white" />
            
//             {/* Header */}
//             <View 
//                 className="flex-row justify-between items-center px-4 py-3"
//                 style={{ 
//                     borderBottomWidth: 1, 
//                     borderBottomColor: '#f3f4f6' 
//                 }}
//             >
//                 <Pressable 
//                     onPress={() => router.back()}
//                     className="flex-row items-center"
//                     style={{ 
//                         paddingVertical: 8, 
//                         paddingHorizontal: 8,
//                         marginLeft: -8 
//                     }}
//                 >
//                     <ChevronLeft size={24} color="#000" strokeWidth={2} />
//                 </Pressable>
                
//                 <Text className="text-lg font-bold text-black">Thread</Text>
//                 <View style={{ width: 40 }} />
//             </View>

//             <FlatList
//                 data={[{ type: 'main', data: mainPost }, ...replies.map(reply => ({ type: 'reply', data: reply }))]}
//                 showsVerticalScrollIndicator={false}
//                 keyExtractor={(item, index) => `${item.type}-${index}`}
//                 renderItem={({ item, index }) => {
//                     if (item.type === 'main') {
//                         return (
//                             <View>
//                                 <PostView item={item.data} refetch={refetch} />
                                
//                                 {/* Replies Header */}
//                                 {replies.length > 0 && (
//                                     <View className="px-4 py-3 bg-gray-50">
//                                         <Text size="md" bold className="text-black">
//                                             {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
//                                         </Text>
//                                     </View>
//                                 )}
//                             </View>
//                         );
//                     }
                    
//                     return (
//                         <View>
//                             <PostView item={item.data} refetch={refetch} />
//                         </View>
//                     );
//                 }}
//                 ListFooterComponent={() => (
//                     <View className="pb-20">
//                         {/* Reply Input */}
//                         <Pressable 
//                             onPress={() => router.push({
//                                 pathname: '/post',
//                                 params: {
//                                     threadId: mainPost?.id
//                                 }
//                             })}
//                             className="px-4 py-4 bg-white"
//                             style={{
//                                 borderTopWidth: 1,
//                                 borderTopColor: '#f3f4f6'
//                             }}
//                         >
//                             <HStack className="items-center" space="md">
//                                 <Avatar size="sm">
//                                     <AvatarFallbackText>{user?.username}</AvatarFallbackText>
//                                     <AvatarImage
//                                         source={{
//                                             uri: avatarUrl,
//                                         }}
//                                     />
//                                 </Avatar>
                                
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-base">
//                                         Reply to {mainPost?.user?.username || mainPost?.User?.username}...
//                                     </Text>
//                                 </View>
                                
//                                 <MessageCircle size={20} color="#666" strokeWidth={1.5} />
//                             </HStack>
//                         </Pressable>
                        
//                         {/* Bottom padding for safe area */}
//                         <View style={{ height: 20 }} />
//                     </View>
//                 )}
//             />
//         </SafeAreaView>
//     );
// }


////////////////////////////// Uses Filter format ///////////////////////////////////////////////
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, SafeAreaView, View, ScrollView, StatusBar } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { ChevronLeft, MessageCircle } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import PostView from "@/components/shared/post-view";
import { usePosts } from "@/hooks/use-posts";

export default function ThreadScreen() {
    const { user } = useAuth();
    const { id } = useLocalSearchParams();
    
    // Updated to use the new filters array format
    const filters = [
        { key: 'id', value: id as string, type: 'eq' as const }
    ];
    
    const { data, refetch, isLoading } = usePosts({ filters });

    if (!data || !data[0]) {
        return (
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-500">Loading thread...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const mainPost = data[0];
    // Updated to use the new data structure from your query
    const replies = mainPost?.posts || [];
    const avatarUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${user?.id}/avatar.jpeg`;

    return (
        <SafeAreaView className="flex-1 pt-2">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            
            {/* Header */}
            <View 
                className="flex-row justify-between items-center px-4 py-3"
                style={{ 
                    borderBottomWidth: 1, 
                    borderBottomColor: '#f3f4f6' 
                }}
            >
                <Pressable 
                    onPress={() => router.back()}
                    className="flex-row items-center"
                    style={{ 
                        paddingVertical: 8, 
                        paddingHorizontal: 8,
                        marginLeft: -8 
                    }}
                >
                    <ChevronLeft size={24} color="#000" strokeWidth={2} />
                </Pressable>
                
                <Text className="text-lg font-bold text-black">Thread</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={[{ type: 'main', data: mainPost }, ...replies.map(reply => ({ type: 'reply', data: reply }))]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.type}-${index}`}
                renderItem={({ item, index }) => {
                    if (item.type === 'main') {
                        return (
                            <View>
                                <PostView item={item.data} refetch={refetch} />
                                
                                {/* Replies Header */}
                                {replies.length > 0 && (
                                    <View className="px-4 py-3 bg-gray-50">
                                        <Text size="md" bold className="text-black">
                                            {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    }
                    
                    return (
                        <View>
                            <PostView item={item.data} refetch={refetch} />
                        </View>
                    );
                }}
                ListFooterComponent={() => (
                    <View className="pb-20">
                        {/* Reply Input */}
                        <Pressable 
                            onPress={() => router.push({
                                pathname: '/post',
                                params: {
                                    threadId: mainPost?.id
                                }
                            })}
                            className="px-4 py-4 bg-white"
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: '#f3f4f6'
                            }}
                        >
                            <HStack className="items-center" space="md">
                                <Avatar size="sm">
                                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                                    <AvatarImage
                                        source={{
                                            uri: avatarUrl,
                                        }}
                                    />
                                </Avatar>
                                
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-base">
                                        Reply to {mainPost?.User?.username || mainPost?.user?.username}...
                                    </Text>
                                </View>
                                
                                <MessageCircle size={20} color="#666" strokeWidth={1.5} />
                            </HStack>
                        </Pressable>
                        
                        {/* Bottom padding for safe area */}
                        <View style={{ height: 20 }} />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}