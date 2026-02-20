import { boolean, index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './users';

export const pasta = pgTable('pasta', {
  id: text().primaryKey(),
  title: text().notNull(),
  description: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
  public: boolean().notNull(),
  password: text(),

}, t => [
  index('pasta_user_id_idx').on(t.userId),
]);
