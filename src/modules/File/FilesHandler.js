import {
    uploadFileController
} from './FilesController.js'

async function fileRoute(fastify, options, next) {
    const uploadFileSchema = {
        schema: {
            tags: ["file"],
            consumes: ['multipart/form-data'],
            params: {
                type: 'object',
                properties: {
                    model: { type: "string" },
                    id: { type: "integer" },
                },
                required: ['model', 'id']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: "string" }
                    }
                }
            }
        },
        preHandler: [fastify.authenticate, fastify.isAdmin]
    }
    fastify.post('/upload/:model/:id', uploadFileSchema, uploadFileController);
    next()
}

export default fileRoute;