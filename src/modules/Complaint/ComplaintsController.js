import {
    findAllComplaints,
    createComplaint
} from "./ComplaintsRepository.js";

export async function getAllComplaintController(request, reply) {
    const queries = {
        where: {},
        include: { User: true }
    }
    const { name } = request.query;
    if (name) {
        queries.where.User = { name: { contains: name, mode: "insensitive" } }
    }
    try {
        const complaints = await findAllComplaints(queries);
        return reply.code(200).send(complaints);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}

export async function createComplaintController(request, reply) {
    const body = request.body;
    body.id_user = request.user.id;
    try {
        const complaint = await createComplaint(body);
        return reply.code(201).send(complaint);
    } catch (error) {
        return reply.code(500).send(Error(error.message));
    }
}