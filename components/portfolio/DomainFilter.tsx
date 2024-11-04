'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Domain = {
  id: string;
  name: string;
};

interface DomainFilterProps {
  domains: Domain[];
  selectedDomain: string | null;
  onDomainChange: (domainId: string | null) => void;
}

export function DomainFilter({ domains, selectedDomain, onDomainChange }: DomainFilterProps) {
  const [open, setOpen] = useState(false);

  const selectedDomainName = domains.find(domain => domain.id === selectedDomain)?.name || "All Domains";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedDomainName}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search domains..." />
          <CommandEmpty>No domain found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                onDomainChange(null);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  !selectedDomain ? "opacity-100" : "opacity-0"
                )}
              />
              All Domains
            </CommandItem>
            {domains.map((domain) => (
              <CommandItem
                key={domain.id}
                onSelect={() => {
                  onDomainChange(domain.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedDomain === domain.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {domain.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 