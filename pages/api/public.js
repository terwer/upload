import fetch from 'node-fetch';

export default function handler(req, res) {
    const imagePath = req.query.pic.replace("/public/", "")
    const fileUrl = `https://img1.terwergreen.com/${imagePath}`;
    console.log("fileUrl=>", fileUrl)

    fetch(fileUrl).then(async (v) => {
        if (v.status == 200) {
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
    }).catch(err => {
        console.log(err)
        res.end("500")
    });
}
