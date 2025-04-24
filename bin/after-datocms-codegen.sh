#!/usr/bin/env bash

# https://github.com/dotansimha/graphql-code-generator/issues/9046
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' -e '/types.dom/d' ./src/cms/generated/graphql.ts
else
  sed -i -e '/types.dom/d' ./src/cms/generated/graphql.ts
fi
