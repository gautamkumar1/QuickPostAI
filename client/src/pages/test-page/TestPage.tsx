import { fetchUserData } from "@/Api/api"
import { Button } from "@/components/ui/button";
import { UserData } from "@/types/type";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";

function TestPage() {
    const [userdata , setUserData] = useState<UserData | null>(null);
    const mutation = useMutation({
        mutationFn: fetchUserData,
        onSuccess: (data) => {
            alert("User data fetched successfully");
            console.log(data);
            setUserData(data.userData);
        },
        onError: (error: Error) => {
            let errorMessage = "Failed to fetch user data";
            const err = error as Error & { response?: { data?: { message?: string } } };
            if (err.response && err.response.data) {
                errorMessage = err.response.data.message || errorMessage;
            }
            console.log(`Error fetching user data: ${errorMessage}`);
            alert(errorMessage);
            setUserData(null);
        }
    })
    const handleFetchUserData = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(1);
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Button onClick={handleFetchUserData}>
            Fetch User Data
        </Button>
        {userdata && (
            <div className="mt-4">
                <h2>User Data</h2>
                <p>ID: {userdata.id}</p>
                <p>Name: {userdata.username}</p>
                <p>Email: {userdata.email}</p>
            </div>
        )}
    </div>
  )
}

export default TestPage