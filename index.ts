import { ErryClusterManager } from './structures/Sharder.ts';

import("dotenv").then(dotenv => dotenv.config());
const Cluster = new ErryClusterManager();