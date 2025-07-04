import React from 'react';
import { Text } from '@/components/ui/text';
import { HStack } from "@/components/ui/hstack";
import { CirclePlay, AudioLines, CirclePause, CircleStop, Circle } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useAudioRecorder, AudioModule, RecordingPresets, useAudioPlayer } from 'expo-audio';
import { usePost } from '@/providers/PostProvider';
// import { useAuth } from '@/providers/AuthProvider';
import * as Crypto from 'expo-crypto';


export default ({ id, userId, uri }: { id: string, userId: string, uri?: string }) => {
    // const { user } = useAuth();
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [recording, setRecording] = React.useState(false);
    const [playing, setPlaying] = React.useState(false);
    const [ audioUri, setAudioUri ] = React.useState('');
    const player = useAudioPlayer({uri: audioUri});
    const { uploadFile} = usePost();
    // console.log(audioRecorder);

    React.useEffect(() => {
        getPermission();
    }, []);

     React.useEffect(() => {
        if (uri) {
            const url = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${userId}/${uri}`;
            setAudioUri(uri);
            console.log('uri', uri);
        }
    }, [uri]);


    const getPermission = async () => {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        if (!status.granted) {
            alert('Permission to access microphone was denied');
        }
    };

    const play = () => {
        setPlaying(true);
        player.play();
    }

    const pause = () => {
        setPlaying(false);
        player.pause();
    }

    const startRecording = () => { 
       setRecording(true);
        audioRecorder.record();
    }

    const stopRecording = async () => {
        //   setAudioUri(audioUri);
          setRecording(false);
        await audioRecorder.stop();
        let filename = `${Crypto.randomUUID()}.m4a`;
        const file = await uploadFile(id, audioRecorder.uri || '', 'audio/m4a',filename);
        // console.log('File', file);
        let url = `${process.env.EXPO_PUBLIC_BUCKET_URL}/${userId}/${filename}`;
        // console.log('url', url);
        setAudioUri(url);
    };
        if (audioUri) {
            return (
             <HStack style={{ backgroundColor: 'lightgray' }} className='items-center w-full rounded-full p-2' space='3xl'>
            <HStack className='items-center'>
                <Pressable onPress={playing ? pause : play}>
                    {playing ? <CirclePause size={28} color="red" /> : <CirclePlay size={28} color="red" />}
                </Pressable>
                {
                    Array.from({ length: 11 }).map((_, index) => (
                        <AudioLines key={index} size={20} color='red' />
                    ))

                }
            </HStack>
        </HStack>
            );
        }

    return (
        <HStack style={{ backgroundColor: 'lightgray' }} className='items-center w-full rounded-full p-2' space='3xl'>
            <HStack className='items-center'>
                <Pressable onPress={recording ? stopRecording : startRecording}>
                    {recording ? <CircleStop size={28} color="red" /> : <Circle size={28} color="red" fill="red" />}
                </Pressable>
                {
                    Array.from({ length: 11 }).map((_, index) => (
                        <AudioLines key={index} size={20} color='red' />
                    ))

                }
            </HStack>
        </HStack>
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React from 'react';
// import { Text } from '@/components/ui/text';
// import { HStack } from "@/components/ui/hstack";
// import { CirclePlay, AudioLines, CirclePause, CircleStop, Circle } from 'lucide-react-native';
// import { Pressable } from 'react-native';
// import { useAudioRecorder, AudioModule, RecordingPresets } from 'expo-audio';

// export default () => {
//     const [hasPermission, setHasPermission] = React.useState(false);
//     const [isInitialized, setIsInitialized] = React.useState(false);
    
//     // Initialize with a recording preset
//     const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    
//     console.log('AudioRecorder full object:', audioRecorder);
//     console.log('AudioRecorder keys:', Object.keys(audioRecorder || {}));
//     console.log('Has permission:', hasPermission);
//     console.log('Is initialized:', isInitialized);
    
//     React.useEffect(() => {
//         const initializeAudio = async () => {
//             try {
//                 console.log('Initializing audio...');
                
//                 // Request permissions first
//                 const permissionResult = await getPermission();
//                 setHasPermission(permissionResult);
                
//                 if (permissionResult) {
//                     console.log('Permissions granted, initializing recorder...');
//                     setIsInitialized(true);
//                 } else {
//                     console.log('Permissions denied');
//                 }
//             } catch (error) {
//                 console.error('Initialization error:', error);
//             }
//         };
        
//         initializeAudio();
//     }, []);

//     const getPermission = async () => {
//         try {
//             console.log('Requesting permissions...');
//             const status = await AudioModule.requestRecordingPermissionsAsync();
//             console.log('Permission status:', status);
            
//             if (!status.granted) {
//                 alert('Permission to access microphone was denied');
//                 return false;
//             }
//             return true;
//         } catch (error) {
//             console.error('Permission error:', error);
//             return false;
//         }
//     };

//     const startRecording = async () => { 
//         console.log('=== START RECORDING ATTEMPT ===');
//         console.log('hasPermission:', hasPermission);
//         console.log('isInitialized:', isInitialized);
//         console.log('audioRecorder exists:', !!audioRecorder);
//         console.log('audioRecorder type:', typeof audioRecorder);
        
//         if (!hasPermission) {
//             console.log('No permission to record');
//             alert('Microphone permission is required');
//             return;
//         }
        
//         if (!audioRecorder) {
//             console.log('AudioRecorder not available');
//             alert('Audio recorder not initialized');
//             return;
//         }
        
//         try {
//             console.log('Calling audioRecorder.record()...');
            
//             // Check if record method exists
//             if (typeof audioRecorder.record !== 'function') {
//                 console.error('audioRecorder.record is not a function');
//                 console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(audioRecorder)));
//                 return;
//             }
            
//             const result = await audioRecorder.record();
//             console.log('Record method completed, result:', result);
//             console.log('AudioRecorder after record:', audioRecorder);
            
//         } catch (error) {
//             console.error('Recording failed:', error);
//             console.error('Error stack:', error.stack);
//         }
//     }

//     const stopRecording = async () => {
//         try {
//             console.log('=== STOP RECORDING ATTEMPT ===');
//             console.log('AudioRecorder before stop:', audioRecorder);
            
//             if (!audioRecorder || typeof audioRecorder.stop !== 'function') {
//                 console.error('audioRecorder.stop is not available');
//                 return;
//             }
            
//             const result = await audioRecorder.stop();
//             console.log('Stop result:', result);
//             console.log('AudioRecorder after stop:', audioRecorder);
//         } catch (error) {
//             console.error('Failed to stop recording:', error);
//             console.error('Error stack:', error.stack);
//         }
//     };

//     return (
//         <HStack style={{ backgroundColor: 'lightgray' }} className='items-center w-full rounded-full p-2' space='3xl'>
//             <HStack className='items-center'>
//                 <Pressable onPress={audioRecorder.isRecording ? stopRecording : startRecording}>
//                     {audioRecorder.isRecording ? <CircleStop size={28} color="red" /> : <Circle size={28} color="red" fill="red" />}
//                 </Pressable>
//                 {
//                     Array.from({ length: 11 }).map((_, index) => (
//                         <AudioLines key={index} size={20} color='red' />
//                     ))
//                 }
//             </HStack>
//         </HStack>
//     );
// }