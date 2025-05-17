import { save, open } from '@tauri-apps/plugin-dialog'

export const useDialog = () => {
  const saveImage = async () => {
    const imagePath = await save({
      filters: [
        {
          name: 'Save Qr image',
          extensions: ['png', 'jpeg'],
        },
      ],
    })

    return imagePath
  }

  const selectLogo = async () => {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: 'Select a logo',
          extensions: ['png', 'jpeg'],
        },
      ],
    })

    return selected
  }

  return { saveImage, selectLogo }
}
