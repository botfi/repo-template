export interface ParsedDbUrl {
  isNeonUrl: boolean
  schema: string | undefined
}

export function parseDbUrl(dbUrl: string): ParsedDbUrl {
  try {
    const parsed = new URL(dbUrl)
    return {
      isNeonUrl: parsed.hostname.includes('neon.tech'),
      schema: parsed.searchParams.get('schema') ?? undefined,
    }
  } catch {
    return {
      isNeonUrl: false,
      schema: undefined,
    }
  }
}
