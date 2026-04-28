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
    const limitParam = getPositiveIntParam(request, "limit", 50, 200);
    if (limitParam.error) {
      return Response.json(
        { error: limitParam.error },
        { status: limitParam.status },
      );
    }
    const { orgId } = org;
    const { value: limit } = limitParam;
    const scenarios = await sql`
      SELECT id, name, description, parameters, projected_reduction, created_at
      FROM scenarios
      WHERE organization_id = ${orgId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return Response.json(scenarios);
  } catch (error) {
    console.error("Failed to fetch scenarios:", error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, parameters, projected_reduction } = body;
    if (!isNonEmptyString(name)) {
      return Response.json({ error: "name is required" }, { status: 400 });
    }
    if (!isNonEmptyString(description)) {
      return Response.json({ error: "description is required" }, { status: 400 });
    }
    if (
      !Number.isFinite(Number(projected_reduction)) ||
      Number(projected_reduction) < 0
    ) {
      return Response.json(
        { error: "projected_reduction must be a non-negative number" },
        { status: 400 },
      );
    }
    if (parameters == null || typeof parameters !== "object") {
      return Response.json(
        { error: "parameters must be a JSON object" },
        { status: 400 },
      );
    }
    const org = getOrgIdFromRequest(request);
    if (org.error) {
      return Response.json({ error: org.error }, { status: org.status });
    }
    const { orgId } = org;

    const [newScenario] = await sql`
      INSERT INTO scenarios (organization_id, name, description, parameters, projected_reduction)
      VALUES (${orgId}, ${name.trim()}, ${description.trim()}, ${parameters}, ${Number(projected_reduction)})
      RETURNING *
    `;
    return Response.json(newScenario, { status: 201 });
  } catch (error) {
    console.error("Failed to create scenario:", error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
