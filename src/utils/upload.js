import * as fs from 'fs'
import * as path from 'path'

export async function saveFile(formdata, model) {
    const folderPath = path.join(import.meta.dirname, '../..', 'public', 'uploads', model);

    //Create folder if not exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    try {
        const parts = formdata
        for await (const part of parts) {
            if (part.type === 'file') {
                const filepath = path.join(folderPath, part.filename);
                const fileStream = fs.createWriteStream(filepath);

                // we need to pipe this.
                await new Promise((resolve, reject => {
                    part.pipe(fileStream);
                    part.on('end', resolve);
                    part.on('error', reject);
                }));
            }
        }
    } catch (error) {
        console.log(error)
    }
}