#!/bin/bash

# Usage: ./replace-gas-price.sh path/to/types.ts

FILE="$1"

if [[ -z "$FILE" ]]; then
  echo "❌ Please provide a TypeScript file as an argument."
  exit 1
fi

if [[ ! -f "$FILE" ]]; then
  echo "❌ File not found: $FILE"
  exit 1
fi

sed -i '' 's/gas_price: number/gas_price: bigint/g' "$FILE"
sed -i '' 's/gas_price?: number/gas_price?: bigint/g' "$FILE"

echo "✅ Replaced 'gas_price' types in $FILE"
