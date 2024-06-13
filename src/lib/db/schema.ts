import { serial, pgTable, text, timestamp, varchar, pgEnum, uniqueIndex, integer } from 'drizzle-orm/pg-core';

//Enums
export const userStatus = pgEnum('user-status', ['public', 'private']);

// Schemas

export const users = pgTable(
  'users',
  {
    id: serial('id').notNull().primaryKey(),
    email: text('email').notNull().unique(),
    full_name: varchar('full_name', { length: 255 }),
    phone_number: varchar('phone_number', { length: 255 }).unique(),
    encrypted_password: text('encrypted_password'),
    access_token: text('access_token'),
    refresh_token: text('refresh_token'),
    created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (users) => {
    return {
      usersEmailIdx: uniqueIndex('users_email_idx').on(users.email),
      usersPhoneNumberIndex: uniqueIndex('users_phone_number_idx').on(users.phone_number),
      usersFullNameIndex: uniqueIndex('users_full_name_idx').on(users.full_name),
    };
  },
);

export const posts = pgTable(
  'posts',
  {
    id: serial('id').notNull().primaryKey(),
    text: text('text').notNull(),
    user_id: serial('user_id')
      .notNull()
      .references(() => users.id),
    view_count: integer('view_count').notNull(),
    created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (posts) => {
    return {
      postsUserIdIdx: uniqueIndex('posts_user_id_idx').on(posts.user_id),
    };
  },
);

export const comments = pgTable(
  'comments',
  {
    id: serial('id').notNull().primaryKey(),
    text: text('text').notNull(),
    user_id: serial('user_id')
      .notNull()
      .references(() => users.id),
    post_id: serial('post_id')
      .notNull()
      .references(() => posts.id),
    parentId: integer('parent_id'),
    created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (comments) => {
    return {
      commentsUserIdIndex: uniqueIndex('comments_user_id_idx').on(comments.user_id),
      commentsPostIdIndex: uniqueIndex('comments_post_id_idx').on(comments.post_id),
      commentsParentIdIndex: uniqueIndex('comments_parent_id_idx').on(comments.parentId),
    };
  },
);

export const reactions = pgTable(
  'reactions',
  {
    id: serial('id').notNull().primaryKey(),
    user_id: serial('user_id')
      .notNull()
      .references(() => users.id),
    entity_type: text('entity_type').notNull(),
    entity_id: serial('entity_id').notNull(),
    created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (reactions) => {
    return {
      reactionsUserIdIndex: uniqueIndex('reactions_user_id_idx').on(reactions.user_id),
      reactionsEntityTypeIndex: uniqueIndex('reactions_entity_type_idx').on(reactions.entity_type),
      reactionsEntityIdIndex: uniqueIndex('reactions_entity_id_idx').on(reactions.entity_id),
    };
  },
);

export const hashtags = pgTable(
  'hashtags',
  {
    id: serial('id').notNull().primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (hashtags) => {
    return {
      hashtagsNameIndex: uniqueIndex('hashtags_name_idx').on(hashtags.name),
    };
  },
);

export const hashtag_mappings = pgTable(
  'hashtag_mappings',
  {
    id: serial('id').notNull().primaryKey(),
    post_id: serial('post_id')
      .notNull()
      .references(() => posts.id),
    hashtag_id: serial('hashtag_id')
      .notNull()
      .references(() => hashtags.id),
    created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (hashtag_mappings) => {
    return {
      hashtagMappingsPostIdIndex: uniqueIndex('hashtag_mappings_post_id_idx').on(hashtag_mappings.post_id),
      hashtagMappingsHashtagIdIndex: uniqueIndex('hashtag_mappings_hashtag_id_idx').on(hashtag_mappings.hashtag_id),
    };
  },
);

export const follower_mappings = pgTable(
  'follower_mappings',
  {
    id: serial('id').notNull().primaryKey(),
    follower_id: serial('follower_id')
      .notNull()
      .references(() => users.id),
    following_id: serial('following_id')
      .notNull()
      .references(() => users.id),
    created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  },
  (follower_mappings) => {
    return {
      followerMappingsFollowerIdIndex: uniqueIndex('follower_mappings_follower_id_idx').on(follower_mappings.follower_id),
      followerMappingsFollowingIdIndex: uniqueIndex('follower_mappings_following_id_idx').on(follower_mappings.following_id),
    };
  },
);