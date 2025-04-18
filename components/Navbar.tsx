// vsimplify-starter/components/Navbar.tsx
'use client'

import { AvatarIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import React, { useState, useRef, useEffect } from "react";
import { Database } from "@/types/supabase";
import ClientSideCredits from "./realtime/ClientSideCredits";
import { User, LogIn, UserPlus, X, Menu } from "lucide-react";
import Image from "next/image";
const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";

export default function Navbar() {
  const supabase = createClientComponentClient<Database>();

  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUser(data.user);

      if (data.user) {
        const { data: creditData, error: creditError } = await supabase
          .from("credits")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (!creditError && creditData) {
          setCredits(creditData);
        } else {
          console.error("Error fetching credits:", creditError);
        }
      }
    };

    fetchUser();
  }, [supabase]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-between w-full px-4 sm:px-6 lg:px-10 py-4 items-center border-b bg-gradient-to-r text-white shadow-md p-4 bg-gray-800">
    {/*  from-indigo-600 to-blue-500 <nav className="flex items-center justify-between p-4 bg-gray-800"> */}
      <div className="flex items-center">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/QuickForAnswer_Logo.svg"
              alt="QuickForAnswer Logo"
              width={40}
              height={40}
              className="mr-2"
              priority
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight flex items-center">
              Quick<span className="text-white">ForAnswer</span> <sup className="text-yellow-300">α</sup>
            </h2>
          </div>
        </Link>
        <button onClick={toggleMenu} className="text-white lg:hidden">
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-label="Close Menu" />
          ) : (
            <Menu className="h-6 w-6" aria-label="Open Menu" />
          )}
        </button>
        <div className={`lg:flex ${isMenuOpen ? "block" : "hidden"} transition-all duration-300`}>
          {/* <Link href="/" className="text-white px-4">Home</Link>
          <Link href="/about" className="text-white px-4">About</Link>
          <Link href="/services" className="text-white px-4">Services</Link> */}
          {/* Add more links as needed */}
          {/* Navigation Links */}
      {user && (
        <div className="hidden lg:flex flex-row gap-4 ml-10">
          <Link href="/overview">
            <Button variant={"ghost"} className="text-white hover:text-yellow-300">
              Home
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant={"ghost"} className="text-white hover:text-yellow-300">
              Portfolios
            </Button>
          </Link>
          <Link href="/project">
            <Button variant={"ghost"} className="text-white hover:text-yellow-300">
              Projects
            </Button>
          </Link>
          <Link href="/activity">
            <Button variant={"ghost"} className="text-white hover:text-yellow-300">
              Activities
            </Button>
          </Link>
          {packsIsEnabled && (
            <Link href="/overview/packs">
              <Button variant={"ghost"} className="text-white hover:text-yellow-300">
                AI Agents
              </Button>
            </Link>
          )}
          {stripeIsConfigured && (
            <Link href="/support-us">
              <Button variant={"ghost"} className="text-white hover:text-yellow-300">
                Support Us
              </Button>
            </Link>
          )}
        </div>
)}
          </div>

      {/* User Authentication */}
      <div className="flex gap-4 lg:ml-auto absolute right-0 top-7 pr-4 items-center">
        {!user && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={showUserMenu}
            >
              <User className="h-6 w-6" />
            </button>
            {showUserMenu && (
              <div
                ref={userMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogIn className="inline-block w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <UserPlus className="inline-block w-4 h-4 mr-2" />
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
        {user && (
          <div className="flex flex-row gap-4 text-center items-center">
            {stripeIsConfigured && <ClientSideCredits creditsRow={credits ? credits : null} />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <AvatarIcon height={24} width={24} className="text-yellow-300" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border border-yellow-300">
                <DropdownMenuLabel className="text-yellow-300 text-center overflow-hidden text-ellipsis">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form action="/auth/sign-out" method="post">
                  <Button
                    type="submit"
                    className="w-full text-left text-white hover:text-yellow-300"
                    variant={"ghost"}
                  >
                    Log out
                  </Button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}