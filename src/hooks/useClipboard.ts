import { readText } from '@tauri-apps/plugin-clipboard-manager'

export const useClipboard = () => {
  const pasteText = async () => {
    const clipboardText = await readText()

    return clipboardText
  }

  return { pasteText }
}
