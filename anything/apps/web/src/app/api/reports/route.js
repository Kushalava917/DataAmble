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
    const { searchParams } = new URL(request.url);
    const standard = searchParams.get("standard");
    const { orgId } = org;
    const { value: limit } = limitParam;

    const reports = isNonEmptyString(standard)
      ? await sql`
          SELECT id, name, status, standard, created_at as date
          FROM reports
          WHERE organization_id = ${orgId} AND standard = ${standard.trim()}
          ORDER BY created_at DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT id, name, status, standard, created_at as date
          FROM reports
          WHERE organization_id = ${orgId}
          ORDER BY created_at DESC
          LIMIT ${limit}
        `;
    return Response.json(reports);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, standard } = body;
    if (!isNonEmptyString(name)) {
      return Response.json({ error: "name is required" }, { status: 400 });
    }
    if (!isNonEmptyString(standard)) {
      return Response.json({ error: "standard is required" }, { status: 400 });
    }
    const org = getOrgIdFromRequest(request);
    if (org.error) {
      return Response.json({ error: org.error }, { status: org.status });
    }
    const { orgId } = org;

    const [newReport] = await sql`
      INSERT INTO reports (organization_id, name, standard, status)
      VALUES (${orgId}, ${name.trim()}, ${standard.trim()}, 'Completed')
      RETURNING *
    `;
    return Response.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Failed to create report:", error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
