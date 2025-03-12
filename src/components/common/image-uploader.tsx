"use client";

import { useState, useRef } from "react";
import { UploadButton } from "~/utils/uploadthing";
import type { ClientUploadedFileData } from "uploadthing/types";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

interface ProfileImageUploadProps {
  currentImage?: string | null;
  userName?: string;
  onUploadComplete: (url: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-20 w-20",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
};

export const ProfileImageUpload = ({
  currentImage,
  userName = "user",
  onUploadComplete,
  className,
  size = "lg",
}: ProfileImageUploadProps) =>{
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Updated to handle array of ClientUploadedFileData
  const handleUploadComplete = (
    res: ClientUploadedFileData<{ uploadedBy: string | undefined }>[]
  ) => {
    setIsUploading(false);
    if (res && res.length > 0 && res[0]?.url) {
      onUploadComplete(res[0].url);
      toast.success("Profile image updated successfully");
    }
  };

  const handleUploadError = (error: Error) => {
    setIsUploading(false);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar 
        ref={avatarRef}
        className={cn(
          sizeClasses[size], 
          "border-2 border-primary/20 transition-all",
          isHovering && "opacity-60"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AvatarImage
          src={currentImage ?? `/placeholder.png`}
          alt={`${userName}'s profile`}
        />
        <AvatarFallback>
          {userName?.substring(0, 2).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="w-full h-full flex items-center justify-center">
            {/* Custom button that will trigger the hidden upload button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20"
              onClick={() => {
                // Find and click the actual upload button
                const uploadButton = document.querySelector('.ut-button');
                if (uploadButton && uploadButton instanceof HTMLButtonElement) {
                  uploadButton.click();
                }
              }}
            >
              <Camera className="h-5 w-5" />
              <span className="sr-only">Upload profile image</span>
            </Button>
            
            {/* The actual UploadButton, styled to be invisible */}
            <div className="absolute opacity-0 pointer-events-none">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                onUploadBegin={() => setIsUploading(true)}
                className="ut-container:w-0 ut-container:h-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}