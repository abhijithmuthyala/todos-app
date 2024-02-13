"use client";

export default function EditTodo({ text, actions }) {
  function handleChange(event) {
    const text = event.target.value;
    actions.onChange(text);
  }

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={actions.onSave}>Save</button>
    </div>
  );
}
