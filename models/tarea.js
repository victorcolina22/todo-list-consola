const { v4: uuidv4 } = require('uuid')

class Tarea {
  completadoEn = null
  desc = ''
  id = ''

  constructor (desc) {
    this.completadoEn = null
    this.desc = desc
    this.id = uuidv4()
  }
}

module.exports = Tarea
