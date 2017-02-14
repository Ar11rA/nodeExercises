var expect = chai.expect;
var should = chai.should()
todos = [
  { status: 1, description: 'd1', status: true },
  { status: 3, description: 'd2', status: false },
  { status: 4, description: 'd3', status: false },
  { status: 5, description: 'd4', status: true }
]
describe('Escape HTML Special characters', function () {
  it('should return eascaped string when a string with special character is passed', function () {
    const scriptString = '<script>alert("hey");</script>'
    expect(escapeHtml(scriptString)).to.equal('&lt;script&gt;alert(&quot;hey&quot;);&lt;&#x2F;script&gt;');
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
describe('when write operation is performed', function () {
  it('should return id of the newly written task', function (done) {
    let writeFunction = write('task_new')
    writeFunction.then((response) => {
      return response.json()
    })
      .then((result) => {
        id = result[0].id
        let type = typeof(id)
        expect(type).to.equals('number')
        done()
      })
    .catch((err)=>done(err))
})
})
describe('when delete operation is performed', function () {
  it('should return a proper message showing that task is deleted', function (done) {
    let delFunction = deleteTask(511)
    delFunction.then((response) => {
      console.log(response)
      return response.text()
    })
      .then((result) => {
        console.log(result)
        expect(result).to.equals('Data deleted')
        done()
      })
    .catch((err)=>done(err))
})
it('should return a error message showing that no task is there to deleted', function (done) {
    let delFunction = deleteTask(400)
    delFunction.then((response) => {
      console.log(response)
      return response.text()
    })
      .then((result) => {
        console.log(result)
        expect(result).to.equals('No such row to delete')
        done()
      })
    .catch((err)=>done(err))
})
})

describe('when status operation is performed and valid id is given',function(){
  it('should return id when only status is updated',function(done){
    let updStatus = updateStatus(497, true)
    updStatus.then((response)=>
    {
      return response.json()
    })
    .then((result)=>{
      expect(result[0][0].id).to.equals(497)
      done()
    })
    .catch((err)=>done(err))
  })
   it('should return id when only description is updated',function(done){
    let updDesc = updateDescription(497, 'something different')
    updDesc.then((response)=>
    {
      return response.json()
    })
    .then((result)=>{
      console.log(result[0][0].id)
      expect(result[0][0].id).to.equals(497)
      done()
    })
    .catch((err)=>done(err))
  })
})

describe('when status operation is performed and invalid id is given',function(){
  it('should return status code 500 when only status is updated',function(done){
    let updStatus = updateStatus(49, true)
    updStatus.then((response)=>
    {
      return response.json()
    })
    .then((result)=>{
      let resultLength = result[0].length
      expect(resultLength).to.equals(0)
      done()
    })
    .catch((err)=>done(err))
  })
   it('should return status code 500 when only description is updated',function(done){
    let updDesc = updateDescription(47, 'something different')
    updDesc.then((response)=>
    {
      return response.json()
    })
    .then((result)=>{
      let resultLength = (result[0].length)
      expect(resultLength).to.equals(0)
      done()
    })
    .catch((err)=>done(err))
  })
})
