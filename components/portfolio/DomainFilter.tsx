'use client';

import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  domain: z.string(),
});

interface DomainFilterProps {
  domains: {
    id: number;
    Domain: string;
    ForUse: string;
    Audience: string;
  }[];
}

export default function DomainFilter({ domains }: DomainFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDomain, setSelectedDomain] = useState<string>(
    searchParams.get('domainId') || ''
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: selectedDomain,
    },
  });

  const handleDomainChange = (value: string) => {
    setSelectedDomain(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('domainId', value);
    } else {
      params.delete('domainId');
    }
    router.push(`/portfolio?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xs">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by Domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Domains</SelectLabel>
                        <SelectItem value="">All Domains</SelectItem>
                        {domains.map((domain) => (
                          <SelectItem key={domain.id} value={domain.id.toString()}>
                            {domain.Domain} ({domain.ForUse})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
} 