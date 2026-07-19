import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function LearnerQuizzes() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Quizzes Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Quizzes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
