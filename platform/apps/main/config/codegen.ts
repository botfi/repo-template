import { getApiUrl } from '@botfi/api/utils'
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [getApiUrl('supergraph'), './lib/apollo/typeDefs.ts'],
  documents: ['app/[lang]/**/*.graphql'],
  generates: {
    'app/[lang]/_components/types.generated.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          DateTime: 'string',
          JSON: 'unknown',
        },
      },
    },
    'app/[lang]': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '_components/types.generated.ts',
      },
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        scalars: {
          DateTime: 'string',
          JSON: 'unknown',
        },
      },
    },
  },
}

export default config
