#!/usr/bin/env node

/**
 * Update Version Script
 *
 * This script updates the version.ts file with build information during CI/CD
 * It reads from environment variables and package.json to generate accurate version data
 * Enhanced with detailed time tracking and deployment metrics
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// Read package.json for version
const packageJsonPath = path.join(process.cwd(), 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

// Enhanced time tracking
const buildStartTime = new Date().toISOString()
const currentTimestamp = Date.now()

// Get commit information with enhanced tracking
let commitHash = process.env.GITHUB_SHA || process.env.GIT_COMMIT || 'dev'
let commitDate = null
let commitMessage = 'Development build'

try {
  if (commitHash !== 'dev') {
    // Get commit date and message from git
    const commitInfo = execSync(`git show -s --format="%ci|%s" ${commitHash}`, {
      encoding: 'utf8',
    }).trim()
    const [dateStr, message] = commitInfo.split('|')
    commitDate = new Date(dateStr).toISOString()
    commitMessage = message || 'No commit message'
  } else {
    // For development builds, try to get latest commit info
    try {
      const latestCommitInfo = execSync('git show -s --format="%H|%ci|%s"', {
        encoding: 'utf8',
      }).trim()
      const [hash, dateStr, message] = latestCommitInfo.split('|')
      commitHash = hash
      commitDate = new Date(dateStr).toISOString()
      commitMessage = message || 'No commit message'
    } catch (e) {
      // Fallback for environments without git
      commitDate = buildStartTime
    }
  }
} catch (error) {
  console.warn('Warning: Could not retrieve git information:', error.message)
  commitDate = buildStartTime
}

// Get environment variables (with fallbacks for local development)
const version = packageJson.version || '1.0.0'
const buildNumber =
  process.env.GITHUB_RUN_NUMBER ||
  process.env.BUILD_NUMBER ||
  Date.now().toString().slice(-6)
const environment =
  process.env.NODE_ENV || process.env.ENVIRONMENT || 'development'

// Enhanced project ID handling
const projectId =
  process.env.VITE_FIREBASE_PROJECT_ID ||
  process.env.FIREBASE_PROJECT_ID ||
  'your-project-id'

// CI/CD execution start time (when the action was triggered)
const ciStartTime =
  process.env.GITHUB_RUN_STARTED_AT ||
  process.env.CI_PIPELINE_CREATED_AT ||
  buildStartTime

// Calculate time lapses
const commitToRunTime =
  commitDate && ciStartTime
    ? Math.round(
        (new Date(ciStartTime).getTime() - new Date(commitDate).getTime()) /
          1000
      )
    : null

const runToBuildTime = ciStartTime
  ? Math.round((currentTimestamp - new Date(ciStartTime).getTime()) / 1000)
  : null

// Create enhanced version info object
const versionInfo = {
  version,
  buildNumber,
  commitHash,
  buildDate: buildStartTime,
  environment,
  projectId,
  commitDate,
  commitMessage,
  ciStartTime,
  currentTime: new Date().toISOString(),
  timeLapses: {
    commitToCI: commitToRunTime,
    ciToBuild: runToBuildTime,
    totalDeployTime:
      commitToRunTime && runToBuildTime
        ? commitToRunTime + runToBuildTime
        : null,
  },
  buildMetrics: {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
}

// Generate the enhanced version.ts file content
const versionFileContent = `// This file is automatically updated during CI/CD builds
// DO NOT EDIT MANUALLY - Changes will be overwritten

export interface TimeLapses {
  commitToCI: number | null
  ciToBuild: number | null
  totalDeployTime: number | null
}

export interface BuildMetrics {
  nodeVersion: string
  platform: string
  arch: string
  timezone: string
}

export interface VersionInfo {
  version: string
  buildNumber: string
  commitHash: string
  buildDate: string
  environment: string
  projectId: string
  commitDate: string | null
  commitMessage: string
  ciStartTime: string
  currentTime: string
  timeLapses: TimeLapses
  buildMetrics: BuildMetrics
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

// Helper function to get deployment date with time
export const getDeploymentDate = (): string => {
  return new Date(versionInfo.buildDate).toLocaleDateString()
}

// Helper function to get deployment date and time
export const getDeploymentDateTime = (): string => {
  return new Date(versionInfo.buildDate).toLocaleString()
}

// Helper function to get commit date and time
export const getCommitDateTime = (): string => {
  if (!versionInfo.commitDate) return 'Unknown'
  return new Date(versionInfo.commitDate).toLocaleString()
}

// Helper function to get CI start time
export const getCIStartTime = (): string => {
  return new Date(versionInfo.ciStartTime).toLocaleString()
}

// Helper function to get time since commit
export const getTimeSinceCommit = (): string => {
  if (!versionInfo.commitDate) return 'Unknown'
  const now = new Date()
  const commit = new Date(versionInfo.commitDate)
  const diffInMinutes = Math.round((now.getTime() - commit.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) return \`\${diffInMinutes} minutes ago\`
  if (diffInMinutes < 1440) return \`\${Math.round(diffInMinutes / 60)} hours ago\`
  return \`\${Math.round(diffInMinutes / 1440)} days ago\`
}

// Helper function to get time since deployment
export const getTimeSinceDeployment = (): string => {
  const now = new Date()
  const deployment = new Date(versionInfo.buildDate)
  const diffInMinutes = Math.round((now.getTime() - deployment.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) return \`\${diffInMinutes} minutes ago\`
  if (diffInMinutes < 1440) return \`\${Math.round(diffInMinutes / 60)} hours ago\`
  return \`\${Math.round(diffInMinutes / 1440)} days ago\`
}

// Helper function to format time lapse in human readable format
export const formatTimeLapse = (seconds: number | null): string => {
  if (seconds === null) return 'Unknown'
  if (seconds < 60) return \`\${seconds}s\`
  if (seconds < 3600) return \`\${Math.floor(seconds / 60)}m \${seconds % 60}s\`
  return \`\${Math.floor(seconds / 3600)}h \${Math.floor((seconds % 3600) / 60)}m\`
}
`

// Write the version file
const versionFilePath = path.join(process.cwd(), 'src', 'version.ts')
fs.writeFileSync(versionFilePath, versionFileContent, 'utf8')

console.log('🚀 Enhanced version information updated:')
console.log(`   Version: ${version}.${buildNumber}`)
console.log(
  `   Commit: ${commitHash.substring(0, 7)} (${commitMessage.substring(0, 50)}${commitMessage.length > 50 ? '...' : ''})`
)
console.log(`   Environment: ${environment}`)
console.log(`   Project ID: ${projectId}`)
console.log(`   Build Date: ${buildStartTime}`)
console.log(`   Commit Date: ${commitDate || 'Unknown'}`)
console.log(`   CI Start: ${ciStartTime}`)
if (commitToRunTime !== null) {
  console.log(
    `   Commit to CI Time: ${Math.floor(commitToRunTime / 60)}m ${commitToRunTime % 60}s`
  )
}
if (runToBuildTime !== null) {
  console.log(
    `   CI to Build Time: ${Math.floor(runToBuildTime / 60)}m ${runToBuildTime % 60}s`
  )
}
console.log(`   File: ${versionFilePath}`)
