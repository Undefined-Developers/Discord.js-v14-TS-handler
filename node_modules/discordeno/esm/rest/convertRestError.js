export function convertRestError(errorStack, data) {
    errorStack.message = `[${data.status}] ${data.error}\n${data.body}`;
    return errorStack;
}
