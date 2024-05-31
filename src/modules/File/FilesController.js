import { saveFile } from './FilesRepository.js';

export async function uploadFileController(request, reply) {
    const model = request.params.model
    const id = request.params.id
    try {
        const data = await request.file();
        if ('file' in data) {
            if (data.mimetype.startsWith('image')) {
                await saveFile(data, model, id);
                return reply.code(200).send({ message: 'File successfully uploaded' });
            } else {
                return reply.code(415).send(Error('File uploaded have to be an image'))
            }
        } else {
            return reply.code(400).send(Error('No file uploaded'))
        }
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function uploadUserPhotoController(request, reply) {
    const { user } = request;
    try {
        const data = await request.file();
        if ('file' in data) {
            if (data.mimetype.startsWith('image')) {
                await saveFile(data, "users", user.id);
                return reply.code(200).send({ message: 'File successfully uploaded' });
            } else {
                return reply.code(415).send(Error('File uploaded have to be an image'))
            }
        } else {
            return reply.code(400).send(Error('No file uploaded'))
        }
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}