// import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function App() {
  // const todiId = 1;

  // const newTodo = {
  //   title: "C stands for Create",
  //   completed: false,
  // };

  // const todoUpdate = {
  //   title: "New todo title",
  // };

  // axios
  //   .get(`https://jsonplaceholder.typicode.com/todos/${todiId}`)
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err));

  // axios
  //   .post("https://jsonplaceholder.typicode.com/todos", newTodo)
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err));

  // axios
  //   .patch(`https://jsonplaceholder.typicode.com/todos/${todiId}`, todoUpdate)
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err));

  // axios
  //   .delete(`https://jsonplaceholder.typicode.com/todos/${todiId}`)
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err));

  // useMutation({
  //   mutationFn: async (data) => {
  //     //http request POST, DELETE, PUT, PATCH
  //   },
  //   onSuccess: (data) => {
  //     //mutation success
  //   },
  //   onError: (error) => {
  //     //An error happened
  //   },
  // });

  // Отримуємо посилання на квері-клієнт що створювали у main.tsx
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo,
      );

      return res.data;
    },
    onSuccess: () => {
      // Коли мутація успішно виконується,
      // інвалідовуємо всі запити з ключем "todos"
      // для оновлення списку завдань
      console.log("Todo added successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCreateTodo = () => {
    mutation.mutate({
      title: "My new todo",
      completed: false,
    });
  };

  return (
    <>
      <button onClick={handleCreateTodo}>Create todo</button>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
    </>
  );
}
