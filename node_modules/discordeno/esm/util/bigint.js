export function snowflakeToBigint(snowflake) {
    return BigInt(snowflake) | 0n;
}
export function bigintToSnowflake(snowflake) {
    return snowflake === 0n ? "" : snowflake.toString();
}
