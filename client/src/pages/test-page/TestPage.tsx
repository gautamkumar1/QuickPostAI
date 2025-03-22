import { fetchUserData } from '@/Api/api';
import { UserData } from '@/types/type'
import useAuthStore from '@/zustand/authStore';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'

function TestPage() {
    const {user} = useAuthStore.getState();
    const [userdata,setUserData] = useState<UserData>({
        id:0,
        username:"",
        email:""
    })
    const mutation = useMutation({
        mutationFn:fetchUserData,
        onSuccess: (data) =>{
            console.log(`User data fetched successfully, ${JSON.stringify(data.userData)}`);
            setUserData(data.userData);
        },
        onError: (error:Error) => {
            console.log(`Error fetching user data: ${error}`);
        }
    })
    const handleFetchUserData = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(user?.id);
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <button onClick={handleFetchUserData}>Fetch User Data</button>
        <p>{userdata.username}</p>
        <p>{userdata.email}</p>
    </div>
  )
}

export default TestPage