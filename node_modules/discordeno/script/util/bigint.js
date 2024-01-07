"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigintToSnowflake = exports.snowflakeToBigint = void 0;
function snowflakeToBigint(snowflake) {
    return BigInt(snowflake) | 0n;
}
exports.snowflakeToBigint = snowflakeToBigint;
function bigintToSnowflake(snowflake) {
    return snowflake === 0n ? "" : snowflake.toString();
}
exports.bigintToSnowflake = bigintToSnowflake;
