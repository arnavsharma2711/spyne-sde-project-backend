import { eq } from 'drizzle-orm';
import databaseInstance from '../lib/db';
import { posts as Post, hashtag_mappings as HashtagMappings } from '../lib/db/schema';
import { CustomError } from '../lib/error/custom.error';

export const createPost = async (user_id: number, description: string, hashtags_ids: number[] | []) => {
  const values = {
    user_id,
    text: description,
    view_count: 0,
  };

  const newPost = await databaseInstance.transaction(async (transaction) => {
    const post = await transaction
      .insert(Post)
      .values(values)
      .returning({ id: Post.id, description: Post.text, author_id: Post.user_id, view_count: Post.view_count });

    const hashtagMappingsValues = hashtags_ids.map((hashtag_id) => ({ hashtag_id, post_id: post[0].id }));
    console.log(hashtags_ids);
    await transaction.insert(HashtagMappings).values(hashtagMappingsValues);
    return post[0];
  });

  return newPost;
};

export const updatePost = async (post_id: number, description: string, hashtags_ids: number[] | []) => {
  const values = {
    text: description,
  };

  const updatedPost = await databaseInstance.transaction(async (transaction) => {
    const post = await transaction
      .update(Post)
      .set(values)
      .where(eq(Post.id, post_id))
      .returning({ id: Post.id, description: Post.text, author_id: Post.user_id, view_count: Post.view_count });

    await transaction.delete(HashtagMappings).where(eq(HashtagMappings.post_id, post_id));

    const hashtagMappingsValues = hashtags_ids.map((hashtag_id) => ({ hashtag_id, post_id }));
    await transaction.insert(HashtagMappings).values(hashtagMappingsValues);

    return post;
  });

  return updatedPost[0];
};

export const findPostById = async (post_id: number, with_hashtags: boolean = false) => {
  let query = databaseInstance
    .select({ id: Post.id, description: Post.text, author_id: Post.user_id, view_count: Post.view_count })
    .from(Post)
    .where(eq(Post.id, post_id));

  if (with_hashtags) {
    query = query.leftJoin(HashtagMappings, eq(Post.id, HashtagMappings.post_id));
  }

  const post = await query;
  return post[0];
};

export const deletePost = async (post_id: number, user_id: number) => {
  const post = await findPostById(post_id);
  if (post.author_id !== user_id) {
    throw new CustomError(401, 'Authentication Error', 'You are not authorized to delete this post!');
  }

  await databaseInstance.transaction(async (transaction) => {
    await transaction.delete(HashtagMappings).where(eq(HashtagMappings.post_id, post_id));

    await transaction.delete(Post).where(eq(Post.id, post_id));
  });
};
