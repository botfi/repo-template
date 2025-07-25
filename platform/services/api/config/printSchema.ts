import { printSubgraphSchema } from '@apollo/subgraph'
import { writeFileSync } from 'fs'
import { lexicographicSortSchema } from 'graphql'
// import { introspectionFromSchema, printSchema } from 'graphql'

import { schema as graph } from '../src/graph'
import { schema as internal } from '../src/internal'

const graphSchemaAsString = printSubgraphSchema(lexicographicSortSchema(graph))
const internalSchemaAsString = printSubgraphSchema(lexicographicSortSchema(internal))

// Generate YAML schema
// const internalSchemaAsString = printSchema(lexicographicSortSchema(internal))
// Generate JSON schema through introspection
// const internalSchemaAsJson = introspectionFromSchema(internal)

writeFileSync('./graph.graphql', graphSchemaAsString)
writeFileSync('../federated/web-internal.federated.graphql', internalSchemaAsString)
// writeFileSync('../federated/web-internal.schema.json', JSON.stringify(internalSchemaAsJson, null, 2))
