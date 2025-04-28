import axios from "axios";
import { useState } from "react"

const Todo = () => {

  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
  const [issuccess, setIssuccess] = useState(false);

  const handleinput = (e) => {
    setInputTodo(e.target.value);
  }

  const handleSumit = async (e) => {
    e.prevendefault();

    const data = await axios.get('http://127.0.0.1:3000');
     setTodos(data);
    console.log(todos);
  }

  const handleCheckBox = (e) => {
    setIssuccess(!issuccess);
  }
  

  return (
    <div className="container p-5 ">
        <main className=" justify-content-center">
          <form className="d-flex w-100" onSubmit={handleSumit}>
            <input 
              type="text" 
              className="form-control border border-dark" 
              placeholder="what are you doing to day?"
              value={inputTodo}
              onChange={handleinput}
               />
            <input type="submit" value="Add" className="btn btn-dark ms-1" />
          </form>

       <hr />
          <ul className="d-flex justify-content-center mt-3">
            <li className="btn text-light shadow-3 w-100" style={{background: '#7600bc'}}>fsdfsdf</li>
            <input className=" btn-check" type='checkbox' checked={issuccess} onChange={handleCheckBox} />
            <button className="btn btn-danger ms-1">ลบ</button>
            {
              todos.map((todo) => (
                <li className="btn" key={todo.id} >
                  {todo.title}
                  <input className="btn btn-success" type='checkbox' checked={issuccess}  onChange={handleCheckBox} />
                  <button className="btn btn-danger">ลบ</button>
                  </li>
              ))
            }
          </ul>

        
        </main>
    </div>
  )
}
export default Todo