const Sequelize = require('sequelize')
const dbName = process.env.DEV_MODE === 'test' ? 'testdb' : 'apidb'
const sequelize = new Sequelize('postgres://aritraaritra:@localhost:5432/' + dbName)

function addToDb(descriptionInp) {
  let insertDb = sequelize.query(`INSERT INTO TASKS (DESCRIPTION,STATUS) VALUES (:description,'false') RETURNING ID`, { replacements: { description: descriptionInp }, type: sequelize.QueryTypes.SELECT })
  return insertDb
}
function displayData() {
  const query = 'select id, description, status from tasks order by id asc'
  const displayDb = sequelize.query(query, { replacements: ['active'], type: sequelize.QueryTypes.SELECT }
  )
  return displayDb
}

function updateDb(idInp, descriptionInp, statusInp) {
  if (!descriptionInp) {
    return sequelize.query(`update tasks set status = :status where id = :id returning id`, { replacements: { status: statusInp, id: idInp }, type: sequelize.QueryTypes.UPDATE })
  }
  if (statusInp === undefined) {
    return sequelize.query(`update tasks set description = :description where id = :id returning id`, { replacements: { description: descriptionInp, id: idInp }, type: sequelize.QueryTypes.UPDATE })
  }
  const query = `update tasks set description = :description, status = :status where id = :idInp returning id`
  return sequelize.query(query, { replacements: { description: descriptionInp, id: idInp }, type: sequelize.QueryTypes.UPDATE })
}


function deleteFromDb(id) {
  const query = `delete from tasks where id = ${id} returning id`
  const destroy = sequelize.query(query)
  return destroy
}
function updateDbAll(status) {
  const query = `update tasks set status = '${status}'`
  return sequelize.query(query)

}

function deleteAllChecked() {
  const query = `delete from tasks where status=true`
  const destroy = sequelize.query(query)
  return destroy
}

module.exports = {
  addToDb,
  displayData,
  updateDb,
  deleteFromDb,
  updateDbAll,
  deleteAllChecked
}

// const add = addToDb('new task 2')
// add.then(()=>{console.log('ok add')})
// const add1 = addToDb('new task 3')
// add1.then(()=>{console.log('ok add')})
// const upd = updateDb(1,'taskchange',true)
// upd.then(()=>console.log('ok upd'))
// upd.catch((err)=>console.log(err))
// const del = deleteFromDb(475)
//  del.then((data)=>console.log(data))
// const display = displayData();
// display.then((tasks)=>console.log(tasks))
