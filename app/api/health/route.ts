import { NextResponse } from "next/server";

const HEALTH_TIMEOUT_MS = 5_000;

export const dynamic = "force-dynamic";

type DependencyStatus = {
  name: "solarSystemApi" | "nasaImageApi";
  urlConfigured: boolean;
  reachable: boolean;
  statusCode: number | null;
  durationMs: number;
  error: string | null;
};

function buildNasaHealthUrl(baseUrl: string): string {
  const url = new URL(baseUrl);

  if (!url.searchParams.has("q")) {
    url.searchParams.set("q", "earth planet");
  }

  if (!url.searchParams.has("media_type")) {
    url.searchParams.set("media_type", "image");
  }

  return url.toString();
}

async function checkDependency(params: {
  name: DependencyStatus["name"];
  url: string;
  headers?: HeadersInit;
}): Promise<DependencyStatus> {
  const { name, url, headers } = params;

  if (!url) {
    return {
      name,
      urlConfigured: false,
      reachable: false,
      statusCode: null,
      durationMs: 0,
      error: "Missing environment variable",
    };
  }

  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers,
      signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
    });

    return {
      name,
      urlConfigured: true,
      reachable: response.ok,
      statusCode: response.status,
      durationMs: Date.now() - startedAt,
      error: response.ok ? null : `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      name,
      urlConfigured: true,
      reachable: false,
      statusCode: null,
      durationMs: Date.now() - startedAt,
      error: (error as Error).message || "Unknown network error",
    };
  }
}

function getSolarAuthHeaders(): HeadersInit | undefined {
  const token = process.env.SOLAR_API_TOKEN ?? process.env.NEXT_PUBLIC_SOLAR_API_TOKEN;

  if (!token) {
    return undefined;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function GET() {
  const solarUrl = process.env.SOLAR_SYSTEM_API_URL ?? "";
  const nasaUrlBase = process.env.NASA_IMAGE_SEARCH_URL ?? "";
  const nasaUrl = nasaUrlBase ? buildNasaHealthUrl(nasaUrlBase) : "";

  const dependencies = await Promise.all([
    checkDependency({
      name: "solarSystemApi",
      url: solarUrl,
      headers: getSolarAuthHeaders(),
    }),
    checkDependency({
      name: "nasaImageApi",
      url: nasaUrl,
    }),
  ]);

  const missingEnv = [
    !solarUrl ? "SOLAR_SYSTEM_API_URL" : null,
    !nasaUrlBase ? "NASA_IMAGE_SEARCH_URL" : null,
  ].filter(Boolean) as string[];

  const hasDependencyFailure = dependencies.some(
    (dependency) => dependency.urlConfigured && !dependency.reachable,
  );

  const ok = missingEnv.length === 0 && !hasDependencyFailure;

  return NextResponse.json(
    {
      ok,
      timestamp: new Date().toISOString(),
      missingEnv,
      dependencies,
    },
    {
      status: ok ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
