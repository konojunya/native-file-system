const openFileButton = document.getElementById("open-file");
const saveButton = document.getElementById("save");
const editorArea = document.getElementById("editor");

// functions
async function openFile() {
  const handler = await window.chooseFileSystemEntries({
    type: "openFile",
    accepts: [{
      description: "Text file",
      extensions: ["txt", "html"]}
    ],
  });
  const file = await handler.getFile();
  const text = await file.text();

  editorArea.innerText = text;
}

async function writeFile() {
  const text = editorArea.value;
  const handler = await window.chooseFileSystemEntries({
    type: "saveFile",
    accepts: [{
      description: "Text file",
      extensions: ["txt", "html"]}
    ],
  })
  const writer = await handler.createWriter();
  await writer.truncate(0);
  await writer.write(0, text);
  await writer.close();
}

// onClick handlers
openFileButton.onclick = openFile;
saveButton.onclick = writeFile
