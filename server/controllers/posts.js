import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE NEW POST */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    // save new post to db
    await newPost.save();
    // grab all the posts and return to front end (list of updated posts)
    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    // return all the posts
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // use user ID to grab posts of user
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    // grab post from post id in url
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    // check in likes if user id exists - means post has been liked by that person
    // likes object - keys are ids of user
    const isLiked = post.likes.get(userId);

    // toggle the user likes - if exists deletes, if doesn't sets it
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // find the post by the id from url, and update the post likes object
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true },
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
