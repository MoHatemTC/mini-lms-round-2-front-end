import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function LearnerCoursePlay() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Course Player</h1>
      <Card>
        <CardHeader>
          <CardTitle>Now Playing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for the Course Player.</p>
        </CardContent>
      </Card>
    </div>
  );
}
