const { pinyin } = require("pinyin")
var fs = require('fs');

const data = fs.readFileSync("./py-data.txt", "utf-8").replace(/\s*/g, "")
const pyData = []

for (const c of data) {
  pyData.push(pinyin(c)[0][0])
}

fs.writeFileSync("./src/assets/py-data.js", `export default ${JSON.stringify(pyData)}`)
console.log('生成成功')