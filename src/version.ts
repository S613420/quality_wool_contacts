// This file is automatically updated during CI/CD builds
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

export const versionInfo: VersionInfo = {
  version: '1.0.0',
  buildNumber: '750772',
  commitHash: 'c18c03296f8b588264a706347eb84a99565093f1',
  buildDate: '2025-07-24T04:35:50.767Z',
  environment: 'development',
  projectId: 'your-project-id',
  commitDate: '2025-07-24T04:30:26.000Z',
  commitMessage: 'Add essential linting tools to prevent CI/CD failures',
  ciStartTime: '2025-07-24T04:35:50.767Z',
  currentTime: '2025-07-24T04:35:50.772Z',
  timeLapses: {
    commitToCI: 325,
    ciToBuild: 0,
    totalDeployTime: null,
  },
  buildMetrics: {
    nodeVersion: 'v22.16.0',
    platform: 'linux',
    arch: 'x64',
    timezone: 'UTC',
  },
}

// Helper function to get short commit hash
export const getShortCommitHash = (): string => {
  return versionInfo.commitHash.length > 7
    ? versionInfo.commitHash.substring(0, 7)
    : versionInfo.commitHash
}

// Helper function to get formatted build info
export const getBuildInfo = (): string => {
  const shortHash = getShortCommitHash()
  return `v${versionInfo.version}.${versionInfo.buildNumber} (${shortHash})`
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
  const diffInMinutes = Math.round(
    (now.getTime() - commit.getTime()) / (1000 * 60)
  )

  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  if (diffInMinutes < 1440) return `${Math.round(diffInMinutes / 60)} hours ago`
  return `${Math.round(diffInMinutes / 1440)} days ago`
}

// Helper function to get time since deployment
export const getTimeSinceDeployment = (): string => {
  const now = new Date()
  const deployment = new Date(versionInfo.buildDate)
  const diffInMinutes = Math.round(
    (now.getTime() - deployment.getTime()) / (1000 * 60)
  )

  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  if (diffInMinutes < 1440) return `${Math.round(diffInMinutes / 60)} hours ago`
  return `${Math.round(diffInMinutes / 1440)} days ago`
}

// Helper function to format time lapse in human readable format
export const formatTimeLapse = (seconds: number | null): string => {
  if (seconds === null) return 'Unknown'
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
}
