import { X } from 'lucide-react'
import { Logo } from '../../components/logo'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Link } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
} from "../../components/ui/dialog";
import { useState } from 'react'
import { LoginData } from '@/types/type'
import { useMutation } from '@tanstack/react-query'
import { loginUser, setAuthHeader } from '@/Api/api'
import useAuthStore from '@/zustand/authStore'


export const LoginButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent className="p-0 sm:max-w-sm">
                <SignInForm />
            </DialogContent>
        </Dialog>
    );
};
export default function SignInForm() {
    const [formData,setFormdata] = useState<LoginData>({
        email:"",
        password:""
    })
    const mutation = useMutation({
          mutationFn: loginUser,
          onSuccess: (data) =>{
            console.log(`User created successfully, ${data}`);
            alert("Sign in successful");
            if(data.accessToken){
                useAuthStore.setState({isAuthenticated:true,token:data.accessToken,user:data.user});
            }
            setFormdata({email: "", password: ""});
            setAuthHeader(data.accessToken);
          },
          onError: (error:Error) => {
            useAuthStore.setState({isAuthenticated:false,token:undefined,user:undefined});
            setAuthHeader(null);
            let errorMessage = "Sign in failed";
        
            const err = error as Error & { response?: { data?: { message?: string } } };
            if (err.response && err.response.data) {
              errorMessage = err.response.data.message || errorMessage;
            }
            
            console.log(`Error login user: ${errorMessage}`);
            alert(errorMessage);
    
          }
        })
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormdata({ ...formData, [e.target.name]: e.target.value });
          };
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            mutation.mutate(formData);
          };
    return (
        <div className="bg-muted w-full overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
            <div className="bg-card relative -m-px rounded-[calc(var(--radius)+.125rem)] border p-4 pb-6 sm:p-8">
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <div className="text-center">
                    <Link to="/" aria-label="go home" className="mx-auto block w-fit">
                        <Logo />
                    </Link>
                    <h1 className="text-title mb-1 mt-4 text-xl font-semibold">Welcome Back to QuickPostAI</h1>
                    <p className="text-sm">Log in to convert blogs to viral X posts in seconds</p>
                </div>

                <div className="mt-6 space-y-4 sm:space-y-6">
                    <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-sm">
                            Email
                        </Label>
                        <Input type="email" required name="email" id="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-title text-sm">
                                Password
                            </Label>
                        </div>
                        <Input type="password" required name="password" id="password" value={formData.password} onChange={handleChange} />
                    </div>

                    <Button className="w-full mt-3" type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Logging in..." : "Log in"}
                    </Button>
                    </form>
                </div>



            </div>
        </div>
    );
}
