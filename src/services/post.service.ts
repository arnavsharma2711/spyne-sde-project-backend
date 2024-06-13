import { fetchOrCreateHashtags } from '../models/hashtag.model';
import { createPost, deletePost, updatePost } from '../models/post.model';

export const createNewPost = async (user_id: number, description: string, hashtags: string[]) => {
  const fetched_hashtags = await fetchOrCreateHashtags(hashtags);
  console.log(fetched_hashtags);
  const hashtags_ids = fetched_hashtags.map((hashtag) => hashtag.id) || [];

  const post = await createPost(user_id, description, hashtags_ids);
  return post;
};

export const updateExistingPost = async (post_id: number, description: string, hashtags: []) => {
  const fetched_hashtags = await fetchOrCreateHashtags(hashtags);
  const hashtags_ids = fetched_hashtags.map((hashtag) => hashtag.id) || [];
  const updatedPost = await updatePost(post_id, description, hashtags_ids);
  return updatedPost;
};

export const deleteExistingPost = async (user_id: number, post_id: number) => {
  await deletePost(user_id, post_id);
};
