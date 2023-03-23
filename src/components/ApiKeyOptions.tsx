"use client";

import { FC, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@/utils/create-api-key";
import { useRouter } from "next/navigation";
import revokeApiKey from "@/utils/revoke-api-key";



interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKeyKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyKey }) => {

  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const router = useRouter();

  const createNewApiKey = async () => {
    setIsCreatingNew(true);

    try {
      
      await revokeApiKey(apiKeyId);
      await createApiKey();
      
      toast({
        title: "Creating Api Key",
        message: "Api key has been created successfully",
        type: "success"
      })

      router.refresh();

    } catch (error) {
      
      toast({
        title: "Error Creating Api Key",
        message: "Please try again later.",
        type: "error"
      })

    } finally {
      setIsCreatingNew(false);
    }
  }

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey(apiKeyId)

      toast({
        title: "Revoking Api Key",
        message: "Api key has been revoked successfully",
        type: "success"
      })

      router.refresh();

    } catch (error) {
      toast({
        title: "Error Revoking Api Key",
        message: "Please try again later.",
        type: "error"
      })
    } finally {
      setIsRevoking(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant="ghost" className="flex gap-2 items-center" isLoading={isCreatingNew || isRevoking}>
          <p>
            {isCreatingNew ? "Creating new key" : isRevoking ? "Revoking key" : "Options"}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => { 
          navigator.clipboard.writeText(apiKeyKey);
          toast({
            title: "Copied",
            message: "API key copied to clipboard",
            type: "success"
          })
          }}
          >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default ApiKeyOptions