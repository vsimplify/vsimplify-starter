'use client';

import { Mission } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

type ActivityTimelineProps = {
  activities: Mission[];
};

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedActivities.map((activity) => (
        <Card key={activity.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
} 