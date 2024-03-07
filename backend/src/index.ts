import dotenv from 'dotenv';

import { app } from './app';

/* --------------------- load env variables in dev mode --------------------- */
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('app runnig at port ', port);
});
