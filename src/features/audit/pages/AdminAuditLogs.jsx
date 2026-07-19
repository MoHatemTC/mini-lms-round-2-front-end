import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function AdminAuditLogs() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Audit Logs.</p>
        </CardContent>
      </Card>
    </div>
  );
}
