import { Response } from "https://deno.land/x/oak/mod.ts";
import { getTodosFromJson, writeDataToJson } from '../../db/db.ts';
import ToDos from '../../models/todos.ts';

const deleteTodo = async ({ params, response }: { params: any, response: Response }): Promise<void> => {
    try {

        // Save todo id to a variable
        const id = params.id;

        // Get All Todos From Json File And Save it in to a Variable
        let allTodos = await getTodosFromJson();

        // Check if todo is here in that Id sent by client
        const index = allTodos.findIndex((todo: ToDos) => todo.id === id)

        // if todo is here index > 0 
        // if todo is not here index = -1

        // check index < 0, if so then response 404
        if (index < 0) {
            response.status = 404;
            response.body = { msg: `No Todo Found on this ${id} id` }
            return;
        }

        // if index > 0 then filter the array and delete todo and save
        allTodos = allTodos.filter((todo: ToDos) => todo.id !== id)

        await writeDataToJson(allTodos)

        response.status = 200;
        response.body = { msg: "Todo has been Deleted" }

    } catch (err) {
        console.error(err.message);
    }
}

export default deleteTodo;