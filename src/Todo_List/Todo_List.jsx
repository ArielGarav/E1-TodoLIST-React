import React, { useReducer } from "react";
import { BiSend } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import {
  ButtonAdd,
  ButtonDelete,
  Input,
  Ul,
  LI,
  ContainerPrincipal,
  Formulario,
} from "../styles/styles";
const initialState = {
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        tasks: [...state.tasks, action.task],
      };
    case "delete":
      return {
        tasks: state.tasks.filter((task) => task !== action.task),
      };
  }
}

function TaskList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addTask(task) {
    if (!task) {
      alert("Introduce Una Tarea");
    } else {
      dispatch({
        type: "add",
        task,
      });
    }
  }

  function deleteTask(task) {
    dispatch({
      type: "delete",
      task,
    });
  }

  return (
    <ContainerPrincipal>
      <Formulario
        onSubmit={(e) => {
          e.preventDefault();
          addTask(e.target.elements.task.value);
          e.target.reset();
        }}
      >
        <Input type="text" name="task" placeholder="Nueva Tarea" />
        <ButtonAdd>
          Add <BiSend />
        </ButtonAdd>
      </Formulario>
      <Ul>
        {state.tasks.map((task) => (
          <LI key={task}>
            {task}{" "}
            <ButtonDelete onClick={() => deleteTask(task)}>
              Delete
              <MdDelete />
            </ButtonDelete>
          </LI>
        ))}
      </Ul>
    </ContainerPrincipal>
  );
}

export default TaskList;
