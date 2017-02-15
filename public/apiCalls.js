let entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
  '\\': '&#92;'
};
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/\\]/g, function (s) {
    return entityMap[s];
  });
}
function read() {
  return fetch('/read', { method: 'get' })
}
function write(description) {
  if (description) {
    return fetch(`/write/${description}`, { method: 'post' })
  }
  return 'No Description given'
}
function deleteTasks(id) {
  if (id)
    return fetch(`/destroy/${id}`, { method: 'delete' })
  else
    return 'No id given'
}
function updateTaskDescription(id, description) {
  let data = {
    description: description,
  }
  return fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
}
function updateTaskStatus(id, status) {
  let data = {
    status: status
  }
  return fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
}
function updateAllTasksStatus(status) {
  if (typeof (status) === 'boolean') {
    return fetch(`/updateAll/${status}`, {
      method: 'put',
      headers: {
        "Content-type": "application/json"
      }
    })
  }
  else
  return 'Status entered is not boolean'
}
function clearAllTasksTable() {
  return fetch(`/destroyAll`, { method: 'delete' })
}