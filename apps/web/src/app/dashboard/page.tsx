import { ComplianceScoreCard } from "@/components/dashboard/ComplianceScoreCard";
import { RecentAuditRuns } from "@/components/dashboard/RecentAuditRuns";
import { ControlCoverageChart } from "@/components/dashboard/ControlCoverageChart";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          Compliance readiness overview for your organization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComplianceScoreCard framework="SOC 2" score={74} trend="+8" />
        <ComplianceScoreCard framework="ISO 27001" score={61} trend="+3" />
        <ComplianceScoreCard framework="HIPAA" score={88} trend="+12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ControlCoverageChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <RecentAuditRuns />
    </div>
  );
}
