import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    const imagePath = req.query.slug.join("/");
    const filePath = path.resolve(".", `img/${imagePath}`);
    const imageBuffer = await fs.readFileSync(filePath);
    res.setHeader("Content-Type", "image/jpg");
    return res.send(imageBuffer);
}