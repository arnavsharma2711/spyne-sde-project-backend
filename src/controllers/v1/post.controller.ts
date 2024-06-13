import { controllerWrapper } from '../../lib/controllerWrapper';
import build_response from '../../lib/response/MessageResponse';
import { fetchPostSchema, postSchema } from '../../lib/zod/post.schema';
import { createNewPost } from '../../services/post.service';

export const createPost = controllerWrapper(async (req, res) => {
  const { text, hashtags } = postSchema.parse(req.body);

  const postDetails = await createNewPost(req.user.id, text, hashtags);
  console.log(postDetails);
  const postInfo = fetchPostSchema.parse(postDetails);
  res.status(200).json(build_response(true, 'Post created successfully!', null, null, postInfo));
});
