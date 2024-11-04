'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  domainId: z.string().min(1, "Domain is required"),
  portfolioId: z.string().min(1, "Portfolio is required"),
  goal: z.string().min(1, "Goal is required"),
  objective: z.string().min(1, "Objective is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  email: z.string().email("Invalid email address"),
});

interface CreateProjectFormProps {
  domains: {
    id: number;
    Domain: string;
    ForUse: string;
  }[];
  portfolios: {
    id: string;
    title: string;
  }[];
  userId: string;
}

export default function CreateProjectForm({ domains, portfolios, userId }: CreateProjectFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      domainId: "",
      portfolioId: "",
      goal: "",
      objective: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('Project')
        .insert({
          description: values.description,
          domainId: parseInt(values.domainId),
          dueOn: values.dueDate.toISOString(),
          email: values.email,
          goal: values.goal,
          nugget: '',
          objective: values.objective,
          outcome: '',
          user_id: userId,
          portfolioId: values.portfolioId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      router.push('/project');
      router.refresh();
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <FormField
          control={form.control}
          name="portfolioId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio</FormLabel>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Portfolio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Portfolios</SelectLabel>
                    {portfolios.map((portfolio) => (
                      <SelectItem
                        key={portfolio.id}
                        value={portfolio.id}
                        onClick={() => field.onChange(portfolio.id)}
                      >
                        {portfolio.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="domainId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Domains</SelectLabel>
                    {domains.map((domain) => (
                      <SelectItem
                        key={domain.id}
                        value={domain.id.toString()}
                        onClick={() => field.onChange(domain.id.toString())}
                      >
                        {domain.Domain} ({domain.ForUse})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Project Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal</FormLabel>
              <FormControl>
                <Input placeholder="Project Goal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input placeholder="Project Objective" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </Form>
  );
} 