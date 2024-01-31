import { DrawerContext } from './useDrawerContext';

export const initialValue: DrawerContext = {
  bootSourceLoaded: false,
  cdFile: null,
  cdUpload: null,
  diskFile: null,
  diskUpload: null,
  isBootSourceAvailable: null,
  setCDFile: null,
  setDiskFile: null,
  setStorageClassName: null,
  setTemplate: null,
  storageClassName: null,
  storageClassRequired: false,
  template: null,
  templateDataLoaded: false,
  templateLoadingError: null,
  uploadCDData: null,
  uploadDiskData: null,
  vm: null,
};
