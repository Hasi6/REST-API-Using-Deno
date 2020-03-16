import { Router } from "https://deno.land/x/oak/mod.ts";
import getTodos from './todos/getTodos.ts';
import getTodo from './todos/getTodo.ts';
import addTodo from './todos/addTodos.ts';

const router = new Router()

router.get('/todos', getTodos)
router.get('/todo/:id', getTodo)
router.post('/addTodo', addTodo)

export default router;