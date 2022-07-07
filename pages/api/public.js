const fs = require('fs');
const path = require("path")

export default function handler(req, res) {
    const imagePath = req.query.pic.replace("/public/", "")
    const filePath = path.resolve(".", `public/${imagePath}`);
    console.log("filePath=>", filePath)
    // 已经同步直接取vercel的地址
    // https://img1.terwergreen.com/api/public?pic=20220707172601.png
    // http://localhost:3000/api/public?pic=20220707172601.png
    if (fs.existsSync(filePath)) {
        const absUrl = '/' + imagePath;
        console.log("absUrl=>", absUrl)
        res.redirect(307, '/' + imagePath).end()
    } else {
        // 获取中间代理地址
        // https://img1.terwergreen.com/api/public/20220706194731.png
        // http://localhost:3000/api/public/img?pic=20220706194731.png
        const newUrl = 'https://ghproxy.com/https://raw.githubusercontent.com/terwer/upload/main/public/' + imagePath
        console.log("newUrl=>", newUrl)
        res.redirect(307, newUrl).end()
    }
}
