import { customAlphabet } from "nanoid";
export const newReqId = () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16)();