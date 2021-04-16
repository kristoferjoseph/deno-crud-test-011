(async function Todos() {
  // GET all todos
  let todos = await (await fetch('/todos', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })).json()

  // Update the DOM with data
  update(todos)

  function update (todos) {
    let list = document.getElementById('js-todos')
    let completed = document.getElementById('js-completed')
    let message = document.getElementById('js-message')
    let current = todos.filter(t => !t.completed)
    let complete = todos.filter(t => t.completed)
    let doneTitle = document.getElementById('js-done-title')
    let done = complete.length && !current.length
    let none = !complete.length && !current.length
    if (none) {
      message.innerHTML = Message({
        src: '/_static/rocket.svg',
        text: 'Let\'s get started!',
        alt: 'Rocket'
      })
    } else if (done) {
      message.innerHTML = Message({
        src: '/_static/astronaut.svg',
        text: 'You did it!',
        alt: 'Astronaut'
      })
    }

    if (complete.length) {
      doneTitle.classList.toggle('display-none')
    }

    list && current.length
      ? list.innerHTML = current.map(t => Todo(t)).join('')
      : ''

    completed && complete.length
      ? completed.innerHTML = complete.map(t => Todo(t)).join('')
      : ''
  }

  function Message (props) {
    props = props || {}
    let src = props.src || ''
    let text = props.text || ''

    return `
  <img class="max-width-100" src="${src}" alt=""/>
  <h3 class="font-size-1 font-weight-normal">${text}</h3>
    `
  }

  function Todo (props) {
    let text = props.text || ''
    let id = props.key || ''
    let created = props.created
    let checked = props.completed
    ? 'checked="checked"'
    : ''

    return `
  <li
    id="${id}"
    class="
    display-flex
    align-items-center
    border-bottom
    "
  >
    <form
      action="/todos"
      method="POST"
      class="
      min-width-0
      display-flex
      align-items-center
      flex-grow-1
      "
    >
      <input
        type="checkbox"
        name="completed"
        class="
          width-16
          margin-right-1
          cursor-pointer
        "
        ${checked}
      >
      <input
        type="text"
        name="text"
        value="${text}"
        class="
          min-width-0
          flex-grow-1
          border-none
          line-height-64
          color-royal
          font-weight-normal
          font-size-1
          focus-outline-0
        "
      >
      <input type="hidden" name="key" value="${id}"/>
      <input type="hidden" name="created" value="${created}"/>
      <button
        class="
          padding-1
          font-size-1
          background-white
          border-transparent
          cursor-pointer
          focus-border
          focus-outline-0
        "
      >
        <svg class="width-16 height-16 fill-royal">
          <use href="#icon-save"></use>
        </svg>
      </button>
    </form>
    <form
      action="/todos/delete"
      method="POST"
    >
      <input type="hidden" name="key" value="${id}" />
      <button
        class="
          padding-1
          font-size-1
          background-white
          border-transparent
          cursor-pointer
          focus-border
          focus-outline-0
        "
      >
      <svg class="width-16 height-16 fill-royal">
        <use href="#icon-trash"></use>
      </svg>
      </button>
    </form>
  </li>
    `
  }
}())
