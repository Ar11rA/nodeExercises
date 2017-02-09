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
function addToHtml(task) {
  let checked = task.status == true ? 'checked' : null
  let string = `<tr id='${task.id}-desc-status'>
        <td>
        <input class="desc-design ${checked ? 'striked' : ''}" type='text' id='${task.id}-desc' value='${task.description}' onfocusout='updateList(${task.id})'></input>
        </td>
        <td>
        <input type="checkbox" id="${task.id}-chk" value="${task.status}" onchange="updateStatus(${task.id})" ${checked}>
        </td>
        <td>
        <button id="${task.id}" type="button" onclick="deleteTask
        (${task.id})">❌</button>
        </td>
        </tr>`
  return string
}
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
let idMap = []
function mapTasks(task) {
  idMap = task.map(({id}) => id)
}

function outputList() {
  return fetch('/read', { method: 'get' })
    .then(function (response) {
      return response.json()
    })
    .then((tasks) => {
      const listElement = document.getElementById('taskTable')
      listElement.innerHTML = ''
      mapTasks(tasks)
      tasks.forEach((task, index) => {
        let id = escapeHtml(index + 1)
        let desc = escapeHtml(task.description)
        let status = escapeHtml(task.status)
        let checked = task.status == true ? 'checked' : null
        console.log(checked)
        listElement.innerHTML += addToHtml(task)

      })
    })
    .catch(function (err) {
      console.log(err)
    })
}



function writeList() {
  description = document.getElementById('data').value
  //let escapedDescription = escapeHtml(description)
  fetch(`/write/${description}`, { method: 'post' })
    .then((response) => {
      return outputList()
    })
    .then()
    .catch(function (err) {
      console.log(err)
    })
  description = document.getElementById('data').value = ''
}
function deleteTask(id) {
  const listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let statusBool = document.getElementById(`${id}-chk`).value
   let taskObj = {
    id, description, statusBool
  }
  fetch(`/destroy/${id}`, { method: 'delete' })
    .then(() => {
      listElement.parentNode.removeChild(listElement)
    })
    
    .catch(function (err) {
      console.log(err)
    })
}
function updateList(id) {
  const listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let statusBool = document.getElementById(`${id}-chk`).value
  let checked = status == true ? 'checked' : null
  let taskObj = {
    id, description, statusBool
  }
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
  const listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let status = document.getElementById(`${id}-chk`).value
  status = (status == 'false') ? true : false
  let checked = status == true ? 'checked' : null
  let taskObj = {
    id, description, status
  }
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
