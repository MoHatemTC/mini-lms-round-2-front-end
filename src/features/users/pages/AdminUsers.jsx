import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <Card>
        <CardHeader>
          <CardTitle>Users Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Users.</p>
        </CardContent>
      </Card>
    </div>
  );
}
