"use client";

import { FC, useState } from "react";
import Button from "@/ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "@/ui/Toast";



interface SignOutButtonProps {}


const SignOutButton: FC<SignOutButtonProps> = ({}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

    const signUserOut = async () => {
        setIsLoading(true);

        try {
            await signOut()
        } catch (error) {
            toast({
                title: "Error Signing In",
                message: "Please Try Again Later",
                type: "error"
            })
        }
    }

	return (
        <Button onClick={signUserOut} isLoading={isLoading}>
            Sign in
        </Button>
    )
};

export default SignOutButton;
