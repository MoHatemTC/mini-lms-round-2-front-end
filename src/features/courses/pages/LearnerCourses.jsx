import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function LearnerCourses() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
      <Card>
        <CardHeader>
          <CardTitle>My Courses Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for My Courses.</p>
        </CardContent>
      </Card>
    </div>
  );
}
