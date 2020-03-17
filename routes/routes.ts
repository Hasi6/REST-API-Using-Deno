import { Router } from "https://deno.land/x/oak/mod.ts";
import getTodos from './todos/getTodos.ts';
import getTodo from './todos/getTodo.ts';
import addTodo from './todos/addTodos.ts';
import deleteTodo from './todos/deleteTodo.ts';
import editTodo from './todos/editTodo.ts';

const router = new Router()

router.get('/todos', getTodos)
router.get('/todo/:id', getTodo)
router.post('/addTodo', addTodo)
router.put('/editTodo/:id', editTodo)
router.delete('/deleteTodo/:id', deleteTodo)

export default router;