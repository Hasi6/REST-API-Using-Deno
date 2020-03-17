import { Response, Request } from "https://deno.land/x/oak/mod.ts";
import { getTodosFromJson, writeDataToJson } from '../../db/db.ts';
import ToDos from '../../models/todos.ts';

const editTodo = async ({ params, request, response }: { params: any, request: Request, response: Response }): Promise<void> => {
    try {

        // Save todo id to a variable
        const id = params.id;

        // Check Request Has a body or not
        if (!request.hasBody) {
            response.status = 400;
            response.body = { msg: "Invalid data, Please Add Title and Description" };
            return;
        }

        // Get Title and description from Request
        const {
            value: { title, description }
        } = await request.body();

        // Check title and description is valid
        if (!title || !description) {
            response.status = 422;
            response.body = { msg: "Title and Description is required" };
            return;
        }

        // Get All Todos From Json File And Save it in to a Variable
        let allTodos: ToDos[] = await getTodosFromJson();

        // Check if todo is here in that Id sent by client
        const todo: ToDos | undefined = allTodos.find((todo: ToDos) => todo.id === id)



        // check todo is undefined, if so then response 404
        if (!todo) {
            response.status = 404;
            response.body = { msg: `No Todo Found on this ${id} id` }
            return;
        }

        //    Add New Title And Description to Old One
        todo.title = title;
        todo.description = description;

        await writeDataToJson(allTodos)

        response.status = 200;
        response.body = { msg: "Todo has been Edited", todo }

    } catch (err) {
        console.error(err.message);
    }
}

export default editTodo;