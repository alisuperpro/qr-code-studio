import { ClipboardPaste } from 'lucide-react'
import { Button } from './ui/button'
import { useQrStore } from '@/store/qrStore'
import { useClipboard } from '@/hooks/useClipboard'

export const PasteTextButton = () => {
  const setContent = useQrStore((state) => state.setContent)
  const { pasteText } = useClipboard()

  const pasteLink = async (event: any) => {
    event.preventDefault()
    const text = await pasteText()
    setContent(text)
  }
  return (
    <Button onClick={pasteLink} className="my-2">
      <ClipboardPaste /> Pegar
    </Button>
  )
}
