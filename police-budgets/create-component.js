const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const localPath = args[0];

const paths = localPath.split(/\//);
const handle = paths[paths.length - 1];
const directoryPath = path.resolve("src/components", localPath);

const words = handle.split("-");
const ComponentName = words
  .map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  })
  .join("");

fs.mkdir(directoryPath, { recursive: true }, function () {
  const indexData = new Uint8Array(
    Buffer.from(`export { default } from "./${handle}"`)
  );
  fs.writeFile(path.resolve(directoryPath, "index.js"), indexData, (err) => {
    if (err) throw err;
    console.log("index file created");
  });

  const componentData = new Uint8Array(
    Buffer.from(
      `import React from "react"\nimport "./${handle}.scss"\n\nconst ${ComponentName} = () => {\n return <div>${ComponentName}</div>\n}\n\nexport default ${ComponentName}`
    )
  );
  fs.writeFile(
    path.resolve(directoryPath, `${handle}.js`),
    componentData,
    (err) => {
      if (err) throw err;
      console.log("component file created");
    }
  );

  const styleData = new Uint8Array(Buffer.from(`@import "~scss/imports";\n\n`));
  fs.writeFile(
    path.resolve(directoryPath, `${handle}.scss`),
    styleData,
    (err) => {
      if (err) throw err;
      console.log("stylesheet created");
    }
  );
});
