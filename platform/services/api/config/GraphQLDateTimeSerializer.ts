const TRANSFORMED_DATETIME_PREFIX = 'Serialized GraphQL DateTime'

/**
 * This serializer is used to transform the DateTime of GraphQL objects in snapshots to
 * a predictable value. This is useful for snapshot testing, since the DateTime reflects
 * the time of the test run and will therefore change on every test run.
 * @note Do not use this serializer for any other purpose than snapshot testing such
 * as value comparison.
 */
expect.addSnapshotSerializer({
  test(val) {
    if (!val || typeof val !== 'object') return false
    const keys = Object.keys(val)
    const timestampKeys = keys.filter((key) => key.endsWith('At'))
    const allTransformed = timestampKeys.every((key) => {
      if (val[key] === undefined || val[key] === null) return true
      return typeof val[key] === 'string' && String.prototype.startsWith.call(val[key], TRANSFORMED_DATETIME_PREFIX)
    })

    return !allTransformed
  },

  serialize(val, config, indentation, depth, refs, printer) {
    const keys = Object.keys(val)
    const timestampKeys = keys.filter((key) => key.endsWith('At'))
    const transformValues = { ...val }
    timestampKeys.forEach((key) => {
      if (transformValues[key] === undefined || transformValues[key] === null) return
      transformValues[key] = `${TRANSFORMED_DATETIME_PREFIX}: ${key} | column: ${depth}`
    })

    return printer(transformValues, config, indentation, depth, refs)
  },
})
