import { Response } from "https://deno.land/x/oak/mod.ts";
import { getTodosFromJson } from '../../db/db.ts';

const getTodo = async ({ params, response }: { params: any, response: Response }) => {
    const id = params?.id
    if (!id) {
        response.status = 400;
        response.body = { msg: 'Invalid Id' }
    }

    const todos = await getTodosFromJson()

    const todo = todos.find(todo => todo.id === id)

    if (!todo) {
        response.status = 404;
        response.body = { msg: `No Todo Found on ${id}` }
        return;
    }

    response.status = 200;
    response.body = todo;


}

export default getTodo