export function getOrgIdFromRequest(request) {
  const value = request.headers.get("x-organization-id");
  const parsed = Number.parseInt(value ?? "1", 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return { error: "Invalid x-organization-id header", status: 400 };
  }

  return { orgId: parsed };
}

export function getPositiveIntParam(request, key, defaultValue, maxValue = 100) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get(key);

  if (raw == null || raw === "") {
    return { value: defaultValue };
  }

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > maxValue) {
    return {
      error: `${key} must be an integer between 1 and ${maxValue}`,
      status: 400,
    };
  }

  return { value: parsed };
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
