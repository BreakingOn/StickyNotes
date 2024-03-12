const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
//при старте страницы для каждой записи в локальном хранилище вызывается foreach, который создаёт записку по введённым данным и вставляет их перед кнопкой добавления
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});
//кнопка, которая по клику по + создаёт новую записку
addNoteButton.addEventListener("click", () => addNote());
//получение строк из локального хранилища пользователя, если нет данных - возвращение []. JSON.parse - переводит данные из JSON в строку
function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}
//функция для сохранения данных из записки и последующей загрузки их в getNotes
function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}
//при вызове этой функции создаётся новая записка в виде textarea, к ней добавляется класс, плейсхолдер и значение content, также при изменении записки идёт сохранение, а при удалении вызывается confirm
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Введите данные...";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Вы уверены, что стоит удалять этот объект?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}
//эта функция создаёт новую записку, вызывая getNotes, создавая новый id из пула рандомных чисел, оставляя внутри пустой текс. Далее создаётся сама записка по id и контенту	
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 4444),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}
//функция для обновления записок. вызывается getNotes для получения данных, после фильтруется по 0 элементу, т.е. получается всегда текущий элемент. В конце данные сохраняются
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}
//эта функция выбирает для сохранения все существующие id кроме выбранного и удаляет выбранне данные
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
