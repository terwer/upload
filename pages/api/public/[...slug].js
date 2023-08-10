import fetch from 'node-fetch';

export default function handler(req, res) {
    // https://img1.terwer.space/api/public/202305170045084.jpg
    const imagePath = req.query.slug.join("/");
    let host = req.headers.host;
    if (host.indexOf("localhost") > -1) {
        host = "http://localhost:3000";
    } else {
        host = "https://img1.terwer.space";
    }
    const fileUrl = `${host}/${imagePath}`;
    console.log("fileUrl=>", fileUrl)

    fetch(fileUrl).then(async (v) => {
        if (v.status == 200) {
            const absUrl = '/' + imagePath;
            console.log("absUrl=>", absUrl)
            res.redirect(307, '/' + imagePath).end()
        } else {
            // 获取中间代理地址
            const newUrl = 'https://ghproxy.com/https://raw.githubusercontent.com/terwer/upload/main/public/' + imagePath
            console.log("newUrl=>", newUrl)
            res.redirect(307, newUrl).end()
        }
    }).catch(err => {
        console.log(err)
        res.end("500")
    });
}
