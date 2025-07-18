// import { AppState } from 'react-native'
// import 'react-native-url-polyfill/auto'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { createClient } from '@supabase/supabase-js'

// // console.log(process.env);
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL 
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// })

// // Tells Supabase Auth to continuously refresh the session automatically
// // if the app is in the foreground. When this is added, you will continue
// // to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// // `SIGNED_OUT` event if the user's session is terminated. This should
// // only be registered once.
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })



import { AppState, Platform } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// Create a storage adapter that works for both web and mobile
const createStorageAdapter = () => {
  if (Platform.OS === 'web') {
    // Web storage using localStorage
    return {
      getItem: (key: string) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          return Promise.resolve(window.localStorage.getItem(key))
        }
        return Promise.resolve(null)
      },
      setItem: (key: string, value: string) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value)
        }
        return Promise.resolve()
      },
      removeItem: (key: string) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key)
        }
        return Promise.resolve()
      }
    }
  } else {
    // Mobile storage using AsyncStorage
    return AsyncStorage
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL 
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})