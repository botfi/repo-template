import { env } from '@botfi/env/sys'
import { createBrowserClient } from '@supabase/ssr'

export const supabaseBrowserClient: ReturnType<typeof createBrowserClient> = createBrowserClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_KEY,
  {
    db: {
      schema: env.NEXT_PUBLIC_SUPABASE_SCHEMA,
    },
  },
)
