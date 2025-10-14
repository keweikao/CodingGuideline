// components/app/DailyActivityList.tsx
'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface Activity {
  id: string;
  description: string;
  isCompleted: boolean;
  isCustom: boolean;
}

interface DailyActivityListProps {
  activities: Activity[];
  onToggleComplete: (activityId: string, isCompleted: boolean) => void;
  onUpdateDescription: (activityId: string, description: string) => void;
}

export function DailyActivityList({ activities, onToggleComplete, onUpdateDescription }: DailyActivityListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setEditText(activity.description);
  };

  const handleSave = (activityId: string) => {
    onUpdateDescription(activityId, editText);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <Checkbox
            id={activity.id}
            checked={activity.isCompleted}
            onCheckedChange={(checked) => onToggleComplete(activity.id, !!checked)}
            className="w-6 h-6"
          />
          <div className="flex-1" onDoubleClick={() => handleEdit(activity)}>
            {editingId === activity.id ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleSave(activity.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave(activity.id)}
                autoFocus
              />
            ) : (
              <label
                htmlFor={activity.id}
                className={`text-lg ${activity.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                {activity.description}
              </label>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
