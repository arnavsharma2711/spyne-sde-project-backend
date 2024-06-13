import { controllerWrapper } from '../../lib/controllerWrapper';
import build_response from '../../lib/response/MessageResponse';
import { fetchPostSchema, postIdSchema, postSchema, postSearchParamsSchema } from '../../lib/zod/post.schema';
import { addLike, createNewPost, deleteExistingPost, fetchPost, removeLike, searchPostList, updateExistingPost } from '../../services/post.service';

export const createPost = controllerWrapper(async (req, res) => {
  const { text, hashtags } = postSchema.parse(req.body);

  const postDetails = await createNewPost(req.user.id, text, hashtags);

  const postInfo = fetchPostSchema.parse(postDetails);
  res.status(200).json(build_response(true, 'Post created successfully!', null, null, postInfo));
});

export const updatePost = controllerWrapper(async (req, res) => {
  const { text, hashtags } = postSchema.parse(req.body);
  const { post_id } = postIdSchema.parse(req.params);

  const postDetails = await updateExistingPost(req.user.id, post_id, text, hashtags);

  const postInfo = fetchPostSchema.parse(postDetails);
  res.status(200).json(build_response(true, 'Post updated successfully!', null, null, postInfo));
});

export const deletePost = controllerWrapper(async (req, res) => {
  const { post_id } = postIdSchema.parse(req.params);

  await deleteExistingPost(req.user.id, post_id);

  res.status(200).json(build_response(true, 'Post deleted successfully!', null, null, null));
});

export const getPost = controllerWrapper(async (req, res) => {
  const { post_id } = postIdSchema.parse(req.params);

  const post = await fetchPost(post_id);

  const postInfo = await fetchPostSchema.parse(post);
  res.status(200).json(build_response(true, 'Post fetched successfully!', null, null, postInfo));
});

export const likePost = controllerWrapper(async (req, res) => {
  const { post_id } = postIdSchema.parse(req.params);

  await addLike(post_id, req.user.id);

  res.status(200).json(build_response(true, 'Post liked successfully!', null, null, null));
});

export const unLikePost = controllerWrapper(async (req, res) => {
  const { post_id } = postIdSchema.parse(req.params);

  await removeLike(post_id, req.user.id);

  res.status(200).json(build_response(true, 'Post liked successfully!', null, null, null));
});

export const searchPost = controllerWrapper(async (req, res) => {
  const { q, hashtags, page, limit } = postSearchParamsSchema.parse(req.body);

  const { total_count, postData } = await searchPostList(q, hashtags, page, limit);

  res.status(200).json(build_response(true, 'Users fetched successfully!', null, total_count, postData));
});
