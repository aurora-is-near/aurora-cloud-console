# Manage unique constraints

A dump of the Supabase trigger for managing unique constraints

```sql
CREATE UNIQUE INDEX IF NOT EXISTS unique_team_network_type ON onboarding_form ("team_id", "networkType");

CREATE UNIQUE INDEX IF NOT EXISTS unique_team_chain_id ON silos ("team_id", "chain_id");
```
