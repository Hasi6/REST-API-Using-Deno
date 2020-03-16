import { Application } from "https://deno.land/x/oak/mod.ts";
import { APP_HOST, APP_PORT } from "./config/config.ts";
import router from './routes/routes.ts';

// Create Application Like Express
const app = new Application()

// Add Routes
app.use(router.routes())
app.use(router.allowedMethods())
// Display App running
console.log(`App Started at Port ${APP_PORT}`)

await app.listen(`${APP_HOST}:${APP_PORT}`)