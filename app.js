const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu, inquirerPausa, leerInput, listadoTareasBorrar, confirmar, completarTareas } = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

require('colors')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()
  const tareasDB = leerDB()

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción: ')
        tareas.crearTarea(desc)
        break

      case '2':
        tareas.listadoCompleto()
        break

      case '3':
        tareas.listarCompletadasPendientes()
        break

      case '4':
        tareas.listarCompletadasPendientes(false)
        break

      case '5':
        const ids = await completarTareas(tareas.listarTareas)
        tareas.toogleCompletar(ids)
        break

      case '6':
        const id = await listadoTareasBorrar(tareas.listarTareas)
        if (id !== '0') {
          const ok = await confirmar('¿Está seguro que quiere borrar esta tarea?')
          ok && tareas.borrarTarea(id)
        }
        break
    }

    guardarDB(tareas.listarTareas)
    if (opt !== '0') await inquirerPausa()
  } while (opt !== '0')
}

main()
