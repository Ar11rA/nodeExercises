let entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
function enableText(obj) {
  obj.readOnly = ""
}
let idMap = []

function addToHtml(task) {
  let checked = task.status == true ? 'checked' : null
  console.log(checked)
  let string = `<tr class="border-bottom" id='${task.id}-desc-status'>
        <td>
        <input type="checkbox" id="${task.id}-chk" value="${task.status}" onchange="updateStatus(${task.id})" ${checked}>
        </td>
        <td>
        <input class="desc-design ${checked ? 'striked' : ''} " type='text' id='${task.id}-desc' value='${task.description}'  readonly="true" ondblclick="enableText(this)" onfocusout='updateList(${task.id})' ></input>
        </td>
        <td>
        <button class="btn" id="${task.id}-btn" type="button" onclick="deleteTask
        (${task.id})">❌</button>
        </td>
        </tr>`
  return string
}
let todos = []
function istrue(obj) {
  return (obj.status == true)
}
function displayDone(){

}
function outputList() {
  return fetch('/read', { method: 'get' })
    .then(function (response) {
      return response.json()
    })
    .then((tasks) => {
      count = 0
      const listElement = document.getElementById('taskTable')
      listElement.innerHTML = ''
      tasks.forEach((task, index) => {
        todos[count] = {
          id: task.id,
          description: task.description,
          status: task.status
        }
        let id = escapeHtml(index + 1)
        let desc = escapeHtml(task.description)
        let status = escapeHtml(task.status)
        let checked = task.status == true ? 'checked' : null
        listElement.innerHTML += addToHtml(todos[count])
        idMap[count] = task.id
        count = count + 1
        console.log(todos)
      })
    })
    .catch(function (err) {
      console.log(err)
    })
}
document.getElementById('data').onkeydown = function (e) {
  if (e.keyCode === 13) {
    let description = document.getElementById('data').value
    let status = false
    let listElement = document.getElementById('taskTable')
    fetch(`/write/${description}`, { method: 'post' })
      .then((response) => {
        return response.json()
      })
      .then((text) => {
        id = text[0].id
        let objLength = todos.length
        let obj = { id, description, status }
        todos[length] = { obj }
        listElement.innerHTML += addToHtml(obj)
      })
      .catch(function (err) {
        console.log(err)
      })
    document.getElementById('data').value = ''
  }
}

function deleteTask(id) {
  let listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let statusBool = document.getElementById(`${id}-chk`).value
  let taskObj = {
    id, description, statusBool
  }
  fetch(`/destroy/${id}`, { method: 'delete' })
    .then(() => {
      let delId
      idMap.forEach((element, index) => {
        if (element == id) {
          delId = index
        }
        todos.splice(delId, 1)
      })
      listElement.parentNode.removeChild(listElement)
    })
    .catch(function (err) {
      console.log(err)
    })
}
function updateList(id) {
  let listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let statusBool = document.getElementById(`${id}-chk`).value
  let index = todos.findIndex(x => x.id == id)
  let checked = status == true ? 'checked' : null
  let taskObj = {
    id, description, statusBool
  }
  todos[index].status = statusBool
  todos[index].description = description
  let data = {
    description: description,
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(() => {
      listElement.innerHTML = addToHtml(taskObj)
    })
    .catch(function (err) {
      console.log(err)
    })
}
function updateStatus(id) {
  let listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let status = document.getElementById(`${id}-chk`).value
  status = (status == 'false') ? true : false
  let checked = status == true ? 'checked' : null
  let index = todos.findIndex(x => x.id == id)
  let taskObj = {
    id, description, status
  }
  todos[index].status = status
  todos[index].description = description
  let data = {
    status: status
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(() => {
      listElement.innerHTML = addToHtml(taskObj)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function updateAll() {
  let statusAll;
  let listElement = document.getElementById('taskTable')
  statusAll = todos.every(istrue)
  if (statusAll == true) {
    statusAll = false;
    todos.forEach((element) => {
      element.status = false;
    })
  }
  else {
    statusAll = true;
    todos.forEach((element) => {
      element.status = true;
    })
  }
  fetch(`updateAll/${statusAll}`, {
    method: 'put',
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(() => {
      listElement.innerHTML=''
      todos.forEach((task)=>{
        listElement.innerHTML += addToHtml(task)
      })

    }
    )
}

