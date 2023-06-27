import React, { useState } from 'react';

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
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (  // todos 배열 순회.
          <li key={todo.id}> 
          {/* todo의 항목들을 li태그로 감싸서, id값을 비교 */}
            {editingTodoId === todo.id ? ( //editingTodoId 와 현재 Todo의 id비교
              <div> 
                <input //일치하면 수정모드 진입
                  type="text"
                  value={editingTodoText}
                  onChange={handleEditInputChange} 
                />
                <button onClick={handleSaveEdit}>제출</button>
                <button onClick={handleCancelEdit}>취소</button>
              </div>
            ) : (
              <div>
                <label> 
                    {/* 일반모드 진입 */}
                  <input //todo의 완료 여부를 표시하는 체크박스
                    type="checkbox"
                    checked={todo.completed} 
                    onChange={() => handleTodoComplete(todo.id)} 
                    // 화살표함수를 사용하지 않으면, 체크박스가 렌더링 될때마다 함수가 호출된다. 
                    //따라서 화살표함수를 사용함으로서 함수 호출을 지연시키고 이벤트가 발생될때만 실행한다. 
                  />
                  <span>{todo.text}</span> 
                  {/* todo의 텍스트 내용 표시 */}
                </label>
                <button onClick={() => handleTodoEdit(todo.id)}>수정</button>
                <button onClick={() => handleTodoDelete(todo.id)}>삭제</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          data-testid="new-todo-input"
        />
        <button onClick={handleAddTodo} data-testid="new-todo-add-button">
          추가
        </button>
      </div>
    </div>
  );
}

export default Todo;
