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
        let statusDisplay = (status == 'true') ? 'Completed':'Pending';
        let checked = task.status == true ? 'checked' : '\0'
        listElement.innerHTML += `<tr>
        <td>${id}</td>
        <td>
        <input class="desc-design" type='text' id='${task.id}-desc' value='${desc}' onfocusout='updateList(${task.id})'></input>
        </td>
        <td>${statusDisplay}</td>
        <td>
        <input type="checkbox" id="${task.id}" value="${task.status}" onchange="updateStatus(${task.id})" ${checked}>
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
    description = document.getElementById('data').value=''
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
  let description = document.getElementById(`${id}-desc`).value
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
    .then(() => {
      return outputList()
    })
    .catch(function (err) {
      console.log(err)
    })
}
function updateStatus(id) {
  let status = document.getElementById(id).value
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
