import prisma from '../../utils/prisma.js';
import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import { pipeline } from 'stream'
const pump = util.promisify(pipeline)

export async function saveFile(data, model, id) {
    const folderPath = path.join('public', 'uploads', model);
    const fileName = data.filename.split(".")
    const newFileName = [id, fileName[fileName.length - 1]].join('.')

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    };

    try {
        const previousFile = await prisma.file.findFirst({
            where: {
                file_model: model,
                file_id: Number(id)
            }
        });

        // Replace previous file if exist
        if (previousFile) {
            fs.unlinkSync(path.join(folderPath, previousFile.name));
            await prisma.file.update({
                where: { id: previousFile.id },
                data: {
                    name: newFileName,
                }
            });
        } else {
            await prisma.file.create({
                data: {
                    file_model: model,
                    file_id: id,
                    name: newFileName
                }
            });
        }
        await pump(data.file, fs.createWriteStream(path.join(folderPath, newFileName)));
    } catch (error) {
        throw new Error(error)
    }
}