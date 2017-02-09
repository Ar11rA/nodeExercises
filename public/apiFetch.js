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
        let checked = task.status == true ? 'checked' : '\0'
        listElement.innerHTML += `<tr id='${task.id}-desc-status'>
        <td>
        <input class="desc-design" type='text' id='${task.id}-desc' value='${desc}' onfocusout='updateList(${task.id})'></input>
        </td>
        <td>
        <input type="checkbox" id="${task.id}-chk" value="${task.status}" onchange="updateStatus(${task.id})" ${checked}>
        </td>
        <td>
        <button id="${task.id}" type="button" onclick="deleteTask
        (this.id)">❌</button>
        </td>
        </tr>`
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
  console.log(id)
  fetch(`/destroy/${id}`, { method: 'delete' })
    .then((response) => {
      console.log(response)
      return outputList()
    })
    .then()
    .catch(function (err) {
      console.log(err)
    })
}
function updateList(id) {
  //let id = document.getElementById('lineNumber').value
  const listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let statusBool = document.getElementById(`${id}-chk`).value
  let checked = status == true ? 'checked' : '\0'
  let data = {
    description: description,
  }
  //console.log(description)
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then((res) => {
      return res.json()
      //return outputList()
    })
    .then((text) => {
      const idTask = (text[0][0].id)
      listElement.innerHTML = `<tr id='${idTask}-desc-status'>
        <td>
        <input class="desc-design" type='text' id='${idTask}-desc' value='${description}' onfocusout='updateList(${idTask})'></input>
        </td>
        <td>
        <input type="checkbox" id="${idTask}-chk" value="${statusBool}" onchange="updateStatus(${id})" ${checked}>
        </td>
        <td>
        <button id="${idTask}" type="button" onclick="deleteTask
        (this.id)">❌</button>
        </td>
        </tr>`
    })
    .catch(function (err) {
      console.log(err)
    })
}
function updateStatus(id) {
  let status = document.getElementById(`${id}-chk`).value
  console.log(status)
  status = (status == 'false') ? true : false
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
      return outputList()
    })
    .catch(function (err) {
      console.log(err)
    })
}
