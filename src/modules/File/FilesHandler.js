import {
    uploadFileController
} from './FilesController.js'

async function fileRoute(fastify, options, next) {
    const uploadFileSchema = {
        schema: {
            consumes: ['multipart/form-data']
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/upload', uploadFileSchema, uploadFileController);
    next()
}

export default fileRoute;