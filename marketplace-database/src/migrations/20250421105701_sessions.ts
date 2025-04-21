import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("session", (table) => {
    table.string("sid").notNullable().primary();
    table.json("sess").notNullable();
    table.timestamp("expire", { useTz: true }).notNullable();
  });

  // Create index for expire column
  await knex.schema.raw(
    'CREATE INDEX "IDX_session_expire" ON "session" ("expire")'
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("session");
}
