import { FastifyInstance } from "fastify";
import { authenticate } from './controllers/authenticate';
import { registerProduct } from "./controllers/register-product";
import { registerUser } from "./controllers/register-user";

export async function appRoutes(app: FastifyInstance) {
  app.post('/products', registerProduct),
  app.post('/users', registerUser),

  // rota de criação de sessão
  app.post('/sessions', authenticate)
}