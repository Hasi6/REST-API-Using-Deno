import { DB_PATH } from '../config/config.ts';
import ToDos from '../models/todos.ts';

export const getTodosFromJson: () => Promise<ToDos[]> = async () => {
    try {
        const data: any = await Deno.readFile(DB_PATH);

        // Decode Data From File
        const decode = new TextDecoder()
        const decodedData = decode.decode(data)

        return JSON.parse(decodedData)


    } catch (err) {
        console.error(err.message);
    }
}


export const writeDataToJson: (todos: ToDos[]) => Promise<void> = async (todos: ToDos[]): Promise<void> => {
    try {
        // encode Json
        const encode = new TextEncoder();
        await Deno.writeFile(DB_PATH, encode.encode(JSON.stringify(todos)))
    } catch (err) {
        console.error(err.message);
    }
} 