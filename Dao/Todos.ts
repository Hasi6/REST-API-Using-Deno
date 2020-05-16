import ToDos from '../models/todos.ts';
import db from '../config/db.ts';

const database = db.getDatabase;
const todos = database.collection("todos");

export class TodosDao {


    // Add Todo
    public addTodo = async (newTodo: ToDos): Promise<ToDos | null> => {
        try {
            const nTodo = await todos.insertOne({
                newTodo
            });
            return nTodo;
        } catch (err) {
            console.log(err.message)
            return null;
        }
    }


}