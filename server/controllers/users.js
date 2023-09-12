import User from "../models/User.js";

/* READ */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // returns an array of friends objects for friends of the specified user
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)),
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      },
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE FRIEND */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id); // user id
    const friend = await User.findById(friendId); // friend user id

    // add to both or remove from both
    // check if friendId is included in users friends
    if (user.friends.includes(friendId)) {
      // remove the friend if matches the friendId
      user.friends = user.friends.filter((id) => id !== friendId);
      // remove user from the friend user's friend list
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // save the updated user and friends object
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)),
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      },
    );

    // return new friends list that has been updated
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
