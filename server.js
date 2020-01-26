const express = require('express')
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.post('/', function (req, res) {
    const reqUrl = req.body.url
    const reqQuery = req.body.query
    const reqHeaders = req.body.headers
    Java.perform(function () {
        try {
            const url = Java.use("java.lang.String").$new(reqUrl + reqQuery)

            const headersMap = Java.use("java.util.TreeMap").$new()
            for (let key in reqHeaders) {
                if (reqHeaders.hasOwnProperty(key)) {
                    let header = Java.use("java.util.ArrayList").$new()
                    header.add(String(reqHeaders[key]))
                    headersMap.put(key, header)
                }
            }

            const funSign = Java.use("com.bytedance.frameworks.baselib.network.http.f")["b"](url, headersMap)
            const retVal = Java.cast(funSign, Java.use("java.util.HashMap")).toString()

            if (retVal.length > 0) {
                res.status(200).json({
                    "X-Gorgon": retVal.split(",")[0].slice(10),
                    "X-Khronos": retVal.split(",")[1].slice(11, -1)
                })
            } else {
                res.status(500).json({message: "empty signature"})
            }
            res.end()
        } catch (err) {
            res.status(500).json(err.stack)
            res.end()
        }
    })
})
app.listen(4000)
