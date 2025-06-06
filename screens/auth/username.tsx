import React from 'react';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import Layout  from './_layout';

export default () => {
    const [username, setUsername] = React.useState('');

    const handleUsername = async () => {
        console.log(username);
    }

  return (
      <Layout onPress={ handleUsername} buttonText='Create Account'>
        <Text className='text-2xl font-bold p-10'>Verify</Text>
          <Input variant='outline' size="md" className="w-full">
            <InputField
              placeholder="Enter Username"
              value={username}
              onChangeText={setUsername}
            />

          </Input>
      </Layout>
   
  );
}