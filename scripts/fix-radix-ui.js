const fs = require("fs")
const path = require("path")

// Function to find all instances of @radix-ui/react-use-effect-event
function findRadixUseEffectEventFiles() {
  const nodeModulesPath = path.resolve("node_modules")
  const results = []

  // Since we can't use execSync reliably in all environments, let's use a recursive function
  function searchDirectory(dir) {
    try {
      const files = fs.readdirSync(dir)

      for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          // Check if this is the directory we're looking for
          if (file === "react-use-effect-event" && path.dirname(dir).includes("@radix-ui")) {
            // Look for dist/index.mjs in this directory
            const indexPath = path.join(filePath, "dist", "index.mjs")
            if (fs.existsSync(indexPath)) {
              results.push(indexPath)
            }
          } else {
            // Continue searching recursively
            searchDirectory(filePath)
          }
        }
      }
    } catch (error) {
      // Ignore errors and continue
    }
  }

  searchDirectory(nodeModulesPath)
  return results
}

// Function to patch the file
function patchFile(filePath) {
  try {
    console.log(`Patching ${filePath}`)

    // Read the file content
    let content = fs.readFileSync(filePath, "utf8")

    // Check if the file contains the problematic import
    if (content.includes("import { useEffectEvent as React } from 'react';")) {
      // Replace the import with a custom implementation
      content = content.replace(
        "import { useEffectEvent as React } from 'react';",
        `// Custom implementation of useEffectEvent since it's not available in React 19
const React = function useEffectEvent(callback) {
  return callback;
};`,
      )

      // Write the modified content back to the file
      fs.writeFileSync(filePath, content)
      console.log(`Successfully patched ${filePath}`)
      return true
    } else {
      console.log(`No need to patch ${filePath}, problematic import not found`)
      return false
    }
  } catch (error) {
    console.error(`Error patching ${filePath}:`, error)
    return false
  }
}

// Create a direct patch for the specific file we know is causing issues
function createDirectPatch() {
  // Try to find the file using a common pattern in node_modules
  const nodeModulesPath = path.resolve("node_modules")

  // Create a simple shim file that we can use
  const shimContent = `
// This is a shim for useEffectEvent which is not available in React 19
export function useEffectEvent(callback) {
  return callback;
}
`

  // Create the shim in node_modules/react
  const reactDir = path.join(nodeModulesPath, "react")
  if (fs.existsSync(reactDir)) {
    const shimPath = path.join(reactDir, "use-effect-event.js")
    fs.writeFileSync(shimPath, shimContent)
    console.log(`Created shim at ${shimPath}`)

    // Also try to modify the react index.js to export our shim
    try {
      const indexPath = path.join(reactDir, "index.js")
      if (fs.existsSync(indexPath)) {
        let indexContent = fs.readFileSync(indexPath, "utf8")
        if (!indexContent.includes("useEffectEvent")) {
          indexContent += '\nexports.useEffectEvent = require("./use-effect-event").useEffectEvent;\n'
          fs.writeFileSync(indexPath, indexContent)
          console.log(`Updated ${indexPath} to export useEffectEvent`)
        }
      }
    } catch (error) {
      console.error("Error updating React index.js:", error)
    }
  }
}

// Main function
function main() {
  console.log("Starting Radix UI compatibility fix for React...")

  // First try the direct approach
  createDirectPatch()

  // Then try to find and patch all instances
  const files = findRadixUseEffectEventFiles()

  if (files.length === 0) {
    console.log("No Radix UI files found to patch")
  } else {
    console.log(`Found ${files.length} files to patch`)

    // Patch each file
    let patchedCount = 0
    files.forEach((filePath) => {
      if (patchFile(filePath)) {
        patchedCount++
      }
    })

    console.log(`Successfully patched ${patchedCount} out of ${files.length} files`)
  }

  console.log("Patching complete")
}

// Run the main function
main()
