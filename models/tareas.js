/**
 * _listado:
 *      {'uuid-1241234-143241-2': {id: 12, desc: asd, completadoEn: 99923}}
 */

const Tarea = require('./tarea')

class Tareas {
  _listado = {}

  get listarTareas () {
    const tareas = Object.values(this._listado).map((val) => ({
      id: val.id,
      desc: val.desc,
      completadoEn: val.completadoEn
    }))
    return tareas
  }

  constructor () {
    this._listado = {}
  }

  // TODO: Modificar para borrar varias tareas
  borrarTarea (id = '') {
    this._listado[id] && delete this._listado[id]
  }

  cargarTareasFromArray (tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  crearTarea (desc = '') {
    const [primeraLetra, ...rest] = desc.split('')
    const tareaFinal = primeraLetra.toUpperCase() + desc.slice(1)
    const tarea = new Tarea(tareaFinal)
    this._listado[tarea.id] = tarea
  }

  listadoCompleto () {
    console.log()
    Object.values(this._listado).forEach((val, idx) => {
      const { desc, completadoEn } = val
      const id = `${idx + 1}.`.green
      const completed = completadoEn ? 'Completada'.green : 'Pendiente'.red
      console.log(`${id} ${desc}:: ${completed}`)
    })
    console.log()
  }

  listarCompletadasPendientes (completadas = true) {
    console.log()
    let contador = 0
    Object.values(this._listado).forEach((val) => {
      const { desc, completadoEn } = val
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red

      if (completadas) {
        if (completadoEn) {
          contador += 1
          console.log(`${contador.toString().green + '.'.green} ${desc}:: ${completadoEn.green}`)
        }
      } else {
        if (!completadoEn) {
          contador += 1
          console.log(`${contador.toString().green + '.'.green} ${desc}:: ${estado}`)
        }
      }
    })
    console.log()
  }

  toogleCompletar (ids = []) {
    ids.forEach((val) => {
      const tarea = this._listado[val]

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listarTareas.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

module.exports = Tareas
