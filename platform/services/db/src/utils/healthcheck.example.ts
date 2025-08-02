import { detailedHealthCheck, gracefulShutdown, healthCheck, healthCheckWithTimeout, isHealthy } from './healthcheck'

// Example 1: Basic health check for API endpoints
export async function handleHealthCheck() {
  const result = await healthCheck()

  if (result.status === 'healthy') {
    return {
      status: 200,
      body: {
        status: 'ok',
        database: {
          connected: true,
          responseTime: result.database.responseTime,
        },
        timestamp: result.timestamp,
      },
    }
  } else {
    return {
      status: 503, // Service Unavailable
      body: {
        status: 'error',
        database: {
          connected: false,
          error: result.database.error,
        },
        timestamp: result.timestamp,
      },
    }
  }
}

// Example 2: Health check with timeout for load balancers
export async function handleLoadBalancerHealthCheck() {
  const result = await healthCheckWithTimeout(3000) // 3 second timeout

  return {
    status: result.status === 'healthy' ? 200 : 503,
    body: result,
  }
}

// Example 3: Detailed health check for monitoring systems
export async function handleDetailedHealthCheck() {
  const result = await detailedHealthCheck()

  return {
    status: result.status === 'healthy' ? 200 : 503,
    body: result,
  }
}

// Example 4: Quick health check for application logic
export async function checkDatabaseBeforeOperation() {
  if (!(await isHealthy())) {
    throw new Error('Database is not available')
  }

  // Proceed with database operations
  console.log('Database is healthy, proceeding with operation')
}

// Example 5: Graceful shutdown in your application
export async function setupGracefulShutdown() {
  // Handle SIGTERM and SIGINT signals
  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`)

    // Close database connections
    await gracefulShutdown()

    console.log('Graceful shutdown completed')
    process.exit(0)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

// Example 6: Health check for Kubernetes liveness probe
export async function k8sLivenessProbe() {
  const result = await healthCheckWithTimeout(1000) // 1 second timeout for k8s
  return result.status === 'healthy'
}

// Example 7: Health check for Kubernetes readiness probe
export async function k8sReadinessProbe() {
  const result = await healthCheckWithTimeout(5000) // 5 second timeout for readiness
  return result.status === 'healthy'
}
