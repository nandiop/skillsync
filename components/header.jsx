"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";

export default function Header({ user }) {
  return (
    
      <div className="w-full relative overflow-hidden">
        <header className="fixed top-7 left-0 right-0 mx-auto max-w-screen-xl w-full px-4 rounded-2xl border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">

      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex group transition-all ease">
          <Image
            src="/SkillSync final logo-1-03.png"
            alt="SkillSync.ai Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain transition-all duration-500 ease-linear group-hover:rotate-45"
          />
           <Image
            src="/SkillSync final logo-2-03.png"
            alt="SkillSync.ai Logo"
            width={200}
            height={60}
            className=" h-12 py-1 w-auto object-contain ml-2 transition-all duration-500 ease-linear group-hover:opacity-100"
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {user?.id && (
            <Link href="/dashboard">
              <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
            </Link>
          )}

          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume ATS Check
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ai-cover-letter" className="flex items-center gap-2">
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
    </div>
  );
}
