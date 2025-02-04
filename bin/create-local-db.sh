#!/bin/bash
# This script creates a new PostgreSQL database if it doesn't already exist,
# outputs the connection string to the terminal and saves it to a .env file.

# Database connection parameters
DB_USER="postgres"
DB_NAME="aurora_cloud_console"
DB_HOST="localhost"
DB_PORT="5432"


# Check if the database already exists
echo "Checking if database '$DB_NAME' exists..."
DB_EXISTS=$(psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';")

if [ "$DB_EXISTS" = "1" ]; then
  echo "Database '$DB_NAME' already exists. Skipping creation."
else
  # Create the database since it does not exist
  echo "Creating database '$DB_NAME'..."
  psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -c "CREATE DATABASE $DB_NAME;" 2>&1
  if [ $? -ne 0 ]; then
    echo "Error: Failed to create database '$DB_NAME'."
    exit 1
  else
    echo "Database '$DB_NAME' created successfully."
  fi
fi

CONNECTION_STRING="postgresql://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

echo -e "Connection string: ${CONNECTION_STRING}"

# Save to .env file (update if it exists, otherwise append)
ENV_FILE=".env"

if grep -q "^DATABASE_URL=" "$ENV_FILE"; then
  # Update existing DATABASE_URL
  sed -i '' -e "s|^DATABASE_URL=.*|DATABASE_URL=$CONNECTION_STRING|" "$ENV_FILE"
else
  # Append if not found
  echo "DATABASE_URL=$CONNECTION_STRING" >> "$ENV_FILE"
fi

echo "DATABASE_URL saved to $ENV_FILE"
