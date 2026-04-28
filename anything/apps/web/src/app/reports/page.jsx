import React, { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardHeader, Pill, Button } from "../../components/ui/core";
import { Tabs } from "../../components/ui/Tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FileText,
  Download,
  ExternalLink,
  Filter,
  Calendar,
  Search,
} from "lucide-react";

const reportTabs = [
  { id: "all", label: "All Reports" },
  { id: "ghg", label: "GHG Protocol" },
  { id: "sasb", label: "SASB Compliance" },
  { id: "sec", label: "SEC Disclosures" },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await fetch("/api/reports");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (standard) => {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${standard} Annual Disclosure ${new Date().getFullYear()}`,
          standard: standard,
        }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  return (
    <DashboardLayout activeId="reports">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs tabs={reportTabs} activeTab={activeTab} onChange={setActiveTab} />
        <Button onClick={() => generateMutation.mutate("GHG Protocol")}>
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <Button variant="secondary" className="gap-2">
                <Calendar className="w-4 h-4" /> Date Range
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-white">
                  <th className="px-6 py-4 font-semibold text-[#111827]">
                    Report Name
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#111827]">
                    Standard
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#111827]">
                    Generated Date
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#111827]">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#111827] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="bg-white hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#EFF6FF] rounded-lg border border-[#DBEAFE]">
                          <FileText className="w-4 h-4 text-[#2563EB]" />
                        </div>
                        <span className="font-medium text-[#111827]">
                          {report.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Pill variant="outline">{report.standard}</Pill>
                    </td>
                    <td className="px-6 py-4 text-[#6B7280]">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Pill variant="status" dotColor="bg-green-500">
                        {report.status}
                      </Pill>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-1.5 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {isLoading &&
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="animate-pulse bg-white">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="h-4 bg-[#F3F4F6] rounded w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                <Shield className="w-4 h-4 text-[#2563EB]" />
              </div>
              <h4 className="text-sm font-semibold text-[#111827]">
                Audit Trail
              </h4>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Every report includes a cryptographically signed audit trail of
              data sources, calculation methods, and reviewer logs.
            </p>
            <Button
              variant="ghost"
              className="justify-start px-0 text-[#2563EB]"
            >
              View Security Specs
            </Button>
          </Card>

          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                <Target className="w-4 h-4 text-[#2563EB]" />
              </div>
              <h4 className="text-sm font-semibold text-[#111827]">
                Compliance Check
              </h4>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Our regulatory engine tracks shifts in SEC and CSRD requirements
              to ensure your disclosures remain up-to-date.
            </p>
            <Button
              variant="ghost"
              className="justify-start px-0 text-[#2563EB]"
            >
              Regulatory Roadmap
            </Button>
          </Card>

          <Card className="bg-[#EFF6FF] border-[#BFDBFE] flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-[#2563EB] mb-2">
                Pro: ESG Certification
              </h4>
              <p className="text-xs text-[#1D4ED8] leading-relaxed">
                Export directly to certification bodies like B-Corp or CDP with
                our verified JSON schema.
              </p>
            </div>
            <Button
              variant="soft"
              className="w-full bg-white hover:bg-[#F0F7FF] mt-4"
            >
              Upgrade to Pro
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Shield({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function Target({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
