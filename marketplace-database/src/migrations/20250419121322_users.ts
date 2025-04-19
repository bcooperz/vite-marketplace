import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create UUID extension if it doesn't exist
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  // Create users table
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("email", 255).notNullable();
    table.string("password_hash", 255).notNullable();
    table.string("full_name", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("last_login");
    table.string("account_status", 50).defaultTo("active");

    // Add unique constraint for email
    table.unique("email", { indexName: "users_email_unique" });
    // Add email format check constraint
    knex.raw(`
            ALTER TABLE users 
            ADD CONSTRAINT email_format_check 
            CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
        `);
  });

  // Create index for email
  await knex.schema.raw("CREATE INDEX idx_users_email ON users(email)");
}

export async function down(knex: Knex): Promise<void> {
  // Drop the table and its dependencies
  await knex.schema.dropTable("users");

  // Optionally drop the UUID extension if you want to clean up completely
  // await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
