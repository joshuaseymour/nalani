const fs = require("fs")
const path = require("path")

// Find the problematic file
const basePath = path.resolve("node_modules")
const targetFile = path.join(basePath, "@radix-ui/react-use-effect-event/dist/index.mjs")

if (fs.existsSync(targetFile)) {
  console.log(`Patching ${targetFile}`)

  // Read the file content
  let content = fs.readFileSync(targetFile, "utf8")

  // Replace the import of useEffectEvent with a custom implementation
  content = content.replace(
    `import { useEffectEvent as React } from 'react';`,
    `// Custom implementation of useEffectEvent
const React = function useEffectEvent(callback) {
  return callback;
};`,
  )

  // Write the modified content back to the file
  fs.writeFileSync(targetFile, content)

  console.log("Patch applied successfully")
} else {
  console.log(`File not found: ${targetFile}`)
}
