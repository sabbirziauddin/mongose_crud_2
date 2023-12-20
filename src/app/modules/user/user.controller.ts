/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { productValidationSchema } from './user.validation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // creating a schema validation using zod
    const zodParseData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParseData);

    const { password, orders, _id, ...userWithoutPassword } = result.toObject({
      versionKey: false,
    });

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userWithoutPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: 'user name already exists',
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'No user found',
      error: {
        code: 400,
        description: 'no user created',
      },
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: { code: 404, description: 'User not found!' },
    });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;

    try {
      const zodParseData = userValidationSchema.parse(updatedUserData);
      const result = await UserServices.updateUserInDB(
        parseInt(userId),
        zodParseData,
      );

      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'No user found',
      error: {
        code: 400,
        description: 'no user created',
      },
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// =================================================================================================
// =================================================================================================
// add a product to orders
const addProductToOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const newProduct = req.body;

    const zodParseData = productValidationSchema.parse(newProduct);
    const result = await UserServices.addProductToOrdersInDB(
      parseInt(userId),
      zodParseData,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// get all orders

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrdersFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: result },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get total price for a specific user
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// =================================================================================================
// =================================================================================================

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addProductToOrders,
  getAllOrders,
  getTotalPrice,
};
