import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('<h2>Welcome to mongoCrud</h2>');
});

export default app;
