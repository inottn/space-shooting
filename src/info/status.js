import { isStorageSupported } from '../utils/utils'

export const status = {
  imgsLoad: false,
  storageSupportedFlag: isStorageSupported()
}