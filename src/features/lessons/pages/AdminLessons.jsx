import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function AdminLessons() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lessons Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Lessons.</p>
        </CardContent>
      </Card>
    </div>
  );
}
