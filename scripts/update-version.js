#!/usr/bin/env node

/**
 * Update Version Script
 *
 * This script updates the version.ts file with build information during CI/CD
 * It reads from environment variables and package.json to generate accurate version data
 */

import fs from 'fs'
import path from 'path'

// Read package.json for version
const packageJsonPath = path.join(process.cwd(), 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

// Get environment variables (with fallbacks for local development)
const version = packageJson.version || '1.0.0'
const buildNumber =
  process.env.GITHUB_RUN_NUMBER ||
  process.env.BUILD_NUMBER ||
  Date.now().toString().slice(-6)
const commitHash = process.env.GITHUB_SHA || process.env.GIT_COMMIT || 'dev'
const environment =
  process.env.NODE_ENV || process.env.ENVIRONMENT || 'development'
const buildDate = new Date().toISOString()

// Create version info object
const versionInfo = {
  version,
  buildNumber,
  commitHash,
  buildDate,
  environment,
}

// Generate the version.ts file content
const versionFileContent = `// This file is automatically updated during CI/CD builds
// DO NOT EDIT MANUALLY - Changes will be overwritten

export interface VersionInfo {
  version: string
  buildNumber: string
  commitHash: string
  buildDate: string
  environment: string
}

export const versionInfo: VersionInfo = ${JSON.stringify(versionInfo, null, 2)}

// Helper function to get short commit hash
export const getShortCommitHash = (): string => {
  return versionInfo.commitHash.length > 7 
    ? versionInfo.commitHash.substring(0, 7)
    : versionInfo.commitHash
}

// Helper function to get formatted build info
export const getBuildInfo = (): string => {
  const shortHash = getShortCommitHash()
  return \`v\${versionInfo.version}.\${versionInfo.buildNumber} (\${shortHash})\`
}

// Helper function to get deployment date
export const getDeploymentDate = (): string => {
  return new Date(versionInfo.buildDate).toLocaleDateString()
}
`

// Write the version file
const versionFilePath = path.join(process.cwd(), 'src', 'version.ts')
fs.writeFileSync(versionFilePath, versionFileContent, 'utf8')

console.log('🚀 Version information updated:')
console.log(`   Version: ${version}.${buildNumber}`)
console.log(`   Commit: ${commitHash.substring(0, 7)}`)
console.log(`   Environment: ${environment}`)
console.log(`   Build Date: ${buildDate}`)
console.log(`   File: ${versionFilePath}`)
