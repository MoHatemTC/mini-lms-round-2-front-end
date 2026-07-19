import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function AdminReviews() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Reviews Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Reviews.</p>
        </CardContent>
      </Card>
    </div>
  );
}
