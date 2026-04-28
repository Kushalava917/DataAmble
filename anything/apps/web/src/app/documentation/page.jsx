"use client";

import { useState } from "react";
import { FileText, Download, CheckCircle2, Loader2 } from "lucide-react";

export default function DocumentationPage() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    setDownloaded(false);

    try {
      const response = await fetch("/api/stakeholder-doc", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const disposition = response.headers.get("content-disposition") || "";
      const filenameMatch = disposition.match(/filename=\"?([^\";]+)\"?/i);
      const filename =
        filenameMatch?.[1] || "DataAmble-Stakeholder-Documentation.pdf";
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download document. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <a
            href="/"
            className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-start gap-6 mb-12">
          <div className="w-16 h-16 rounded-lg border border-[#E5E7EB] flex items-center justify-center bg-[#F9FAFB]">
            <FileText className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[#111827] mb-3 font-inter">
              Stakeholder Documentation
            </h1>
            <p className="text-lg text-[#6B7280] font-inter">
              Comprehensive guide for communicating DataAmble's value to
              executives, investors, and team members
            </p>
          </div>
        </div>

        {/* Document Preview Card */}
        <div className="border border-[#E5E7EB] rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#111827] mb-4 font-inter">
            What's Inside This Document
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-[#111827] mb-3 font-inter">
                Strategic Content
              </h3>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-0.5">•</span>
                  <span>Executive Summary & Value Proposition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-0.5">•</span>
                  <span>Problem Statement & Market Context</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-0.5">•</span>
                  <span>Business Value & ROI Analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-0.5">•</span>
                  <span>Competitive Differentiation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3B82F6] mt-0.5">•</span>
                  <span>Financial Model & Growth Projections</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#111827] mb-3 font-inter">
                Technical & Operational
              </h3>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5">•</span>
                  <span>Platform Architecture & Data Flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5">•</span>
                  <span>Implementation Guide (4-Phase Roadmap)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5">•</span>
                  <span>Security & Compliance Overview</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5">•</span>
                  <span>Feature Roadmap (Current → 18 Months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5">•</span>
                  <span>Risk Mitigation Strategies</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6 mb-6">
            <h3 className="text-sm font-semibold text-[#111827] mb-3 font-inter">
              🎯 Stakeholder Communication Guide
            </h3>
            <p className="text-sm text-[#4B5563] mb-3">
              Includes tailored messaging for different audiences:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-medium text-[#374151]">
                Board/CEO
              </span>
              <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-medium text-[#374151]">
                CFO
              </span>
              <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-medium text-[#374151]">
                COO
              </span>
              <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-medium text-[#374151]">
                Sustainability Team
              </span>
              <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-medium text-[#374151]">
                Investors
              </span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full h-12 bg-[#111827] hover:bg-[#000000] disabled:bg-[#D1D5DB] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {downloading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : downloaded ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Downloaded Successfully</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Stakeholder PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <div className="text-3xl font-bold text-[#3B82F6] mb-2 font-inter">
              80%
            </div>
            <div className="text-sm font-medium text-[#111827] mb-1">
              Effort Reduction
            </div>
            <div className="text-xs text-[#6B7280]">
              Automated data collection vs. manual spreadsheets
            </div>
          </div>

          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <div className="text-3xl font-bold text-[#10B981] mb-2 font-inter">
              $75K+
            </div>
            <div className="text-sm font-medium text-[#111827] mb-1">
              Annual Savings
            </div>
            <div className="text-xs text-[#6B7280]">
              Reduced consulting fees and audit costs
            </div>
          </div>

          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <div className="text-3xl font-bold text-[#F59E0B] mb-2 font-inter">
              &lt;90
            </div>
            <div className="text-sm font-medium text-[#111827] mb-1">
              Days to Deploy
            </div>
            <div className="text-xs text-[#6B7280]">
              From kickoff to full production readiness
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-12 border-t border-[#E5E7EB] pt-12">
          <h2 className="text-2xl font-semibold text-[#111827] mb-6 font-inter">
            When to Use This Document
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 bg-[#F9FAFB]">
                <span className="text-lg">👔</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#111827] mb-1">
                  Executive Briefings
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Present to board members, C-suite executives, or steering
                  committees
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 bg-[#F9FAFB]">
                <span className="text-lg">💰</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#111827] mb-1">
                  Investor Meetings
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Pitch to VCs, angel investors, or strategic partners
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 bg-[#F9FAFB]">
                <span className="text-lg">🤝</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#111827] mb-1">
                  Partner Onboarding
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Share with consultancies, ERP vendors, or channel partners
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 bg-[#F9FAFB]">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#111827] mb-1">
                  Internal Alignment
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Educate sales, marketing, and customer success teams
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#6B7280]">
            <strong className="text-[#111827]">Note:</strong> This document is
            updated to reflect DataAmble's current capabilities as of April 14,
            2026. For the latest feature updates or custom documentation
            requests, contact your customer success manager.
          </p>
        </div>
      </div>
    </div>
  );
}
