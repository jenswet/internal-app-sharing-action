import * as fs from 'fs'
import * as core from '@actions/core'

const serviceAccountFile = './serviceAccount.json'
try {
  fs.unlinkSync(serviceAccountFile)
  core.debug('Service account JSON file deleted successfully')
} catch (err: unknown) {
  if (err instanceof Error) {
    core.setFailed(err?.message)
  } else {
    core.error('Unknown error deleting JSON file')
  }
}
