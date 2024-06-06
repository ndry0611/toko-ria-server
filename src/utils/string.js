import { format } from "date-fns";
import { customAlphabet } from "nanoid"

export function generateCode() {
    const date = format(new Date(), "d/MM/yy");
    const alphabet =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const code = `${date}/` + customAlphabet(alphabet, 10)()
    return code;
}