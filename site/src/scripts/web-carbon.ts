import { z } from "astro/zod";

export type TokenResponse = z.infer<typeof TokenResponseSchema>;
const TokenResponseSchema = z.object({
  id_token: z.string(),
  refresh_token: z.string(),
});

async function getIdToken(): Promise<{
  id_token: string;
  refresh_token: string;
}> {
  const url = `https://securetoken.googleapis.com/v1/token?key=${import.meta.env.SECURE_TOKEN_API_KEY}`;

  return fetch(url, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: import.meta.env.SECURE_TOKEN_REFRESH_TOKEN,
    }),
  })
    .then((r) => r.json())
    .then((r) => z.parse(TokenResponseSchema, r));
}

export type PageSizeData = z.infer<typeof PageSizeSchema>;
const PageSizeSchema = z.object({
  data: z.object({
    page_size: z.object({
      resource_types: z.record(
        z.string(),
        z.object({
          size: z.string().nullable(),
          size_in_bytes: z.int().nullable(),
          percent: z.number().nullable(),
        }),
      ),
    }),
  }),
});

async function getPageSizeData(
  idToken: string,
  pageUrl: string,
): Promise<PageSizeData> {
  const url = `${import.meta.env.PAGE_SIZE_URL}/check?url=${pageUrl}&actions=page_size`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get page size data");
  }

  return await response.json().then((j) => z.parse(PageSizeSchema, j));
}

function getBytes({ data }: PageSizeData): number {
  return Object.values(data.page_size.resource_types).reduce(
    (acc, { size_in_bytes }) => acc + (size_in_bytes ?? 0),
    0,
  );
}

export type WebCarbonReport = z.infer<typeof WebCarbonReportSchema>;
const WebCarbonReportSchema = z.object({
  bytes: z.int(),
  green: z.coerce.boolean(),
  gco2e: z.number(),
  rating: z.enum([
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ]),
  statistics: z.object({
    adjustedBytes: z.number(),
    energy: z.number(),
    co2: z.object({
      grid: z.object({
        grams: z.number(),
        litres: z.number(),
      }),
      renewable: z.object({
        grams: z.number(),
        litres: z.number(),
      }),
    }),
  }),
  cleanerThan: z.number().min(0).max(1),
});

async function getReport(
  bytes: number,
  green: boolean,
): Promise<WebCarbonReport> {
  const url = `https://api.websitecarbon.com/data?bytes=${bytes}&green=${green ? 1 : 0}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch page score");
  }

  const report = await response
    .json()
    .then((j) => z.parse(WebCarbonReportSchema, j));

  return report;
}

export async function getWebCarbonReport(): Promise<WebCarbonReport> {
  const { id_token } = await getIdToken();
  const sizeData = await getPageSizeData(id_token, "dallinhuff.com");
  const bytes = getBytes(sizeData);
  return getReport(bytes, true);
}
