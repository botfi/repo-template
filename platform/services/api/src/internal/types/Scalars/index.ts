import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import { builder } from '../../builder'

builder.addScalarType('DateTime', DateTimeResolver, {})
builder.addScalarType('JSON', JSONResolver, {})
