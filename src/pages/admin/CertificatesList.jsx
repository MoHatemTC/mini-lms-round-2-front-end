import { useState } from "react";
import { Award, Search, Plus, Download, Eye, Copy, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Mock Data
const mockCertificates = [
  {
    id: "c1",
    name: "Master Developer Certificate",
    course: "Advanced React Patterns",
    issued: 1245,
    template: "Modern Tech",
    status: "active",
  },
  {
    id: "c2",
    name: "UI/UX Excellence",
    course: "Figma for UI/UX Design",
    issued: 832,
    template: "Creative Studio",
    status: "active",
  },
  {
    id: "c3",
    name: "Data Science Foundation",
    course: "Python Data Science Bootcamp",
    issued: 3210,
    template: "Academic Standard",
    status: "active",
  },
  {
    id: "c4",
    name: "Frontend Architect",
    course: "Fullstack Next.js",
    issued: 45,
    template: "Modern Tech",
    status: "draft",
  },
  {
    id: "c5",
    name: "Legacy Developer",
    course: "Intro to jQuery",
    issued: 8900,
    template: "Classic Standard",
    status: "archived",
  },
];

export default function CertificatesList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertificates = mockCertificates.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Certificates"
        description="Manage certificate templates and track issuances across your courses."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Certificates" },
        ]}
      >
        <Button className="btn-gradient shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-center border-primary/20 bg-primary/5">
          <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-foreground">14,232</h3>
          <p className="text-sm font-medium text-text-secondary mt-1">
            Total Certificates Issued
          </p>
        </Card>

        <Card className="p-0 border-border bg-card col-span-1 md:col-span-2 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-background/50 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 rounded-lg bg-background border-border text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-5 py-3 font-semibold">Template Name</th>
                  <th className="px-5 py-3 font-semibold">Associated Course</th>
                  <th className="px-5 py-3 font-semibold">Issued</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCertificates.map((cert) => (
                  <tr
                    key={cert.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-foreground">
                        {cert.name}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        Style: {cert.template}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">
                      {cert.course}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-medium">
                        {cert.issued.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {cert.status === "active" && (
                        <Badge variant="success" className="h-[22px]">
                          Active
                        </Badge>
                      )}
                      {cert.status === "draft" && (
                        <Badge variant="secondary" className="h-[22px]">
                          Draft
                        </Badge>
                      )}
                      {cert.status === "archived" && (
                        <Badge variant="outline" className="h-[22px]">
                          Archived
                        </Badge>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-text-secondary hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-text-secondary hover:text-foreground"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-text-secondary hover:text-foreground"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
