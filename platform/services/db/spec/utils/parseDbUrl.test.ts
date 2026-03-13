import { describe, expect, it } from 'vitest'

import { parseDbUrl } from '../../src/utils/parseDbUrl'

describe('parseDbUrl', () => {
  it('returns Neon detection and schema when present', () => {
    const parsed = parseDbUrl(
      'postgresql://u:p@my-project.ap-southeast-1.aws.neon.tech/neondb?schema=repo-template-test',
    )

    expect(parsed).toEqual({
      isNeonUrl: true,
      schema: 'repo-template-test',
    })
  })

  it('returns schema as undefined when missing', () => {
    const parsed = parseDbUrl('postgresql://root:secret@localhost:5432/postgres')

    expect(parsed).toEqual({
      isNeonUrl: false,
      schema: undefined,
    })
  })

  it('always returns defaults for invalid URL', () => {
    const parsed = parseDbUrl('not-a-valid-url')

    expect(parsed).toEqual({
      isNeonUrl: false,
      schema: undefined,
    })
  })
})
