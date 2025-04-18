const fs = require("fs-extra")
const path = require("path")

// Function to recursively find node_modules directories
function findNodeModulesDirs(dir, results = []) {
  try {
    const files = fs.readdirSync(dir)

    if (files.includes("node_modules")) {
      results.push(path.join(dir, "node_modules"))
    }

    for (const file of files) {
      const filePath = path.join(dir, file)
      try {
        if (fs.statSync(filePath).isDirectory() && file !== "node_modules") {
          findNodeModulesDirs(filePath, results)
        }
      } catch (error) {
        // Ignore errors for individual files/directories
      }
    }
  } catch (error) {
    console.error(`Error searching directory ${dir}:`, error)
  }

  return results
}

// Function to patch package.json files
function patchPackageJson(packageJsonPath) {
  try {
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = fs.readJsonSync(packageJsonPath)

      // Force React 18.2.0
      if (packageJson.dependencies && packageJson.dependencies.react) {
        packageJson.dependencies.react = "18.2.0"
      }

      if (packageJson.dependencies && packageJson.dependencies["react-dom"]) {
        packageJson.dependencies["react-dom"] = "18.2.0"
      }

      // Force React types to 18.x
      if (packageJson.dependencies && packageJson.dependencies["@types/react"]) {
        packageJson.dependencies["@types/react"] = "18.2.33"
      }

      if (packageJson.dependencies && packageJson.dependencies["@types/react-dom"]) {
        packageJson.dependencies["@types/react-dom"] = "18.2.14"
      }

      // Also check peerDependencies
      if (packageJson.peerDependencies && packageJson.peerDependencies.react) {
        packageJson.peerDependencies.react = "^18.2.0"
      }

      if (packageJson.peerDependencies && packageJson.peerDependencies["react-dom"]) {
        packageJson.peerDependencies["react-dom"] = "^18.2.0"
      }

      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })
      console.log(`Patched ${packageJsonPath}`)
    }
  } catch (error) {
    console.error(`Error patching ${packageJsonPath}:`, error)
  }
}

// Function to patch Radix UI files
function patchRadixUI(nodeModulesDir) {
  try {
    // Find all Radix UI packages
    const radixDirs = fs.readdirSync(path.join(nodeModulesDir, "@radix-ui"))

    for (const dir of radixDirs) {
      const packageDir = path.join(nodeModulesDir, "@radix-ui", dir)

      // Patch package.json
      const packageJsonPath = path.join(packageDir, "package.json")
      if (fs.existsSync(packageJsonPath)) {
        patchPackageJson(packageJsonPath)
      }

      // Check for problematic files in dist directory
      const distDir = path.join(packageDir, "dist")
      if (fs.existsSync(distDir)) {
        const files = fs.readdirSync(distDir)

        for (const file of files) {
          if (file.endsWith(".mjs") || file.endsWith(".js")) {
            const filePath = path.join(distDir, file)
            try {
              let content = fs.readFileSync(filePath, "utf8")

              // Replace problematic imports
              if (content.includes("import { useEffectEvent as")) {
                content = content.replace(
                  /import\s*{\s*useEffectEvent\s+as\s+[^}]+\s*}\s*from\s*['"]react['"];?/g,
                  `// Custom implementation of useEffectEvent
const useEffectEvent = function(callback) {
  return callback;
};`,
                )

                fs.writeFileSync(filePath, content)
                console.log(`Patched ${filePath}`)
              }
            } catch (error) {
              console.error(`Error patching ${filePath}:`, error)
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error patching Radix UI in ${nodeModulesDir}:`, error)
  }
}

// Main function
async function main() {
  console.log("Fixing React version issues...")

  try {
    // Patch root package.json
    patchPackageJson(path.resolve("package.json"))

    // Find all node_modules directories
    const nodeModulesDirs = findNodeModulesDirs(path.resolve("."))
    console.log(`Found ${nodeModulesDirs.length} node_modules directories`)

    // Patch package.json files in node_modules
    for (const dir of nodeModulesDirs) {
      // Patch React package.json
      const reactDir = path.join(dir, "react")
      if (fs.existsSync(reactDir)) {
        patchPackageJson(path.join(reactDir, "package.json"))
      }

      // Patch React DOM package.json
      const reactDomDir = path.join(dir, "react-dom")
      if (fs.existsSync(reactDomDir)) {
        patchPackageJson(path.join(reactDomDir, "package.json"))
      }

      // Patch Radix UI packages
      const radixDir = path.join(dir, "@radix-ui")
      if (fs.existsSync(radixDir)) {
        patchRadixUI(dir)
      }
    }

    console.log("React version fix completed")
  } catch (error) {
    console.error("Error fixing React version:", error)
  }
}

main().catch(console.error)
