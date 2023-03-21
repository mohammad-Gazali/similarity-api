"use client";

import { FC, useState } from "react";
import Button from "@/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/Toast";



interface SignInButtonProps {}


const SignInButton: FC<SignInButtonProps> = ({}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

    const signInWithGitHub = async () => {
        
        setIsLoading(true);

        try {
            await signIn("github")
        } catch (error) {
            toast({
                title: "Error Signing In",
                message: "Please Try Again Later",
                type: "error"
            })
        }

        setIsLoading(false);
    }

	return (
        <Button onClick={signInWithGitHub} isLoading={isLoading}>
            Sign in
        </Button>
    )
};

export default SignInButton;
