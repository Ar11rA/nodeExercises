function enableText(obj) {
  obj.readOnly = ""
  obj.style.border = '1px solid #999'
  obj.style.boxShadow = 'inset 0 -1px 3px rgba(0, 0, 0, 0.2)'
  obj.style.outline = 'none'
  let id = parseInt(obj.id)
  let chk = document.getElementById(`${id}-chk`)
  let btn = document.getElementById(`${id}-btn`)
  chk.style.visibility = 'hidden'
  btn.style.visibility = 'hidden'
}
function renderHtml(todos) {
  let htmlString = ''
  todos.forEach((task) => {
    htmlString += addToHtml(task)
  })
  return htmlString
}
function addToHtml(task) {
  let checked = task.status == true ? 'checked' : null
  let string = `<tr class="border-bottom" id='${task.id}-desc-status'>
        <td>
        <input type="checkbox" id="${task.id}-chk" class = "toggle" value="${task.status}" onchange="updateStatus(${task.id})" ${checked}>
        </td>
        <td>
        <input class="desc-design ${checked ? 'striked' : ''} " type='text' id='${task.id}-desc' value='${task.description}'  readonly="true" ondblclick="enableText(this)" onfocusout='updateList(${task.id})' ></input>
        </td>
        <td>
        <button class="btn" id="${task.id}-btn" type="button" onclick="deleteTask
        (${task.id})">×</button>
        </td>
        </tr>`
  return string
}