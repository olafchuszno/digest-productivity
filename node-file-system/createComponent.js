const fs = require('fs');
const path = require('path');

// Get component name and (file's) folder path passed through task.json arguments from VSCode API
const [_0, _1, activeFilePath, componentName] = process.argv;

// Ensure env variables are provided and you're active file (not folder!) is correct
if (!componentName || !activeFilePath) {
  console.error('Component name and current directory path are required.');
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

const COMPONENT_CONTENT = `//core\n//components\nimport * as S from './styled';\n//other\n\ninterface IProps {}\n\nexport const ${componentName}: React.FC<IProps> = ({}) => {\n  return <div></div>;\n};\n`;
const STYLED_FILE_CONTENT = "import styled from 'styled-components';\n\n";
const UTILS_INDEX_CONTENT = "export * from './'";

// Construct the directory path where the component will be created
const componentDir = path.join(activeFilePath, componentName);

// Check if the directory already exists
if (fs.existsSync(componentDir)) {
  console.log(
    `📁 Folder "${componentName}" already exists in ${activeFilePath}.`
  );
} else {
  // Create the component folder
  fs.mkdirSync(componentDir, { recursive: true });
  console.log(`📁 Created folder: ${componentDir}`);
}

// Create the styled.ts file
const styledFilePath = path.join(componentDir, 'styled.ts');
if (!fs.existsSync(styledFilePath)) {
  fs.writeFileSync(styledFilePath, STYLED_FILE_CONTENT);
  console.log(`🟢 Styled file created: ${styledFilePath}`);
} else {
  console.log(`🟡 File "styled.ts" already exists.`);
}

// Create component index.ts file
const indexFilePath = path.join(componentDir, 'index.ts');
const indexContent = `export * from './${componentName}';\n`;
if (!fs.existsSync(indexFilePath)) {
  fs.writeFileSync(indexFilePath, indexContent);
  console.log(`🟢 Index file created: ${indexFilePath}`);
} else {
  console.log(`🟡 File "index.ts" already exists.`);
}

// Create component .tsx file
const componentFilePath = path.join(componentDir, `${componentName}.tsx`);
if (!fs.existsSync(componentFilePath)) {
  fs.writeFileSync(componentFilePath, COMPONENT_CONTENT);
  console.log(`🟢 Component file created: ${componentFilePath}`);
} else {
  console.log(`🟡 File "${componentName}.tsx" already exists.`);
}

// Create the utils/ folder with empty index.ts file
const utilsDir = path.join(componentDir, 'utils');
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir);
  console.log(`📁 Created "utils" folder: ${utilsDir}`);
  const utilsIndexFile = path.join(utilsDir, 'index.ts');
  fs.writeFileSync(utilsIndexFile, UTILS_INDEX_CONTENT);
  console.log(`🟢 Created empty "index.ts" in utils folder: ${utilsIndexFile}`);
} else {
  console.log(`🟡 "utils" folder already exists.`);
}
