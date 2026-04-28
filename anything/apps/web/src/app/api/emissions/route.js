import sql from "@/app/api/utils/sql";
import { getOrgIdFromRequest } from "@/app/api/utils/org";

export async function GET(request) {
  try {
    const org = getOrgIdFromRequest(request);
    if (org.error) {
      return Response.json({ error: org.error }, { status: org.status });
    }
    const { searchParams } = new URL(request.url);
    const scopeParam = searchParams.get("scope");
    const { orgId } = org;

    if (scopeParam && !["1", "2", "3"].includes(scopeParam)) {
      return Response.json(
        { error: "scope filter must be 1, 2, or 3" },
        { status: 400 },
      );
    }

    const data = scopeParam
      ? await sql`
          SELECT
            scope,
            category,
            amount,
            period_start,
            period_end,
            source
          FROM emissions_data
          WHERE organization_id = ${orgId} AND scope = ${Number(scopeParam)}
          ORDER BY period_start ASC
        `
      : await sql`
          SELECT
            scope,
            category,
            amount,
            period_start,
            period_end,
            source
          FROM emissions_data
          WHERE organization_id = ${orgId}
          ORDER BY period_start ASC
        `;

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching emissions data:", error);
    return Response.json(
      { error: "Failed to fetch emissions data" },
      { status: 500 },
    );
  }
}
