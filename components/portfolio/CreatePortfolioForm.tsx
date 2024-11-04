'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

type Domain = Database['public']['Tables']['Domain']['Row'];

type CreatePortfolioFormProps = {
  domains: Domain[];
  userId: string;
};

type WSJFFields = {
  userBusinessValue: number;
  timeValue: number;
  riskReductionValue: number;
  jobSize: number;
};

export default function CreatePortfolioForm({ domains, userId }: CreatePortfolioFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [selectedForUse, setSelectedForUse] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [wsjf, setWSJF] = useState<WSJFFields>({
    userBusinessValue: 1,
    timeValue: 1,
    riskReductionValue: 1,
    jobSize: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter unique ForUse values based on selected domain
  const forUseOptions = [...new Set(
    domains
      .filter(d => !selectedDomain || d.Domain === selectedDomain)
      .map(d => d.ForUse)
  )];

  // Filter unique Audience values based on selected ForUse
  const audienceOptions = [...new Set(
    domains
      .filter(d => (!selectedDomain || d.Domain === selectedDomain) && 
                   (!selectedForUse || d.ForUse === selectedForUse))
      .map(d => d.Audience)
  )];

  // Calculate WSJF score
  const calculateWSJF = (fields: WSJFFields) => {
    const costOfDelay = fields.userBusinessValue + fields.timeValue + fields.riskReductionValue;
    return costOfDelay / fields.jobSize;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Find the selected domain ID
      const selectedDomainId = domains.find(d => 
        d.Domain === selectedDomain && 
        d.ForUse === selectedForUse && 
        d.Audience === selectedAudience
      )?.id;

      if (!selectedDomainId) {
        throw new Error('Please select a valid domain');
      }

      const wsjfScore = calculateWSJF(wsjf);

      const { data, error } = await supabase
        .from('portfolios')
        .insert([
          {
            title,
            description,
            user_id: userId,
            domainId: selectedDomainId,
            status: 'active',
            wsjf_score: wsjfScore,
            ...wsjf
          }
        ])
        .select()
        .single();

      if (error) throw error;

      router.push(`/portfolio/${data.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error creating portfolio:', error);
      // Add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Domain</label>
          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger>
              <SelectValue placeholder="Select Domain" />
            </SelectTrigger>
            <SelectContent>
              {[...new Set(domains.map(d => d.Domain))].map(domain => (
                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">For Use</label>
          <Select 
            value={selectedForUse} 
            onValueChange={setSelectedForUse}
            disabled={!selectedDomain}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select For Use" />
            </SelectTrigger>
            <SelectContent>
              {forUseOptions.map(forUse => (
                <SelectItem key={forUse} value={forUse}>{forUse}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Audience</label>
          <Select 
            value={selectedAudience} 
            onValueChange={setSelectedAudience}
            disabled={!selectedForUse}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Audience" />
            </SelectTrigger>
            <SelectContent>
              {audienceOptions.map(audience => (
                <SelectItem key={audience} value={audience}>{audience}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="Portfolio Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">WSJF Estimation</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">User Business Value (1-10)</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={wsjf.userBusinessValue}
                onChange={(e) => setWSJF({...wsjf, userBusinessValue: parseInt(e.target.value)})}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Time Value (1-10)</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={wsjf.timeValue}
                onChange={(e) => setWSJF({...wsjf, timeValue: parseInt(e.target.value)})}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Risk Reduction Value (1-10)</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={wsjf.riskReductionValue}
                onChange={(e) => setWSJF({...wsjf, riskReductionValue: parseInt(e.target.value)})}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Job Size (1-10)</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={wsjf.jobSize}
                onChange={(e) => setWSJF({...wsjf, jobSize: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            WSJF Score: {calculateWSJF(wsjf).toFixed(2)}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Portfolio'}
      </Button>
    </form>
  );
} 