import { X } from 'lucide-react'
import { Logo } from '../../components/logo'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Link } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
  } from "../../components/ui/dialog";
import { RegisterData } from '@/types/type'
import { useState } from 'react'
import { registerUser } from '@/Api/api'



export const RegisterButton = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="p-0 sm:max-w-sm">
          <SignUpForm />
        </DialogContent>
      </Dialog>
    );
  };
  
  // The main sign up form component
  export default function SignUpForm() {
    const [formData,setFormData] = useState<RegisterData>({
      username: "",
      email: "",
      password: "",
    });
    // Mutation for API call
    const mutation = useMutation({
      mutationFn: registerUser,
      onSuccess: (data) =>{
        console.log(`User created successfully, ${data}`);
        alert("Sign up successful");
        setFormData({username: "", email: "", password: ""});
      },
      onError: (error:Error) => {
        let errorMessage = "Sign up failed";
    
        const err = error as Error & { response?: { data?: { message?: string } } };
        if (err.response && err.response.data) {
          errorMessage = err.response.data.message || errorMessage;
        }
        
        console.log(`Error creating user: ${errorMessage}`);
        alert(errorMessage);

      }
    })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <h1 className="text-title mb-1 mt-4 text-xl font-semibold">Join QuickPostAI Today</h1>
<p className="text-sm">Create an account to turn blogs into impactful X posts.</p>

          </div>
  
          <div className="mt-6 space-y-4 sm:space-y-6">
            
  <form onSubmit={handleSubmit}>
  <div className="space-y-2">
              <Label htmlFor="username" className="block text-sm">
                Username
              </Label>
              <Input type="username" required name="username" id="username" value={formData.username} onChange={handleChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input type="email" required name="email" id="email" value={formData.email} onChange={handleChange}/>
            </div>
  
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-title text-sm">
                  Password
                </Label>
              </div>
              <Input type="password" required name="password" id="password" value={formData.password} onChange={handleChange}/>
            </div>
  
            <Button className="w-full mt-3" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Signing Up..." : "Sign Up"}
            </Button>
  </form>
            
          </div>
  
  
          
        </div>
      </div>
    );
  }
