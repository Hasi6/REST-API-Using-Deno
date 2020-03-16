import { Response } from "https://deno.land/x/oak/mod.ts";
import ToDos from '../../models/todos.ts';
import id from '../../services/createIds.ts'
import { getTodosFromJson } from '../../db/db.ts';



const getTodos = async ({ response }: { response: Response }) => {

    try {
        const todos: ToDos[] = await getTodosFromJson()
        response.body = todos;
    } catch (err) {
        console.error(err.message);
    }
}

export default getTodos