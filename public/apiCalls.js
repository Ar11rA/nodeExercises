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
function read() {
  return fetch('/read', { method: 'get' })
}
function write(description){
  return fetch(`/write/${description}`, { method: 'post' })
}
function deleteTasks(id){
  return  fetch(`/destroy/${id}`, { method: 'delete' })
}
function updateTaskDescription(id,description){
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
function updateTaskStatus(id,status){
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
function updateAllTasksStatus(status)
{
  return fetch(`updateAll/${status}`, {
    method: 'put',
    headers: {
      "Content-type": "application/json"
    }
  })
}
function clearAllTasksTable()
{
  return  fetch(`/destroyAll`, { method: 'delete' })
}