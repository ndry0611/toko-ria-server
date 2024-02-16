import * as path from 'path';
import { saveFile } from '../../utils/upload.js';

export async function uploadFileController(request, reply) {
    try {
        const parts = request.parts();
        await saveFile(parts, 'user');
        return reply.code(200).send(parts);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}