

// CHANGE TO true TO IGNORE OS WARNING
const force = false




import { INIT } from './functions_init';

import("dotenv").then(dotenv => {dotenv.config({path: __dirname+"/.env"}); INIT(force)});