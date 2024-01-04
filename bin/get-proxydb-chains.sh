#!/bin/bash

# Source the .env.local file
export $(grep -v '^#' .env.local | xargs)

# Proxy DB query
QUERY_OUTPUT=$(psql -U $PROXY_DB_USER -h $PROXY_DB_HOST -p $PROXY_DB_PORT $PROXY_DB_DATABASE -c "SELECT distinct chain_id FROM tx_traces;")

# Initialize variables for column widths and headings
max_chain_id_length=0
max_name_length=0

# Initialize arrays to store chain IDs and chain IDs that couldn't be parsed
chain_ids=()
unparsed_chain_ids=()

# Find maximum lengths for chain_id and name
while read -r chain_id; do
    response=$(curl -s "https://chainlist.org/_next/data/9wSD3RvPEQg0YQsxD1Uq_/chain/${chain_id}.json?chain=${chain_id}")
    name=$(echo "$response" | jq -r '.pageProps.chain.name' 2>/dev/null)

    if [ -z "$name" ]; then
        unparsed_chain_ids+=("$chain_id")
    else
        chain_ids+=("$chain_id")
        if [ ${#chain_id} -gt $max_chain_id_length ]; then
            max_chain_id_length=${#chain_id}
        fi
        if [ ${#name} -gt $max_name_length ]; then
            max_name_length=${#name}
        fi
    fi
done <<< "$(echo "$QUERY_OUTPUT" | grep -o '[0-9]\+')"

# Display headings for the columns
printf "%-${max_chain_id_length}s | %-${max_name_length}s\n" "Chain ID" "Chain Name"
printf "%-${max_chain_id_length}s-+-%-${max_name_length}s\n" "----------" "-----------"

# Print parsed chain IDs
for chain_id in "${chain_ids[@]}"; do
    response=$(curl -s "https://chainlist.org/_next/data/9wSD3RvPEQg0YQsxD1Uq_/chain/${chain_id}.json?chain=${chain_id}")
    name=$(echo "$response" | jq -r '.pageProps.chain.name' 2>/dev/null)

    printf "%-${max_chain_id_length}s | %-${max_name_length}s\n" "$chain_id" "$name"
done

# Report unparsed chain IDs
if [ ${#unparsed_chain_ids[@]} -gt 0 ]; then
    echo "The following chain IDs could not be parsed by jq:"
    printf "%s\n" "${unparsed_chain_ids[@]}"
fi
