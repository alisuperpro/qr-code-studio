import { exists } from '@tauri-apps/plugin-fs'

export const useFs = () => {
  const isExistFile = async (path: string) => {
    const isExist = await exists(path)

    return isExist
  }

  return { isExistFile }
}
