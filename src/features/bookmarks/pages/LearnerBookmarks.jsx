import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function LearnerBookmarks() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
      <Card>
        <CardHeader>
          <CardTitle>Bookmarks Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Bookmarks.</p>
        </CardContent>
      </Card>
    </div>
  );
}
