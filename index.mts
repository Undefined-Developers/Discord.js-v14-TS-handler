import("dotenv").then(dotenv => dotenv.config());
import("./structures/Sharder.mts").then(Sharder => Sharder.startSharderManager());