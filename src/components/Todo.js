import React, { useState } from 'react';
import styled from 'styled-components';

const TodoWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TodoHeader = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-bottom: 0;
  }
`;

const TodoCheckbox = styled.input`
  margin-right: 10px;
`;

const TodoText = styled.span`
  flex: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ completed }) => (completed ? '#999' : '#333')};
`;

const TodoButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #999;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

const TodoInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;



function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null); //처음 로드할땐 아무것도 수정중이 아니기에 초기값에 Null 삽입
  const [editingTodoText, setEditingTodoText] = useState('');

  // 새로운 TODO 입력값 변경 처리
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  // TODO 추가 처리
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: new Date().getTime(),
        text: newTodo,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, todo]);
      setNewTodo('');
    }
  };

  // TODO 완료 여부 토글 처리
  const handleTodoComplete = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // TODO 삭제 처리
  const handleTodoDelete = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  // TODO 수정 모드로 변경
  const handleTodoEdit = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    if (todoToEdit) {
      setEditingTodoId(todoId);
      setEditingTodoText(todoToEdit.text);
    }
  };

  // 수정 중인 TODO 내용 변경 처리
  const handleEditInputChange = (event) => {
    setEditingTodoText(event.target.value);
  };

  // 수정된 TODO 저장 처리
  const handleSaveEdit = () => {
    if (editingTodoText.trim() !== '') { // 공백체크
      setTodos((prevTodos) => //이전의 목록 업데이트
        prevTodos.map((todo) => //map을 이용하여 순회
          todo.id === editingTodoId ? { ...todo, text: editingTodoText } : todo
          //현재 Todo의 id가 editingTodoId일치하면 text를 editingTodoText롤 바꿈 
          // 아니라면 Todo 그대로 유지
        )
      );
      setEditingTodoId(null); //수정모드 종료
      setEditingTodoText(''); //수정중인 Todo 텍스트 초기화
    }
  };

  // 수정 모드 취소 처리
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  return (
    <TodoWrapper>
      <TodoHeader>Todo List</TodoHeader>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            {editingTodoId === todo.id ? (
              <div>
                <TodoInput
                  type="text"
                  value={editingTodoText}
                  onChange={handleEditInputChange}
                />
                <TodoButton onClick={handleSaveEdit}>제출</TodoButton>
                <TodoButton onClick={handleCancelEdit}>취소</TodoButton>
              </div>
            ) : (
              <div>
                <label>
                  <TodoCheckbox
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleTodoComplete(todo.id)}
                  />
                  <TodoText completed={todo.completed}>{todo.text}</TodoText>
                </label>
                <TodoButton onClick={() => handleTodoEdit(todo.id)}>
                  수정
                </TodoButton>
                <TodoButton onClick={() => handleTodoDelete(todo.id)}>
                  삭제
                </TodoButton>
              </div>
            )}
          </TodoItem>
        ))}
      </TodoList>
      <div>
        <TodoInput
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          data-testid="new-todo-input"
        />
        <TodoButton onClick={handleAddTodo} data-testid="new-todo-add-button">
          추가
        </TodoButton>
      </div>
    </TodoWrapper>
  );
}

export default Todo;
