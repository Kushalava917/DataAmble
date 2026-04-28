
function createMarkdownFallbackResponse(markdown) {
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="DataAmble-Stakeholder-Documentation.md"',
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request) {
  const markdown = `
# DataAmble Platform
## Stakeholder Documentation

---

## Executive Summary

**DataAmble** is an AI-driven carbon management SaaS platform designed to help mid-sized enterprises (100-5,000 employees) automate emissions tracking, reporting, and decarbonization planning. The platform addresses the critical gap between regulatory compliance requirements (SEC, EU CSRD) and the manual, error-prone processes that 63% of firms still rely on.

**Key Value Propositions:**
- **80% reduction** in manual carbon accounting effort
- **Real-time visibility** into Scope 1, 2, and 3 emissions
- **Audit-ready reports** aligned to GHG Protocol, SASB, and SEC standards
- **AI-powered Scope-3 estimation** for supply chain emissions
- **Scenario modeling** for decarbonization planning

**Target Market:** Mid-market enterprises in North America and Europe across manufacturing, technology, retail, and financial services sectors facing ESG commitments and regulatory disclosure obligations.

---

## The Problem We're Solving

### Market Context
Companies globally face mounting pressure to track and reduce greenhouse gas (GHG) emissions from three sources:

1. **Regulatory Mandates**: The SEC's climate disclosure rule (2024), EU Corporate Sustainability Reporting Directive (CSRD), and similar frameworks require annual emissions reporting with third-party audit.

2. **Stakeholder Pressure**: Investors, customers, and employees demand transparency. 63% of global companies have made net-zero commitments, creating urgent need for measurement tools.

3. **Operational Complexity**: Emissions data is scattered across energy bills, travel records, procurement systems, and supply chains. Consolidating this data manually is costly and error-prone.

### Current Pain Points

**For Sustainability Teams:**
- Spending 200+ hours annually on manual data collection and spreadsheet management
- High risk of calculation errors and data inconsistencies
- Difficulty estimating Scope 3 (supply chain) emissions, which often represent 70-90% of total footprint
- Inability to model "what-if" scenarios for decarbonization investments

**For Finance/Operations:**
- Lack of integration between carbon data and existing ERP/financial systems
- Expensive external consultants required for report preparation ($50K-$200K annually)
- Audit readiness concerns due to poor data lineage and documentation

**For Leadership:**
- No real-time visibility into carbon performance against targets
- Difficulty allocating capital to highest-impact reduction initiatives
- Competitive disadvantage if peers achieve earlier compliance and superior ESG ratings

### Market Validation
- The carbon accounting software market was $18B in 2026 and is growing at 11% CAGR
- A 2025 study found 63% of firms still use spreadsheets for emissions tracking
- SEC rule implementation caused a 40% surge in platform demand in H1 2025

---

## How DataAmble Solves It

DataAmble is a cloud-native SaaS platform that automates the entire carbon management lifecycle—from data ingestion to reporting to strategic planning.

### Core Platform Capabilities

**1. Intelligent Data Ingestion**
- **CSV/Excel Upload**: Drag-and-drop interface for energy bills, travel logs, and procurement data
- **ERP Integration** (Roadmap): Direct API connections to SAP, Oracle, Microsoft Dynamics
- **Smart Taxonomy AI**: Automatically categorizes expenses and suppliers into emissions categories using machine learning
- **Validation Engine**: Flags anomalies and missing data in real-time

**2. Automated Emissions Calculation**
- **Scope 1 (Direct)**: Facility fuels, company vehicles, refrigerants
- **Scope 2 (Indirect Energy)**: Purchased electricity, steam, heating/cooling
- **Scope 3 (Supply Chain)**: Business travel, employee commuting, purchased goods, logistics
- **Emissions Factor Library**: Built-in databases from EPA, IPCC, DEFRA updated automatically
- **AI-Enhanced Scope 3**: Machine learning models estimate supplier footprints based on spend categories when direct data unavailable

**3. Dashboard & Analytics**
- **Real-Time Overview**: Total emissions, breakdown by scope and category, trending vs. targets
- **Sectoral Benchmarking**: Compare your intensity (tCO₂e per $M revenue) against industry peers
- **Historical Tracking**: Multi-year trend visualization with month-over-month/year-over-year comparisons
- **Data Quality Indicators**: Transparency into which figures are measured vs. estimated

**4. Audit-Ready Reporting**
- **Multi-Standard Support**: Generate reports for GHG Protocol, SASB, SEC Climate Disclosure, TCFD, CSRD
- **Export Formats**: PDF, Excel, CSV with full calculation methodology and audit trail
- **Approval Workflows**: Route drafts through stakeholders before publication
- **Version Control**: Track all changes with timestamps and user attribution

**5. Scenario Planning & What-If Analysis**
- **Decarbonization Modeling**: Test impact of initiatives like renewable energy procurement, fleet electrification, supplier switching
- **Cost-Benefit Analysis**: Estimate capital investment vs. emissions reduction vs. carbon pricing exposure
- **Target Setting**: Science-based target alignment (1.5°C pathway)
- **Alerts & Forecasting**: Automated notifications if trajectory deviates from targets

**6. Collaboration & Governance**
- **Role-Based Access**: Sustainability managers, finance teams, executives see relevant views
- **Task Management**: Assign data collection tasks to facility managers or regional teams
- **Integration with Microsoft/Google Workspace**: Sync with calendars, email, and productivity tools

---

## How the Platform Works (Technical Overview)

### Architecture

DataAmble is built on a modern, scalable cloud architecture:

**Frontend:**
- React-based web application with responsive design (desktop and mobile)
- Real-time dashboard using WebSocket connections for live updates
- Interactive data visualizations (Recharts library)

**Backend:**
- Node.js API layer handling authentication, data processing, and integrations
- PostgreSQL database for transactional data (organizations, emissions records, reports)
- Redis cache for performance optimization

**AI/ML Engine:**
- Python-based machine learning models for Scope 3 estimation
- Natural language processing for expense categorization
- TensorFlow/PyTorch models trained on EPA and industry datasets

**Data Layer:**
- Secure data warehouse (PostgreSQL) for analytics queries
- Automated backups and disaster recovery
- SOC 2 Type II compliance for enterprise security

**Integrations:**
- RESTful APIs for third-party system connections
- OAuth 2.0 authentication for secure ERP access
- Webhook support for real-time data sync

### Data Flow

1. **Ingestion**: User uploads energy bills, travel data, or connects ERP system → Data lands in staging area
2. **Processing**: AI models categorize and validate data → Emissions factors applied → Calculations run
3. **Storage**: Results stored in database with full audit trail (source files, calculation methods, user actions)
4. **Presentation**: Dashboards query database in real-time → Reports generated on-demand
5. **Export**: Users download audit-ready PDFs or export raw data for external tools

### Security & Compliance

- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Access Control**: Multi-factor authentication, role-based permissions, SSO support (SAML 2.0)
- **Privacy**: GDPR and CCPA compliant; data residency options for EU customers
- **Certifications**: SOC 2 Type II, ISO 27001 (in progress)

---

## Business Value & ROI

### Quantified Benefits

**Time Savings:**
- **Before**: 200 hours/year on manual carbon accounting
- **After**: 40 hours/year on data review and validation
- **Net Savings**: 160 hours annually (~$24K at $150/hour sustainability manager rate)

**Cost Reduction:**
- **Consultant Fees**: Save $50K-$150K annually on external report preparation
- **Audit Efficiency**: 30% reduction in audit costs due to improved data quality

**Revenue Protection:**
- **Compliance Assurance**: Avoid SEC penalties ($10M+ potential fines for material misstatements)
- **ESG Rating Improvement**: Better scores from MSCI, Sustainalytics drive ~5% stock premium
- **Customer Retention**: Meet sustainability clauses in RFPs (30% of enterprise contracts now require carbon disclosure)

**Strategic Value:**
- **Carbon Pricing Readiness**: Model exposure to carbon taxes (EU ETS now €90/tCO₂e)
- **Supply Chain Resilience**: Identify high-carbon suppliers before regulations hit
- **Employee Attraction**: 68% of Gen Z workers prioritize employers with strong climate action

### Payback Period

For a typical mid-market customer ($500M revenue, 1,000 employees):
- **Annual Subscription**: $25,000
- **Annual Savings**: $75,000 (consultant fees + time savings)
- **Net Benefit Year 1**: $50,000
- **Payback Period**: <6 months

---

## Implementation Guide

### Phase 1: Onboarding (Weeks 1-2)
- **Kickoff Call**: Define organizational structure, reporting boundaries, key stakeholders
- **Account Setup**: Configure users, roles, facilities, business units
- **Data Mapping**: Identify data sources (utility providers, travel management systems, procurement)

### Phase 2: Data Integration (Weeks 3-6)
- **Historical Upload**: Bulk import 2-3 years of historical data via CSV templates
- **Validation**: DataAmble team reviews for completeness and accuracy
- **Baseline Calculation**: Generate first full inventory report

### Phase 3: Automation (Weeks 7-10)
- **API Connections**: Integrate live feeds from ERP, HRIS, travel platforms
- **Workflow Setup**: Configure approval chains, alert thresholds, report schedules
- **Training**: 2-hour sessions for sustainability team, finance team, executives

### Phase 4: Optimization (Ongoing)
- **Scenario Testing**: Model decarbonization initiatives in planning module
- **Quarterly Business Reviews**: DataAmble customer success team provides benchmarking insights
- **Feature Expansion**: Activate advanced modules (supplier engagement, offset tracking)

### Resource Requirements

**From Your Team:**
- **Sustainability Lead**: 10 hours/week during onboarding, 2 hours/week ongoing
- **Finance/IT Liaison**: 5 hours/week during integration phase for system access
- **Executive Sponsor**: 1 hour/month for strategic review

**From DataAmble:**
- **Dedicated Customer Success Manager** (Included in Pro/Enterprise tiers)
- **Implementation Consultant** for first 90 days
- **24/7 Technical Support** via email/chat

---

## Stakeholder Communication Guide

### Key Messages by Audience

**For the Board/CEO:**
*"DataAmble transforms carbon management from a compliance burden into a strategic advantage. We're automating manual processes, ensuring regulatory readiness, and unlocking data-driven decarbonization planning—all while reducing costs by $75K+ annually."*

**For the CFO:**
*"This platform delivers ROI in under 6 months by eliminating consultant spend and reducing audit costs. It also de-risks our SEC climate disclosure obligations (potential $10M+ penalties for errors) and provides decision-support for capital allocation to carbon reduction projects."*

**For the COO:**
*"DataAmble integrates seamlessly with our existing ERP and procurement systems, automating data collection that currently consumes 200+ hours per year. Real-time dashboards give you operational visibility into energy efficiency and supply chain carbon intensity."*

**For the Sustainability Team:**
*"This is the tool you've been asking for—no more spreadsheets, no more chasing down utility bills. AI handles the heavy lifting on Scope 3 estimation, and the scenario planner lets you model decarbonization pathways to prove the case for renewables, fleet electrification, or supplier engagement."*

**For Investors/ESG Analysts:**
*"Our investment in DataAmble demonstrates commitment to climate transparency and positions us ahead of regulatory timelines. The platform's audit-ready reporting and third-party verification workflows ensure data integrity for CDP, TCFD, and ESG rating agencies."*

### Objection Handling

**"We already have a sustainability consultant."**
→ *"DataAmble complements consultants by handling routine data processing, freeing them for strategic work like target-setting and stakeholder engagement. Many of our customers reduce consultant fees by 50% while increasing report quality."*

**"Our data is too messy for automation."**
→ *"That's exactly why our AI-powered validation engine exists. It flags gaps and anomalies, and our implementation team helps clean historical data during onboarding. Within 90 days, you'll have a single source of truth."*

**"We're not ready for Scope 3 yet."**
→ *"Start with Scope 1 & 2—the platform grows with you. When regulators or customers demand Scope 3 (and they will), you'll be ahead. Our AI can estimate supply chain emissions using spend data until you get supplier-specific figures."*

**"What if regulations change?"**
→ *"DataAmble's reporting engine is configurable. When SEC or EU rules update, we push updates to all customers automatically. You're protected from regulatory whiplash."*

### Success Metrics to Communicate

**30 Days:**
- ✅ Baseline emissions inventory completed
- ✅ First GHG Protocol report generated
- ✅ Stakeholders onboarded to dashboard

**90 Days:**
- ✅ Automated data feeds operational
- ✅ Year-over-year trending enabled
- ✅ First scenario analysis (e.g., renewable energy procurement) completed

**12 Months:**
- ✅ Annual report submitted to CDP with improved score
- ✅ $75K+ in cost savings realized
- ✅ Board presentation on decarbonization roadmap using platform data

---

## Platform Roadmap

### Current (MVP - Available Now)
- ✅ Scope 1 & 2 automated calculation
- ✅ CSV/Excel data upload
- ✅ Dashboard with real-time tracking
- ✅ GHG Protocol & SASB reporting
- ✅ User management & collaboration

### Q3 2026 (6 Months)
- 🔄 Full Scope 3 AI estimation (15 categories)
- 🔄 Scenario planning module
- 🔄 API integrations (SAP, Oracle, Workday)
- 🔄 Mobile app (iOS/Android)

### Q1 2027 (12 Months)
- 📅 Supplier engagement portal (collect Scope 3 data directly)
- 📅 Carbon offset/REC tracking
- 📅 TCFD & CSRD report templates
- 📅 Multi-language support (German, French, Spanish)

### Q3 2027 (18 Months)
- 📅 Full ESG suite (water, waste, social metrics)
- 📅 AI-powered anomaly detection (flag unusual spikes)
- 📅 Predictive analytics (forecast emissions 12 months ahead)
- 📅 Blockchain audit trail for immutable records

---

## Competitive Differentiation

### Why DataAmble vs. Alternatives

| **Capability**              | **DataAmble** | **Persefoni/Watershed** | **IBM Envizi** | **Excel** |
|-----------------------------|---------------|-------------------------|----------------|-----------|
| **Mid-Market Focused**      | ✅ Yes         | ⚠️ Partial              | ❌ No (Enterprise) | ✅ Yes    |
| **AI Scope-3 Estimation**   | ✅ Advanced    | ⚠️ Basic                | ⚠️ Basic       | ❌ Manual |
| **Scenario Planning**       | ✅ Yes         | ⚠️ Limited              | ✅ Yes         | ❌ No     |
| **Quick Deployment**        | ✅ <90 days    | ⚠️ 6+ months            | ❌ 12+ months  | ✅ Instant|
| **Annual Cost (Mid-Market)**| **$25K**      | $50K-$100K              | $100K+         | $0 (+ $100K consultants) |
| **User-Friendly UX**        | ✅ Modern      | ⚠️ Adequate             | ❌ Legacy UI   | ⚠️ Complex|

**Our Unique Value:**
1. **Built for the mid-market** from day one (not downsized enterprise tools)
2. **AI-first architecture** reduces manual work by 80%
3. **Transparent pricing** with no hidden fees or surprise add-ons
4. **Modern UX** designed for non-technical users (no training burden)

---

## Risk Mitigation

**Regulatory Risk:**
- **Mitigation**: Configurable reporting engine adapts to rule changes; legal/ESG advisory board monitors developments

**Data Quality Risk:**
- **Mitigation**: AI validation flags errors; professional services team assists with data cleanup; continuous improvement via user feedback

**Adoption Risk:**
- **Mitigation**: Free 30-day trial; strong ROI justification; white-glove onboarding; change management playbooks

**Competition Risk:**
- **Mitigation**: Rapid innovation cycles (monthly releases); strategic partnerships with consultancies; focus on underserved mid-market

**Technical Risk:**
- **Mitigation**: 99.9% uptime SLA; automated backups; disaster recovery plan; SOC 2 compliance

---

## Financial Model

### Revenue Streams

**Primary: SaaS Subscriptions**
- **Basic Tier**: $15K/year (Scope 1 & 2, <500 employees)
- **Pro Tier**: $35K/year (Full Scope 3, scenario planning, <2,000 employees)
- **Enterprise Tier**: Custom pricing (API access, multi-entity, unlimited users)

**Secondary: Professional Services**
- Implementation consulting: $10K-$25K one-time
- Custom report development: $5K-$15K per template
- Annual health check: $5K/year

### Unit Economics (Pro Tier Customer)

- **ARPU**: $35,000/year
- **CAC**: $7,000 (sales + marketing)
- **Gross Margin**: 82%
- **LTV**: $140,000 (4-year avg customer life)
- **LTV:CAC Ratio**: 20:1 ✅

### Projected Growth

| **Metric**        | **Year 1** | **Year 2** | **Year 3** |
|-------------------|------------|------------|------------|
| Customers         | 15         | 70         | 180        |
| ARR               | $375K      | $2.1M      | $5.8M      |
| Gross Margin      | 75%        | 80%        | 82%        |
| Burn Rate/Month   | $150K      | $250K      | $400K      |
| Cash Runway       | 18 mo      | 24 mo      | Profitable |

---

## Conclusion

**DataAmble** represents a paradigm shift in corporate carbon management—from manual, reactive compliance to automated, strategic decarbonization. By combining AI-driven automation with intuitive UX and audit-grade rigor, we empower mid-market enterprises to meet regulatory mandates, satisfy stakeholder demands, and identify cost-effective pathways to net zero.

**Next Steps:**
1. **Schedule a Demo**: See the platform in action with your sample data
2. **Pilot Program**: 90-day trial with dedicated implementation support
3. **Business Case Workshop**: Work with our team to quantify ROI for your organization

**Contact:**
- **Email**: hello@dataamble.com
- **Web**: www.dataamble.com
- **Phone**: +1 (555) 123-4567

---

*Document Version: 1.0*
*Last Updated: April 14, 2026*
*Classification: Internal/Partner Distribution*
`;

  const baseUrl =
    process.env.CREATE_APP_URL || process.env.NEXT_PUBLIC_CREATE_APP_URL;

  if (!baseUrl) {
    return createMarkdownFallbackResponse(markdown);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/integrations/pdf-generation/markdown-to-pdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          markdown,
          styles: `
          @page {
            margin: 1.5cm 2cm;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #1f2937;
          }
          h1 {
            font-size: 28pt;
            font-weight: 700;
            color: #111827;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 0.3em;
          }
          h2 {
            font-size: 18pt;
            font-weight: 600;
            color: #1f2937;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            page-break-after: avoid;
          }
          h3 {
            font-size: 14pt;
            font-weight: 600;
            color: #374151;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          p {
            margin-bottom: 0.8em;
            text-align: justify;
          }
          ul, ol {
            margin-bottom: 1em;
            padding-left: 1.5em;
          }
          li {
            margin-bottom: 0.4em;
          }
          strong {
            font-weight: 600;
            color: #111827;
          }
          em {
            font-style: italic;
            color: #059669;
          }
          hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 1.5em 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            font-size: 10pt;
          }
          th {
            background-color: #f3f4f6;
            font-weight: 600;
            padding: 8px;
            border: 1px solid #d1d5db;
            text-align: left;
          }
          td {
            padding: 8px;
            border: 1px solid #e5e7eb;
          }
          blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1em;
            margin-left: 0;
            color: #4b5563;
            font-style: italic;
          }
          code {
            background-color: #f3f4f6;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
          }
        `,
        }),
      },
    );

    if (!response.ok) {
      return createMarkdownFallbackResponse(markdown);
    }

    const pdfBuffer = await response.arrayBuffer();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="DataAmble-Stakeholder-Documentation.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return createMarkdownFallbackResponse(markdown);
  } finally {
    clearTimeout(timeout);
  }
}
