/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from './user.model';
import { TProduct, TUser } from './user.interface';

//create a user query
const createUserIntoDB = async (userData: TUser) => {
  //static method
  if (await UserModel.isUserExists(userData.userId)) {
    throw new Error('User alrday exists');
  }
  const result = await UserModel.create(userData);

  return result;
};

// get all users query
const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select(
    '-userId -password -isActive -hobbies -orders -__v -_id',
  );
  return result;
};

// get single user query
const getSingleUserFromDB = async (id: number) => {
  if (await UserModel.isUserExists(id)) {
    const result = await UserModel.findOne({ userId: id }).select(
      '-password -orders -_id -orders -__v',
    );
    return result;
  } else {
    throw new Error('User not found');
  }
};

// update user query
const updateUserInDB = async (id: number, updatedUserData: TUser) => {
  if (await UserModel.isUserExists(id)) {
    const { password, ...userDataWithoutPassword } = updatedUserData;
    const result = await UserModel.findOneAndUpdate(
      { userId: id },
      { $set: userDataWithoutPassword },
      { new: true },
    ).select('-password -orders -_id -orders -__v');
    return result;
  } else {
    throw new Error('User does not exist');
  }
};

// delete a user query

const deleteUserFromDB = async (id: number) => {
  if (await UserModel.isUserExists(id)) {
    const result = await UserModel.findOneAndDelete({ userId: id });
    return result;
  } else {
    throw new Error('User not found');
  }
};

// Add new product to orders query
const addProductToOrdersInDB = async (userId: number, newProduct: TProduct) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: {
          ...newProduct,
        },
      },
    },
    { new: true },
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser.orders || [];
};
// get all orders query

const getAllOrdersFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    throw new Error('User not found');
  }
  return user.orders || [];
};

// calculate total price query
const getTotalPriceFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId }).select('orders');
  if (!user) {
    throw new Error('User not found');
  }

  const getTotalPrice =
    user.orders?.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ) || 0;

  const totalPrice = parseFloat(getTotalPrice.toFixed(2));

  return {
    totalPrice,
  };
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addProductToOrdersInDB,
  getAllOrdersFromDB,
  getTotalPriceFromDB,
};
