import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function AdminRoles() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Roles & Permissions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
