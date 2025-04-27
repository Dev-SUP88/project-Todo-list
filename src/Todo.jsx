const Todo = () => {
  return (
    <div className="container p-5">
        <main className="d-flex justify-content-center">
          <from className="d-flex w-100" onSumit={handleSumit}>
            <input 
              type="text" 
              className="form-control border border-dark" 
              placeholder="what are you doing to day?"
              value={inputTodo}
              onChange={handleinput}
               />
            <input type="submit" value="Add" className="btn btn-dark ms-1" />
          </from>

          <ul className="d-flex">
            {
              todos.map((todo) => (
                <li className="btn" key={todo.id}></li>
              ))
            }
          </ul>
        </main>
    </div>
  )
}
export default Todo