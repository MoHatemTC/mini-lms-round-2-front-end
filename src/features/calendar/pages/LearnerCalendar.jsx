import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function LearnerCalendar() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
      <Card>
        <CardHeader>
          <CardTitle>Calendar Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Calendar.</p>
        </CardContent>
      </Card>
    </div>
  );
}
