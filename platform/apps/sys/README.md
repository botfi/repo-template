# `@botfi/sys-app`

## How-Tos

### Use Supabase

#### Authentication

At `https://supabase.com/dashboard/project/<your-project-id>/auth/users`

- Enable `Email` provider
- (Optional) disable `Allow new users to sign up`
- Create admin user with email/password

#### Custom Supabase schema

- Grant privileges to `authenticated` role only.
- Make sure to enable Data API and expose `"your-custom-chema"`

```sql
-- First, revoke all previous grants from all roles
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "your-custom-schema" REVOKE ALL ON SEQUENCES FROM anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "your-custom-schema" REVOKE ALL ON ROUTINES FROM anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "your-custom-schema" REVOKE ALL ON TABLES FROM anon, authenticated, service_role;

REVOKE ALL ON ALL SEQUENCES IN SCHEMA "your-custom-schema" FROM anon, authenticated, service_role;
REVOKE ALL ON ALL ROUTINES IN SCHEMA "your-custom-schema" FROM anon, authenticated, service_role;
REVOKE ALL ON ALL TABLES IN SCHEMA "your-custom-schema" FROM anon, authenticated, service_role;
REVOKE USAGE ON SCHEMA "your-custom-schema" FROM anon, authenticated, service_role;

-- Now, grant access only to authenticated role
GRANT USAGE ON SCHEMA "your-custom-schema" TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA "your-custom-schema" TO authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA "your-custom-schema" TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA "your-custom-schema" TO authenticated;

-- Set default privileges for future objects to only authenticated
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "your-custom-schema" GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "your-custom-schema" GRANT ALL ON ROUTINES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "your-custom-schema" GRANT ALL ON SEQUENCES TO authenticated;
```
