-- CreateEnum
CREATE TYPE "api_key_scopes" AS ENUM ('deals:read', 'deals:write', 'silos:read', 'users:read', 'transactions:read', 'users:write', 'lists:read', 'lists:write', 'forwarder:read', 'forwarder:write', 'payments:read', 'payments:write', 'assets:write');

-- CreateEnum
CREATE TYPE "deployment_status" AS ENUM ('PENDING', 'DEPLOYED', 'NOT_DEPLOYED');

-- CreateEnum
CREATE TYPE "filter_type" AS ENUM ('USER', 'CONTRACT', 'CHAIN', 'EOA', 'TOKEN', 'IP');

-- CreateEnum
CREATE TYPE "limit_scope" AS ENUM ('USER', 'GLOBAL');

-- CreateEnum
CREATE TYPE "limit_type" AS ENUM ('CYCLIC', 'RATELIMIT');

-- CreateEnum
CREATE TYPE "order_type" AS ENUM ('initial_setup', 'top_up');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('PAID', 'UNPAID', 'NO_PAYMENT_REQUIRED', 'paid', 'unpaid', 'no_payment_required');

-- CreateEnum
CREATE TYPE "team_onboarding_status" AS ENUM ('REQUEST_RECEIVED', 'DEPLOYMENT_IN_PROGRESS', 'DEPLOYMENT_DONE');

-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('ERC20', 'ERC721', 'ERC1155');

-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('customer', 'admin');

-- CreateEnum
CREATE TYPE "widget_network_type" AS ENUM ('AURORA', 'NEAR', 'ETHEREUM', 'CUSTOM');

-- CreateTable
CREATE TABLE "api_keys" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT NOT NULL DEFAULT md5((random())::text),
    "scopes" "api_key_scopes"[],
    "note" TEXT,
    "last_used_at" TIMESTAMP(6),
    "team_id" BIGINT NOT NULL,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blockscout_databases" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "database" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" BIGINT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blockscout_databases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datadog_web3_monitors" (
    "id" BIGSERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "template_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "datadog_id" BIGINT,
    "silo_name" TEXT,
    "engine_account" TEXT,
    "silo_chain_id" BIGINT,
    "silo_rpc_url" TEXT,
    "need_update" BOOLEAN DEFAULT false,
    "removed" BOOLEAN DEFAULT false,
    "need_remove" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "datadog_web3_monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deals" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "demo_key" TEXT,
    "team_id" BIGINT NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "open" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(6),
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "silo_id" BIGINT,
    "start_time" TIMESTAMP(6),
    "end_time" TIMESTAMP(6),

    CONSTRAINT "temp_deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "limits" (
    "id" BIGSERIAL NOT NULL,
    "deal_id" BIGINT NOT NULL,
    "limit_scope" "limit_scope" NOT NULL,
    "limit_type" "limit_type" NOT NULL,
    "limit_value" BIGINT NOT NULL DEFAULT 0,
    "duration" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "ui_enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lists" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding_form" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "networkType" TEXT,
    "chainPermission" TEXT,
    "baseToken" TEXT,
    "gasMechanics" TEXT,
    "chainName" TEXT,
    "chainId" TEXT,
    "comments" TEXT,
    "team_id" BIGINT,
    "integrations" TEXT[],
    "customTokenDetails" TEXT,

    CONSTRAINT "onboarding_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oracles" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "silo_id" BIGINT NOT NULL,

    CONSTRAINT "oracles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" TEXT NOT NULL,
    "team_id" BIGINT NOT NULL,
    "type" "order_type" NOT NULL,
    "payment_status" "payment_status" NOT NULL,
    "number_of_transactions" BIGINT,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replenishments" (
    "id" BIGSERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "near_transaction_hash" TEXT,
    "status" TEXT NOT NULL,
    "error_message" TEXT,
    "inserted_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "replenishments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rule_user_deal_data" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deal_id" BIGINT,
    "rule_user_id" BIGINT,
    "prepaid_txs" BIGINT NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "user_deal_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rule_users" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tokens" TEXT[],
    "eoas" TEXT[],
    "ips" TEXT[],
    "team_id" BIGINT,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "rule_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rule_users_userlists" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rule_user_id" BIGINT,
    "userlist_id" BIGINT,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "users_userlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rules" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deal_id" BIGINT NOT NULL,
    "resource_definition" JSON NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "ui_enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rules_userlists" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userlist_id" BIGINT,
    "rule_id" BIGINT,
    "blacklist" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "rules_userlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silos" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "chain_id" TEXT NOT NULL,
    "rpc_url" TEXT NOT NULL DEFAULT '',
    "genesis" TEXT NOT NULL,
    "engine_account" TEXT NOT NULL,
    "engine_version" TEXT NOT NULL,
    "network" TEXT NOT NULL DEFAULT 'public',
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grafana_network_key" TEXT,
    "explorer_url" TEXT,
    "blockscout_database_id" BIGINT,
    "gas_collection_address" TEXT,
    "gas_price" DOUBLE PRECISION,
    "base_token_name" TEXT NOT NULL,
    "base_token_symbol" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'contract',
    "replenish_threshold" INTEGER NOT NULL DEFAULT 10,
    "replenish_amount" INTEGER NOT NULL DEFAULT 10,
    "network_logo" TEXT NOT NULL DEFAULT '',
    "network_logo_dark" TEXT NOT NULL DEFAULT '',
    "favicon" TEXT NOT NULL DEFAULT '',
    "silo_to_silo_bridge_address" TEXT,

    CONSTRAINT "silos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silos_teams" (
    "silo_id" BIGINT NOT NULL,
    "team_id" BIGINT NOT NULL,

    CONSTRAINT "silos_teams_pkey" PRIMARY KEY ("silo_id","team_id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "email" TEXT,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "onboarding_status" "team_onboarding_status",
    "prepaid_transactions" BIGINT NOT NULL DEFAULT 1000,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "symbol" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "silo_id" BIGINT NOT NULL,
    "name" TEXT,
    "bridge_origin" TEXT DEFAULT 'ethereum',
    "decimals" BIGINT,
    "fast_bridge" BOOLEAN NOT NULL DEFAULT false,
    "bridge_addresses" TEXT[],
    "type" "token_type",
    "deployment_status" "deployment_status" NOT NULL DEFAULT 'NOT_DEPLOYED',
    "bridge_deployment_status" "deployment_status" NOT NULL DEFAULT 'NOT_DEPLOYED',
    "icon_url" TEXT,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userlists" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "team_id" BIGINT NOT NULL,
    "ui_enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "marketing_consent" BOOLEAN DEFAULT false,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_teams" (
    "user_id" BIGINT NOT NULL,
    "team_id" BIGINT NOT NULL,
    "confirmed_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_teams_pkey" PRIMARY KEY ("user_id","team_id")
);

-- CreateTable
CREATE TABLE "widgets" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "silo_id" BIGINT NOT NULL,
    "tokens" BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    "to_networks" "widget_network_type"[],
    "from_networks" "widget_network_type"[],

    CONSTRAINT "bridges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_created_at_idx" ON "datadog_web3_monitors"("created_at");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_datadog_id_idx" ON "datadog_web3_monitors"("datadog_id");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_engine_account_idx" ON "datadog_web3_monitors"("engine_account");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_key_idx" ON "datadog_web3_monitors"("key");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_need_remove_idx" ON "datadog_web3_monitors"("need_remove");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_need_update_idx" ON "datadog_web3_monitors"("need_update");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_removed_idx" ON "datadog_web3_monitors"("removed");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_silo_chain_id_idx" ON "datadog_web3_monitors"("silo_chain_id");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_silo_name_idx" ON "datadog_web3_monitors"("silo_name");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_silo_rpc_url_idx" ON "datadog_web3_monitors"("silo_rpc_url");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_template_key_idx" ON "datadog_web3_monitors"("template_key");

-- CreateIndex
CREATE INDEX "datadog_web3_monitors_updated_at_idx" ON "datadog_web3_monitors"("updated_at");

-- CreateIndex
CREATE INDEX "deals_deleted_at_idx" ON "deals"("deleted_at");

-- CreateIndex
CREATE INDEX "deals_updated_at_idx" ON "deals"("updated_at");

-- CreateIndex
CREATE INDEX "limits_deal_id_deleted_at_idx" ON "limits"("deal_id", "deleted_at");

-- CreateIndex
CREATE INDEX "limits_updated_at_idx" ON "limits"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "unique_team_network_type" ON "onboarding_form"("team_id", "networkType");

-- CreateIndex
CREATE INDEX "idx_replenishments_account_id" ON "replenishments"("account_id");

-- CreateIndex
CREATE INDEX "idx_replenishments_inserted_at" ON "replenishments"("inserted_at");

-- CreateIndex
CREATE INDEX "idx_replenishments_status" ON "replenishments"("status");

-- CreateIndex
CREATE INDEX "rule_users_updated_at_idx" ON "rule_users"("updated_at");

-- CreateIndex
CREATE INDEX "rule_users_userlists_userlist_id_deleted_at_idx" ON "rule_users_userlists"("userlist_id", "deleted_at");

-- CreateIndex
CREATE INDEX "rules_deal_id_deleted_at_idx" ON "rules"("deal_id", "deleted_at");

-- CreateIndex
CREATE INDEX "rules_updated_at_idx" ON "rules"("updated_at");

-- CreateIndex
CREATE INDEX "rules_userlists_rule_id_deleted_at_idx" ON "rules_userlists"("rule_id", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "rules_userlists_rule_id_userlist_id_unique" ON "rules_userlists"("rule_id", "userlist_id");

-- CreateIndex
CREATE UNIQUE INDEX "silos_chain_id_key" ON "silos"("chain_id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_site_key_key" ON "teams"("team_key");

-- CreateIndex
CREATE INDEX "userlists_updated_at_idx" ON "userlists"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "bridges_silo_id_key" ON "widgets"("silo_id");

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "public_api_keys_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "limits" ADD CONSTRAINT "limits_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_form" ADD CONSTRAINT "onboarding_form_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oracles" ADD CONSTRAINT "public_oracles_silo_id_fkey" FOREIGN KEY ("silo_id") REFERENCES "silos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "payments_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rule_user_deal_data" ADD CONSTRAINT "user_deal_data_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rule_user_deal_data" ADD CONSTRAINT "user_deal_data_role_user_id_fkey" FOREIGN KEY ("rule_user_id") REFERENCES "rule_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rule_users" ADD CONSTRAINT "rule_users_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rule_users_userlists" ADD CONSTRAINT "role_users_userlists_role_user_id_fkey" FOREIGN KEY ("rule_user_id") REFERENCES "rule_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rule_users_userlists" ADD CONSTRAINT "rule_users_userlists_userlist_id_fkey" FOREIGN KEY ("userlist_id") REFERENCES "userlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rules" ADD CONSTRAINT "rules_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rules_userlists" ADD CONSTRAINT "rules_userlists_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rules_userlists" ADD CONSTRAINT "rules_userlists_userlist_id_fkey" FOREIGN KEY ("userlist_id") REFERENCES "userlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "silos" ADD CONSTRAINT "silos_blockscout_database_id_fkey" FOREIGN KEY ("blockscout_database_id") REFERENCES "blockscout_databases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silos_teams" ADD CONSTRAINT "silos_teams_silo_id_fkey" FOREIGN KEY ("silo_id") REFERENCES "silos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silos_teams" ADD CONSTRAINT "silos_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_silo_id_fkey" FOREIGN KEY ("silo_id") REFERENCES "silos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userlists" ADD CONSTRAINT "userlists_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_teams" ADD CONSTRAINT "users_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_teams" ADD CONSTRAINT "users_teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "bridges_silo_id_fkey" FOREIGN KEY ("silo_id") REFERENCES "silos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

