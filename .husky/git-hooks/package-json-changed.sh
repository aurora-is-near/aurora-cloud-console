#!/bin/sh

changed() {
	git diff --name-only HEAD@{1} HEAD | grep -q "$1"
}

Restore='\001\003[0m\002'
Green='\033[0;32m'
Red='\033[0;31m'

echo "Checking dependency updates...\n"

if changed '^yarn\.lock'; then
	echo "${Green}####################################################################################"
	echo "# yarn.lock changed. Run yarn to bring your dependencies up to date."
	echo "####################################################################################${Restore}"
fi
