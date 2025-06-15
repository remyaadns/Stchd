import React, { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Images, Camera, ImagePlay, Mic, Hash, MapPin } from 'lucide-react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Input, InputField } from '@/components/ui/input';
import { Divider } from '@/components/ui/divider';

export default ({post, updatePost}: {post: any, updatePost: any}) => {
  const { user } = useAuth();
  const [thread, setThread] =React.useState();
  const [text, setText] = React.useState();
  // const [mainText, setMainText] = useState('');
  const [threadText, setThreadText] = useState('');
  const [showThreadInput, setShowThreadInput] = useState(false);

  const handleThreadAdd = () => {
    setShowThreadInput(true);
  }

  return (
              <HStack className="items-start px-5">
                <VStack space='sm' className='items-center'>
                  <Avatar size="md" className='mt-6'>
                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                    <AvatarImage
                      source={{ uri: user?.avatar }}
                      className="w-12 h-12 rounded-full"
                    />
                  </Avatar>
                  {/* Connecting line */}
                  <Divider orientation='vertical' className={`${showThreadInput ? 'h-20' : 'h-8'} w-0.5 bg-gray-300`}/>
                </VStack>
                
                <VStack space="md" className="flex-1">
                  <Card size="md" className="mx-3 bg-transparent">
                    <VStack className='p-3' space='lg'>
                      <VStack>
                        <Heading size="md" className="mb-1 text-black">
                          {user?.username || "No username"}
                        </Heading>
                        <Input size="md" className='border-0'>
                          <InputField 
                            placeholder="What's New?"
                            className='px-0'
                            value={post.text}
                            onChangeText={(text) => updatePost(post.id, text)}
                            // multiline
                          />
                        </Input>
                      </VStack>
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
                </VStack>
              </HStack>

  );
}