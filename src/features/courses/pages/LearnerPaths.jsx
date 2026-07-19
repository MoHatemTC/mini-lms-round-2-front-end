import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function LearnerPaths() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Learning Paths</h1>
      <Card>
        <CardHeader>
          <CardTitle>Learning Paths Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Learning Paths.</p>
        </CardContent>
      </Card>
    </div>
  );
}
