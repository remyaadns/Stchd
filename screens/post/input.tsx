import React from 'react';
import { TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import { Post } from '@/lib/types';


export const renderText = (textArray: string[]) => {
    // remove this 
    // const regex = /([#@]\w+) | ([^#@]+)/g;
    // const parts = text?.match(regex);

    return (
        <Text className="my-2">
            { textArray?.map((part, index) => {
                if (part?.startsWith('#')) {
                    //  if (part.startsWith('#'))  || part.startsWith('@')) {
                    // // If the part starts with # or @, treat it as a hashtag or for mention tags
                    const tag = part?.toUpperCase();
                    return <Text size='md' key={index} className="font-bold">{tag}</Text>;
                } else {
                    return <Text size='md' key={index}>{part}</Text>;
                }
            
            })}
        </Text>
    )
}

export default ({ post, updatePost, textArray }: { post: Post, updatePost: (id: string, key: string, value: string )  => void, textArray: string [] }) => {
    return (
        <TextInput 
            className='text-lg'
            placeholder="what's new?"
            multiline={true}
            onChangeText={(text) => updatePost(post.id, 'text', text) }
            // onContentSizeChange={(e) => console.log(e.nativeEvent.contentSize.height) }
            >
            {renderText(textArray)}
        </TextInput>
    )          
}