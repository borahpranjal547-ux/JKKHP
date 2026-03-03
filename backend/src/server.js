import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { seedServices } from "./services/seedServices.js";

connectDB()
  .then(seedServices)
  .then(() => app.listen(env.port, () => console.log(`Backend running on ${env.port}`)))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
