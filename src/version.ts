// This file is automatically updated during CI/CD builds
// DO NOT EDIT MANUALLY - Changes will be overwritten

export interface VersionInfo {
  version: string
  buildNumber: string
  commitHash: string
  buildDate: string
  environment: string
}

export const versionInfo: VersionInfo = {
  version: '1.0.0',
  buildNumber: '818447',
  commitHash: 'dev',
  buildDate: '2025-07-24T04:20:18.447Z',
  environment: 'development',
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

// Helper function to get deployment date
export const getDeploymentDate = (): string => {
  return new Date(versionInfo.buildDate).toLocaleDateString()
}
