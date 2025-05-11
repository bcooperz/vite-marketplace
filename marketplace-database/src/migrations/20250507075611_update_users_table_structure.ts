import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.string("first_name", 255);
    table.string("last_name", 255);
    table.dropColumn("full_name");
    table.dropColumn("last_login");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("first_name");
    table.dropColumn("last_name");
    table.string("full_name", 255);
    table.timestamp("last_login");
  });
}
