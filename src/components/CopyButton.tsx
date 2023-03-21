"use client"

import { ButtonHTMLAttributes, FC } from "react";
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import Icons from "@/components/Icons";



interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    valueToCopy: string
}


const CopyButton: FC<CopyButtonProps> = ({
    valueToCopy, className, ...props
}) => {
  return (
    <Button 
    {...props}
    variant="ghost"
    className={className}
    onClick={() => {
    navigator.clipboard.writeText(valueToCopy);
    toast({
        title: "Copied!",
        message: "API key copied to clipboard",
        type: "success"
    });
    }}
    >
        <Icons.Copy className="w-5 h-5" />
    </Button>
  )
}

export default CopyButton