import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);

//get all orders for a user
router.put('/:userId/orders', UserControllers.addProductToOrders);
router.get('/:userId/orders', UserControllers.getAllOrders);
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);
export const UserRoutes = router;
