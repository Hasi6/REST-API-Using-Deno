import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { v4 as uuid } from "https://deno.land/std/uuid/mod.ts";
import ToDos from '../../models/todos.ts';
import { writeDataToJson, getTodosFromJson } from '../../db/db.ts';


const addTodo = async ({ request, response }: { request: Request, response: Response }) => {

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

    // Create New Todo
    const newTodo: ToDos = { id: uuid.generate(), title, description }

    // Get All Todos
    let allTodos: ToDos[] = await getTodosFromJson()

    // Add New Todo to allTodos Array
    allTodos = [newTodo, ...allTodos]

    // Save Data In ToDos.json File
    await writeDataToJson(allTodos)

    // Response To the Client
    response.body = { msg: "New Todo Created", newTodo };
};

export default addTodo