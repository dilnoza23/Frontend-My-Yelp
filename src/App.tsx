import { useEffect, useState } from "react";
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import { generateClient } from "aws-amplify/api";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { type CreateTodoInput, type Todo } from "./API";

const initialState: CreateTodoInput = { name: "", description: "" };
const client = generateClient();

type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

const App: React.FC<AppProps> = ({ signOut }) => {
  const [formState, setFormState] = useState<CreateTodoInput>(initialState);
  const [todos, setTodos] = useState<Todo[] | CreateTodoInput[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos,
      });
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo,
        },
      });
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div style={styles.container}>
      {/* <Heading level={1}>Hello {user.username}</Heading> */}
      <Button onClick={signOut}>Sign out</Button>
      <h2>Yelp Restaurants</h2>
      <div style={styles.form}>
        <input
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />
        <input
          onChange={(event) =>
            setFormState({ ...formState, description: event.target.value })
          }
          style={styles.input}
          value={formState.description as string}
          placeholder="Description"
        />
        <button style={styles.button} onClick={addTodo}>
          Create
        </button>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableHeadCell}>RestaurantId</th>
              <th style={styles.tableHeadCell}>Name</th>
              <th style={styles.tableHeadCell}>Description</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id ? todo.id : index} style={styles.tableBodyRow}>
                <td style={styles.tableBodyCell}>{todo.id}</td>
                <td style={styles.tableBodyCell}>{todo.name}</td>
                <td style={styles.tableBodyCell}>{todo.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 600,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    marginBottom: 20,
    width: "100%",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    marginTop: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
  },
  tableHead: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  tableHeadCell: {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  tableBodyRow: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
  },
  tableBodyCell: {
    padding: "10px 12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },

  input: {
    border: "none",
    backgroundColor: "#eee",
    marginBottom: 10,
    padding: "8px 12px",
    fontSize: 18,
    borderRadius: 5,
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    fontSize: 18,
    padding: "12px 20px",
    borderRadius: 5,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
} as const;

export default withAuthenticator(App);
