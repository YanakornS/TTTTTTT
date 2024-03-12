const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

function addFolder(parentItem, parentPath) {
  const folderName = prompt("Enter new folder name:");
  if (!folderName) return;

  const newFolder = {
    name: folderName,
    type: "folder",
    children: [],
  };  
  parentItem.children.push(newFolder);
  refreshTree();
}
function addFile(parentItem, parentPath) {
  const fileName = prompt("Enter new file name:");
  if (!fileName) return;

  const newFile = {
    name: fileName,
    type: "file",
  };

  // Check if children exist before pushing
  if (parentItem.children) {
    parentItem.children.push(newFile);
  } else {
    // Initialize children as an empty array if it doesn't exist
    parentItem.children = [];
    parentItem.children.push(newFile);
  }
  refreshTree();
}
function removeFolder(item, path) {
  if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;

  const pathSegments = path.split("/").filter(Boolean);
  let currentLevel = folderStructure;
  for (let i = 1; i < pathSegments.length - 1; i++) {
    currentLevel = currentLevel.children.find(
      (child) => child.name === pathSegments[i]
    );
  }

  const index = currentLevel.children.findIndex(
    (child) => child.name === item.name
  );
  if (index > -1) {
    currentLevel.children.splice(index, 1);
  }
  refreshTree();
}

function renameFolder(item, path) {
  const newName = prompt("Enter new name:");
  if (!newName) return;

  item.name = newName;
  refreshTree();
}

function refreshTree() {
  const folderTree = document.getElementById("folderTree");
  folderTree.innerHTML = "";
  const treeElement = createTreeElement(folderStructure);
  folderTree.appendChild(treeElement);
}

function createTreeElement(item, parentPath = "") {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);

  const currentPath = `${parentPath}/${item.name}`;

  const addButton = document.createElement("button");
  addButton.textContent = "Add";
  addButton.classList.add("add-button"); // เพิ่ม class "add-button"
  addButton.onclick = function () {
    addFolderOrFile(item, currentPath);
  };
  element.appendChild(addButton);

  item.element = element;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Delete";
  removeButton.classList.add("delete-button"); // เพิ่ม class "delete-button"
  removeButton.onclick = function () {
    if (item.type === "folder") {
      removeFolder(item, currentPath);
    } else if (item.type === "file") {
      removeFile(item, currentPath);
    }
  };
  element.appendChild(removeButton);

  const renameButton = document.createElement("button");
  renameButton.textContent = "Rename";
  renameButton.classList.add("rename-button"); // เพิ่ม class "rename-button"
  renameButton.onclick = function () {
    if (item.type === "folder") {
      renameFolder(item, currentPath);
    } else if (item.type === "file") {
      renameFile(item, currentPath);
    }
  };
  element.appendChild(renameButton);

  if (item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child, currentPath);
      element.appendChild(childElement);
    });
  }
  return element;
}

function addFolderOrFile(parentItem, parentPath) {
  const choice = prompt(
    "Do you want to add a folder or a file? (folder/file)"
  ).toLowerCase();
  if (choice === "folder") {
    addFolder(parentItem, parentPath);
  } else if (choice === "file") {
    addFile(parentItem, parentPath);
  } else {
    alert("Invalid choice. Please enter 'folder' or 'file'.");
  }
}
function removeFile(item, path) {
  if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;

  const pathSegments = path.split("/").filter(Boolean);
  let currentLevel = folderStructure;
  for (let i = 1; i < pathSegments.length - 1; i++) {
    currentLevel = currentLevel.children.find(
      (child) => child.name === pathSegments[i]
    );
  }

  const index = currentLevel.children.findIndex(
    (child) => child.name === item.name
  );
  if (index > -1) {
    currentLevel.children.splice(index, 1);
  }
  refreshTree();
}
function renameFile(item, path) {
  const newName = prompt("Enter new name:");
  if (!newName) return;

  item.name = newName;
  refreshTree();
}

refreshTree();

