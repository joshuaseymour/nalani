const fs = require("fs")
const path = require("path")

function findFile(dir, filename) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      const found = findFile(filePath, filename)
      if (found) return found
    } else if (file === filename) {
      return filePath
    }
  }

  return null
}

function patchRadixUseEffectEvent() {
  try {
    console.log("Searching for @radix-ui/react-use-effect-event...")

    // Find the node_modules directory
    const nodeModulesDir = path.resolve("node_modules")

    // Look for the problematic file
    const indexMjsPath = findFile(nodeModulesDir, "index.mjs")

    if (indexMjsPath && indexMjsPath.includes("react-use-effect-event")) {
      console.log(`Found problematic file at: ${indexMjsPath}`)

      // Read the file content
      const content = fs.readFileSync(indexMjsPath, "utf8")

      // Check if it contains the problematic import
      if (content.includes("import { useEffectEvent as React } from 'react';")) {
        console.log("Found problematic import, patching...")

        // Replace the import with a custom implementation
        const patchedContent = content.replace(
          "import { useEffectEvent as React } from 'react';",
          "// Custom implementation of useEffectEvent\nconst React = function useEffectEvent(callback) {\n  return callback;\n};",
        )

        // Write the patched content back to the file
        fs.writeFileSync(indexMjsPath, patchedContent)
        console.log("Successfully patched the file!")
        return true
      } else {
        console.log("File does not contain the problematic import.")
      }
    } else {
      console.log("Could not find the problematic file.")
    }

    return false
  } catch (error) {
    console.error("Error patching Radix UI:", error)
    return false
  }
}

// Execute the patch
const success = patchRadixUseEffectEvent()
console.log(`Patch ${success ? "succeeded" : "failed"}.`)
