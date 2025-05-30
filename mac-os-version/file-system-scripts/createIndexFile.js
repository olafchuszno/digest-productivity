const path = require('path');
const fs = require('fs');
// Get component name and (file's) folder path passed through task.json arguments from VSCode API
const [_0, _1, activeFilePath] = process.argv;
if (!activeFilePath) {
  console.error('🔴 Active file path not provided!');
  process.exit(1);
}

const INDEX_FILE_NAME = 'index.ts';
const FILE_CONTENTS = "export * from './'";
const dirPath = path.dirname(activeFilePath);
const fullPath = path.join(dirPath, INDEX_FILE_NAME);
if (fs.existsSync(fullPath)) {
  console.log(
    `🟡 ${INDEX_FILE_NAME} already exists at ${dirPath}. No changes made.`
  );
} else {
  fs.writeFile(fullPath, FILE_CONTENTS, (err) => {
    if (err) {
      console.error(`🔴 Error creating file:`, err);
    } else {
      console.log(`✅ ${INDEX_FILE_NAME} created successfully at ${dirPath}`);
    }
  });
}
