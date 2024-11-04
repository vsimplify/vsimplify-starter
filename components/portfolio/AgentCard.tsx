'use client';

import React from 'react';
import { Agent } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AgentCardProps {
  agent: Agent; // Ensure it accepts an Agent object
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle>{agent.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{agent.description}</p>
      </CardContent>
    </Card>
  );
};

export default AgentCard; 