export const { env } = process;
const { USER, npm_command } = env;

console.table({ USER, npm_command });