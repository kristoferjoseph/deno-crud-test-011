@app
begin-app

@http
/todos
  method get
  src /todos/read

/todos
  method post
  src /todos/create

/todos/delete
  method post
  src /todos/delete

/todos/:id
  method post
  src /todos/update

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
