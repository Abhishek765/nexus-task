import { app } from './app';

import { connectDB } from './db/connectDB';

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(`Failed to connect: error: ${err}`));
