var expect = chai.expect;
var should = chai.should()
describe('Escape HTML Special characters', function () {
  it('should return eascaped string when a string with special character is passed', function () {
    const scriptString = '<script>alert("hey");</script>'
    expect(escapeHtml(scriptString)).to.equal('&lt;script&gt;alert(&quot;hey&quot;);&lt;&#x2F;script&gt;');
  })
  it('should return eascaped string when a string without special character is passed', function () {
    const normalString = 'clean table'
    expect(escapeHtml(normalString)).to.equal('clean table');
  })
})

describe('when read operation is performed', function () {
  it('should return an array of objects of tasks', function (done) {
    let readFunction = read()
    readFunction.then((response) => {
      return response.json()
    })
      .then((tasks) => {
        let isValid = tasks instanceof Array;
        expect(isValid).eqls(true)
        done()
      })
      .catch((err) => done(err))
  })
})
describe('Write API is used', function () {
  describe('when write operation is performed with valid message ', function () {
    it('should return id of the newly written task', function (done) {
      let writeFunction = write('task_new')
      writeFunction.then((response) => {
        return response.json()
      })
        .then((result) => {
          id = result[0].id
          let type = typeof (id)
          expect(type).to.equals('number')
          done()
        })
        .catch((err) => done(err))
    })
  })
  describe('when write operation is performed with invalid message ', function () {
    it('should return error message when message is null', function () {
      let writeFunction = write('')
      expect(writeFunction).to.equals('No Description given')
    })
    it('should return error message when no arguments are passed', function () {
      let writeFunction = write()
      expect(writeFunction).to.equals('No Description given')
    })
  })
})

describe('Delete API is used', function () {
  describe('when delete operation is performed and id is an integer', function () {
    it('should return a proper message showing that task is deleted', function (done) {
      let delFunction = deleteTasks(639)
      delFunction.then((response) => {
        return response.text()
      })
        .then((result) => {
          expect(result).to.equals('Data deleted')
          done()
        })
        .catch((err) => done(err))
    })
    it('should return an error message showing that no task with given id is there to deleted', function (done) {
      let delFunction = deleteTasks(400)
      delFunction.then((response) => {
        return response.text()
      })
        .then((result) => {
          expect(result).to.equals('No such row to delete')
          done()
        })
        .catch((err) => done(err))
    })
  })
  describe('when delete operation is performed and id is invalid', function () {
    it('should return an error message when id is null', function () {
      let delFunction = deleteTasks(null)
      expect(delFunction).to.equal('No id given')
    })
    it('should return 500 error status when id is not a number', function (done) {
      let delFunction = deleteTasks('abc')
      delFunction.then((response) => {
        expect(response.status).to.equals(500)
        done()
      })
        .catch((err) => done(err))
    })
    it('should return an error message when id is not given as argument', function () {
      let delFunction = deleteTasks()
      expect(delFunction).to.equal('No id given')
    })
  })
})

describe('Status API is used', function () {
  describe('when status operation is performed and valid id is given', function () {
    it('should return id when only status is updated', function (done) {
      let updStatus = updateTaskStatus(637, 'true')
      updStatus.then((response) => {
          expect(response.status).to.equals(200)
          done()
        })
        .catch((err) => done(err))
    })
    it('should return id when only description is updated', function (done) {
      let updDesc = updateTaskDescription(637, 'something different')
      updDesc.then((response) => {
       expect(response.status).to.equals(200)
          done()
        })
        .catch((err) => done(err))
    })
  })

  describe('when status update is performed and invalid id is given', function () {
    it('should return status code 500 when id is not in database', function (done) {
      let updStatus = updateTaskStatus(49, true)
      updStatus.then((response) => {
        return response.json()
      })
        .then((result) => {
          console.log(result,'ser')
          let resultLength = result.length
          expect(resultLength).to.equals(0)
          done()
        })
        .catch((err) => done(err))
    })
    it('should return status code 500 when id is not in database', function (done) {
      let updDesc = updateTaskDescription(47, 'something different')
      updDesc.then((response) => {
        return response.json()
      })
        .then((result) => {
          let resultLength = (result.length)
          expect(resultLength).to.equals(0)
          done()
        })
        .catch((err) => done(err))
    })
    it('should return status code 500 when id is not a number', function (done) {
      let updDesc = updateTaskDescription('asd', 'something different')
      updDesc.then((response) => {
        console.log(response)
        expect(response.status).to.equals(500)
        done()
      })
        .catch((err) => done(err))
    })
    it('should return status code 500 when id is NULL', function (done) {
      let updDesc = updateTaskDescription(null, 'something different')
      updDesc.then((response) => {
        console.log(response)
        expect(response.status).to.equals(500)
        done()
      })
        .catch((err) => done(err))
    })
  })
})
describe('Check All API is used',function(){
  describe('when all tasks are updated and valid input is given', function () {
    it('should return success message if all tasks are updated with status false', function (done) {
      let updAllFunction = updateAllTasksStatus(false)
      updAllFunction.then((response) => {
        return response.text()
      })
        .then((result) => {
          expect(result).to.equals('All tasks updated')
          done()
        })
        .catch((err) => done(err))
    })
    it('should return success message if all tasks are updated with status true', function (done) {
      let updAllFunction = updateAllTasksStatus(true)
      updAllFunction.then((response) => {
        console.log(response)
        return response.text()
      })
        .then((result) => {
          expect(result).to.equals('All tasks updated')
          done()
        })
        .catch((err) => done(err))
    })
  })

  describe('when all tasks are updated and invalid input is given', function () {
    it('should return error message if argument is not given', function () {
      let updAllFunction = updateAllTasksStatus()
      expect(updAllFunction).to.equals('Status entered is not boolean')
    })
    it('should return error message if argument is not boolean', function () {
      let updAllFunction = updateAllTasksStatus('asd')
      expect(updAllFunction).to.equals('Status entered is not boolean')
    })
  })
})
describe('Clear All Tasks API',function(){
describe('when clear all completed operation is performed', function () {
  it('should return a proper message showing that data is deleted when there are completed tasks', function (done) {
    let delFunction = clearAllTasksTable()
    delFunction.then((response) => {
      return response.text()
    })
      .then((result) => {
        expect(result).to.equals('Data Deleted')
        done()
      })
      .catch((err) => done(err))
  })
  it('should return a message showing that there is no data to delete if only active tasks are there', function (done) {
    let delFunction = clearAllTasksTable()
    delFunction.then((response) => {
      return response.text()
    })
      .then((result) => {
        expect(result).to.equals('No such row to delete')
        done()
      })
      .catch((err) => done(err))
  })
})
})