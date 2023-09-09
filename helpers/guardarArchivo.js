const fs = require('node:fs')

const archivo = 'db/data.json'

const guardarDB = (data) => {
  fs.writeFile(archivo, JSON.stringify(data, null, false), (err) => {
    if (err) throw err
  })
}

const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null
  }

  // PARA QUE NO REGRESE LA INFO EN BITS "{ encoding: "utf-8" }"
  const info = fs.readFileSync(archivo, { encoding: 'utf-8' })
  const data = JSON.parse(info)

  return data
}

module.exports = {
  guardarDB,
  leerDB
}
