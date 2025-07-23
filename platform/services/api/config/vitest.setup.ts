vi.stubEnv('DB_URL', process.env.DB_URL!.replace('development', 'test'))
vi.stubEnv('DB_DIRECT_URL', process.env.DB_DIRECT_URL!.replace('development', 'test'))
