import sql from "@/app/api/utils/sql";
import {
  getOrgIdFromRequest,
  getPositiveIntParam,
  isNonEmptyString,
} from "@/app/api/utils/org";

export async function GET(request) {
  try {
    const org = getOrgIdFromRequest(request);
    if (org.error) {
      return Response.json({ error: org.error }, { status: org.status });
    }
    const limitParam = getPositiveIntParam(request, "limit", 10, 100);
    if (limitParam.error) {
      return Response.json(
        { error: limitParam.error },
        { status: limitParam.status },
      );
    }
    const { orgId } = org;
    const { value: limit } = limitParam;
    const history = await sql`
      SELECT
        id,
        category,
        amount,
        source,
        created_at as date
      FROM emissions_data
      WHERE organization_id = ${orgId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return Response.json(history);
  } catch (error) {
    console.error("Failed to fetch ingestion history:", error);
    return Response.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { category, amount, scope, source } = body;
    if (!isNonEmptyString(category)) {
      return Response.json({ error: "category is required" }, { status: 400 });
    }
    if (!Number.isFinite(Number(amount)) || Number(amount) < 0) {
      return Response.json(
        { error: "amount must be a non-negative number" },
        { status: 400 },
      );
    }
    if (![1, 2, 3].includes(Number(scope))) {
      return Response.json(
        { error: "scope must be one of: 1, 2, 3" },
        { status: 400 },
      );
    }
    if (!isNonEmptyString(source)) {
      return Response.json({ error: "source is required" }, { status: 400 });
    }
    const org = getOrgIdFromRequest(request);
    if (org.error) {
      return Response.json({ error: org.error }, { status: org.status });
    }
    const { orgId } = org;

    const [newItem] = await sql`
      INSERT INTO emissions_data (
        organization_id,
        scope,
        category,
        amount,
        period_start,
        period_end,
        source
      ) VALUES (
        ${orgId},
        ${Number(scope)},
        ${category.trim()},
        ${Number(amount)},
        CURRENT_DATE,
        CURRENT_DATE,
        ${source.trim()}
      ) RETURNING *
    `;

    return Response.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Failed to process ingestion item:", error);
    return Response.json({ error: "Failed to process data" }, { status: 500 });
  }
}
