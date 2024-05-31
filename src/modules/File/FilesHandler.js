import {
    uploadFileController,
    uploadUserPhotoController
} from './FilesController.js'

async function fileRoute(fastify, options, next) {
    const uploadUserPhotoSchema = {
        schema: {
            tags: ['file'],
            consumes: ['multipart/form-data'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: "string" }
                    }
                }
            }
        },
        preHandler: [fastify.authenticate]
    }
    fastify.post('/upload/me', uploadUserPhotoSchema, uploadUserPhotoController);

    const uploadFileSchema = {
        schema: {
            tags: ["file"],
            consumes: ['multipart/form-data'],
            params: {
                type: 'object',
                properties: {
                    model: { type: "string", enum: ["users", "categories", "spare_parts"] },
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