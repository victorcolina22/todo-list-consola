const inquirer = require('inquirer')
require('colors')

const prompt = inquirer.createPromptModule()
const menuOpt = [
  {
    type: 'list',
    name: 'opt',
    message: '¿Qué desea hacer?',
    choices: [
      {
        name: `${'1.'.green} Crear tarea`,
        value: '1'
      },
      {
        name: `${'2.'.green} Listar tareas`,
        value: '2'
      },
      {
        name: `${'3.'.green} Listar tareas completadas`,
        value: '3'
      },
      {
        name: `${'4.'.green} Listar tareas pendientes`,
        value: '4'
      },
      {
        name: `${'5.'.green} Completar tarea(s)`,
        value: '5'
      },
      {
        name: `${'6.'.green} Borrar tarea`,
        value: '6'
      },
      {
        name: `${'0.'.green} Salir`,
        value: '0'
      }
    ]
  }
]
const menuPausa = [
  {
    type: ' input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar`
  }
]

const inquirerMenu = async () => {
  console.clear()
  console.log('============================'.green)
  console.log('   Selecciones una opción   '.cyan)
  console.log('============================\n'.green)

  const { opt } = await prompt(menuOpt)
  return opt
}

const inquirerPausa = async () => {
  const { opt } = await prompt(menuPausa)
  return opt
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (answer) {
        if (answer.length === 0) return 'Por favor ingresa un valor'
        return true
      }
    }
  ]

  const { desc } = await prompt(question)
  return desc
}

const listadoTareasBorrar = async (tareas = []) => {
  const opciones = tareas.map((tarea, idx) => {
    const index = `${idx + 1}.`.green
    const completadas = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc} :: ${completadas}`
    }
  })
  opciones.unshift({
    value: '0',
    name: '0. '.green + 'Salir'
  })

  const menuOpciones = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices: opciones
    }
  ]

  const { id } = await prompt(menuOpciones)
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await prompt(question)
  return ok
}

const completarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, idx) => {
    const index = `${idx + 1}.`.green
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
      checked: !!tarea.completadoEn
    }
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Completar tarea(s)',
      choices
    }
  ]

  const { ids } = await prompt(questions)
  return ids
}

module.exports = {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  completarTareas
}
