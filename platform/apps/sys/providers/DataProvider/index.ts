'use client'

import { supabaseBrowserClient } from '@/lib/sb/client'
import { dataProvider as dataProviderSupabase } from '@refinedev/supabase'

export const dataProvider = dataProviderSupabase(supabaseBrowserClient)
