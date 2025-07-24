const TRANSFORMED_ID_PREFIX = 'Serialized GraphQL ID'

/**
 * This serializer is used to transform the IDs of GraphQL objects in snapshots to
 * a predictable value. This is useful for snapshot testing, since the IDs of objects
 * are UUID.
 * @note Do not use this serializer for any other purpose than snapshot testing such
 * as value comparison.
 */
expect.addSnapshotSerializer({
  test(val) {
    if (!val || typeof val !== 'object') return false
    const keys = Object.keys(val)
    const idKeys = keys.filter((key) => key === 'id' || key === 'sub' || key.endsWith('Id'))
    const allTransformed = idKeys.every((key) => {
      if (val[key] === undefined || val[key] === null) return true
      return typeof val[key] === 'string' && String.prototype.startsWith.call(val[key], TRANSFORMED_ID_PREFIX)
    })

    return !allTransformed
  },

  serialize(val, config, indentation, depth, refs, printer) {
    const keys = Object.keys(val)
    const idKeys = keys.filter((key) => key === 'id' || key === 'sub' || key.endsWith('Id'))
    const transformValues = { ...val }
    idKeys.forEach((key) => {
      if (transformValues[key] === undefined || transformValues[key] === null) return
      transformValues[key] = `${TRANSFORMED_ID_PREFIX}: ${key} | column: ${depth}`
    })

    return printer(transformValues, config, indentation, depth, refs)
  },
})
