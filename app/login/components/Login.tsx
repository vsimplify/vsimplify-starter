"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import disposableDomains from "disposable-email-domains";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { 
  AiOutlineGoogle, 
  AiOutlineGithub,
  AiOutlineApple,
  AiFillFacebook 
} from "react-icons/ai";
import { WaitingForMagicLink } from "./WaitingForMagicLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Inputs = {
  email: string;
};

export default function Login({ host }: { host: string | null }) {
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setIsMagicLinkSent(true);
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'apple' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isMagicLinkSent) {
    return <WaitingForMagicLink toggleState={() => setIsMagicLinkSent(false)} />;
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Sign in to continue to your account.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="email">
          <AccordionTrigger className="text-lg">Email Login</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                  validate: (value) =>
                    !disposableDomains.includes(value.split("@")[1]) ||
                    "Disposable email addresses are not allowed",
                })}
                className="bg-white dark:bg-neutral-800"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Magic Link
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="social">
          <AccordionTrigger className="text-lg">Social Login</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2"
              >
                <AiOutlineGoogle className="h-5 w-5" /> Google
              </Button>
              {/* <Button
                variant="outline"
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center gap-2"
              >
                <AiOutlineGithub className="h-5 w-5" /> GitHub
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('apple')}
                className="flex items-center justify-center gap-2"
              >
                <AiOutlineApple className="h-5 w-5" /> Apple
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center gap-2"
              >
                <AiFillFacebook className="h-5 w-5" /> Facebook
              </Button> */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 