# Manage unique constraints

A dump of the Supabase trigger for managing unique constraints

```sql
ALTER TABLE onboarding_form ADD CONSTRAINT unique_team_network_type UNIQUE ("team_id", "networkType");
```
