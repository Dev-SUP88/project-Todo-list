import axios from "axios";
import { useEffect, useState } from "react"

const Todo = () => {

  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
  const [issuccess, setIssuccess] = useState(false);

  const handleinput = (e) => {
    setInputTodo(e.target.value);
  }

  const handleSumit = async (e) => {
    e.preventDefault();

    try {
      if (inputTodo.trim() === '') return;
      const res = await axios.post('http://127.0.0.1:3000/api/todo', { title: inputTodo });
      // console.log('added: ', res.data);

      fetchTodos();

    } catch (err) {
      console.error('err', err);
    }

    setInputTodo('');
  }

  const handleUpdate = async (id) => {
    const res = await axios.put(`http://127.0.0.1:3000/api/todo/${id}`, { is_done: !issuccess });
    setIssuccess(!issuccess);
    fetchTodos()
  }
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://127.0.0.1:3000/api/todo/${id}`);
    console.log(res.data);
    fetchTodos();

  }

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3000/api/todo', {
        withCredentials: true  // ต้องตั้งค่าตัวนี้เพื่อส่งคุกกี้
      })
      // console.log(res.data);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    fetchTodos();
  }, [])


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
        <ul className="list-unstyled mt-4">
          {todos.map((todo) => (
            <li
              className="d-flex align-items-center mb-3 shadow-sm p-2 rounded bg-light"
              key={todo.id_todo}
            >
              <p
                className="flex-grow-1 mb-0 px-3 py-2 text-white rounded"
                style={{ background: '#7600bc', fontWeight: 'bold' }}
              >
                {todo.title}
              </p>
              <button
                className="btn btn-success ms-2"
                style={{ minWidth: '80px' }}
                type="button"
                onClick={() => handleUpdate(todo.id_todo)}
              >
                {todo.is_done ? 'undone' : 'done'}
              </button>
              <button
                className="btn btn-danger ms-2" onClick={() => handleDelete(todo.id_todo)}
                style={{ minWidth: '80px' }}
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>



      </main>
    </div>
  )
}
export default Todo