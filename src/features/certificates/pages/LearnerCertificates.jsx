import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default function LearnerCertificates() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
      <Card>
        <CardHeader>
          <CardTitle>Certificates Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">This is a placeholder page for Certificates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
