'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type BrowseAIAgentsProps = {
  onClose: () => void;
  selectedDomain: string | null;
};

export default function BrowseAIAgents({ onClose, selectedDomain }: BrowseAIAgentsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Browse AI Agents</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* Add your agent browsing content here */}
          <p>Domain: {selectedDomain || 'All'}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}