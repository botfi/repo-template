# Prisma Health Check Utilities

This module provides comprehensive health checking utilities for Prisma database connections. These utilities are designed to work with PostgreSQL and provide various levels of health checking for different use cases.

## Features

- **Basic connectivity testing** - Simple database connection verification
- **Response time measurement** - Track database performance
- **Timeout support** - Prevent hanging health checks
- **Detailed diagnostics** - Get database version and connection info
- **Graceful shutdown** - Properly close database connections
- **Kubernetes ready** - Support for liveness and readiness probes

## Usage

### Basic Health Check

```typescript
import { healthCheck } from '@botfi/db/utils/healthcheck'

const result = await healthCheck()
console.log(result.status) // 'healthy' | 'unhealthy'
console.log(result.database.responseTime) // milliseconds
```

### Health Check with Timeout

```typescript
import { healthCheckWithTimeout } from '@botfi/db/utils/healthcheck'

// 5 second timeout (default)
const result = await healthCheckWithTimeout()

// Custom timeout
const result = await healthCheckWithTimeout(3000) // 3 seconds
```

### Detailed Health Check

```typescript
import { detailedHealthCheck } from '@botfi/db/utils/healthcheck'

const result = await detailedHealthCheck()
console.log(result.diagnostics?.databaseInfo?.version) // PostgreSQL version
```

### Simple Boolean Check

```typescript
import { isHealthy } from '@botfi/db/utils/healthcheck'

const healthy = await isHealthy() // true | false
```

### Graceful Shutdown

```typescript
import { gracefulShutdown } from '@botfi/db/utils/healthcheck'

// In your application shutdown handler
await gracefulShutdown()
```

## API Endpoints

### Basic Health Check Endpoint

```typescript
// GET /health
export async function GET() {
  const result = await healthCheck()
  
  return Response.json({
    status: result.status === 'healthy' ? 200 : 503,
    body: result
  })
}
```

### Load Balancer Health Check

```typescript
// GET /health/lb
export async function GET() {
  const result = await healthCheckWithTimeout(3000)
  
  return Response.json({
    status: result.status === 'healthy' ? 200 : 503,
    body: result
  })
}
```

## Kubernetes Integration

### Liveness Probe

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 1
```

### Readiness Probe

```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 5
```

## Best Practices

1. **Use timeouts** - Always use `healthCheckWithTimeout()` in production to prevent hanging health checks
2. **Handle errors gracefully** - Health checks should not throw exceptions
3. **Monitor response times** - Track database performance over time
4. **Use appropriate HTTP status codes** - 200 for healthy, 503 for unhealthy
5. **Log health check failures** - Help with debugging database issues
6. **Set up graceful shutdown** - Ensure database connections are properly closed

## Error Handling

The health check utilities handle various database errors:

- Connection failures
- Authentication errors
- Network timeouts
- Database server unavailability
- Query execution errors

All errors are captured and returned in the result object rather than throwing exceptions.

## Performance Considerations

- Health checks use minimal queries (`SELECT 1`) to minimize impact
- Response time is measured to track database performance
- Timeouts prevent resource exhaustion
- Connection pooling is preserved during health checks

## Monitoring Integration

The health check results can be easily integrated with monitoring systems:

- **Prometheus** - Export metrics from health check results
- **Grafana** - Create dashboards showing database health
- **Alerting** - Set up alerts for unhealthy database states
- **Logging** - Log health check results for debugging 