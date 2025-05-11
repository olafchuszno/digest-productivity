const path = require('path');
const fs = require('fs');

// Get component name and (file's) folder path passed through task.json arguments from VSCode API
const [_0, _1, activeFilePath] = process.argv;

if (!activeFilePath) {
  console.error('🔴 Active file path not provided!');
  process.exit(1);
}

const DF_PI_REQUIRED_DIRNAME_CRUMB = 'ClientApp';

// Ensure the active file (not folder!) is correct
// In this case it's DF/PI project's 'ClientApp' directory
if (!activeFilePath?.includes(DF_PI_REQUIRED_DIRNAME_CRUMB)) {
  console.error(
    'Wrong current directory. Ensure you have the right file from DF/PI selected!'
  );
  process.exit(1);
}

const STYLED_FILE_NAME = 'styled.ts';
const FILE_CONTENTS = "import styled from 'styled-components';\n\n";

const dirPath = path.dirname(activeFilePath);
const fullPath = path.join(dirPath, STYLED_FILE_NAME);

if (fs.existsSync(fullPath)) {
  console.log(
    `🟡 ${STYLED_FILE_NAME} already exists at ${dirPath}. No changes made.`
  );
} else {
  fs.writeFile(fullPath, FILE_CONTENTS, (err) => {
    if (err) {
      console.error(`🔴 Error creating file:`, err);
    } else {
      console.log(`✅ ${STYLED_FILE_NAME} created successfully at ${dirPath}`);
    }
  });
}
