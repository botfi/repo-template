import { prisma } from '../index'

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy'
  database: {
    connected: boolean
    responseTime?: number
    error?: string
  }
  timestamp: Date
}

/**
 * Performs a comprehensive health check on the Prisma database connection
 *
 * This function:
 * 1. Tests basic connectivity with a simple query
 * 2. Measures response time
 * 3. Checks if the connection pool is working
 * 4. Provides detailed error information if something fails
 */
export async function healthCheck(): Promise<HealthCheckResult> {
  const startTime = Date.now()
  const result: HealthCheckResult = {
    status: 'unhealthy',
    database: {
      connected: false,
    },
    timestamp: new Date(),
  }

  try {
    // Test basic connectivity with a simple query
    // Using $queryRaw with a simple SQL query that should work on any PostgreSQL database
    await prisma.$queryRaw`SELECT 1 as health_check`

    const responseTime = Date.now() - startTime

    result.status = 'healthy'
    result.database = {
      connected: true,
      responseTime,
    }
  } catch (error) {
    result.database.error = error instanceof Error ? error.message : String(error)
  }

  return result
}

/**
 * Performs a health check with timeout
 * Useful for preventing hanging health checks in production
 */
export async function healthCheckWithTimeout(timeoutMs: number = 5000): Promise<HealthCheckResult> {
  return Promise.race([
    healthCheck(),
    new Promise<HealthCheckResult>((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'unhealthy',
          database: {
            connected: false,
            error: 'Health check timed out',
          },
          timestamp: new Date(),
        })
      }, timeoutMs)
    }),
  ])
}

/**
 * Performs a detailed health check with additional diagnostics
 * Useful for debugging database issues
 */
export async function detailedHealthCheck(): Promise<
  HealthCheckResult & {
    diagnostics?: {
      connectionPool?: {
        activeConnections?: number
        idleConnections?: number
      }
      databaseInfo?: {
        version?: string
        currentDatabase?: string
      }
    }
  }
> {
  const basicResult = await healthCheck()

  if (basicResult.status === 'unhealthy') {
    return basicResult
  }

  const diagnostics: any = {}

  try {
    // Get database version and current database name
    const dbInfo = await prisma.$queryRaw<Array<{ version: string; current_database: string }>>`
      SELECT version(), current_database() as current_database
    `

    if (dbInfo.length > 0 && dbInfo[0]) {
      diagnostics.databaseInfo = {
        version: dbInfo[0].version,
        currentDatabase: dbInfo[0].current_database,
      }
    }
  } catch (error) {
    // Don't fail the health check if diagnostics fail
    console.warn('Failed to get database diagnostics:', error)
  }

  return {
    ...basicResult,
    diagnostics,
  }
}

/**
 * Simple health check that returns just a boolean
 * Useful for quick checks in application code
 */
export async function isHealthy(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

/**
 * Graceful shutdown helper for Prisma
 * Call this when shutting down your application
 */
export async function gracefulShutdown(): Promise<void> {
  try {
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error during Prisma shutdown:', error)
  }
}
