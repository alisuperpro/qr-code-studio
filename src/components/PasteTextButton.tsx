import { ClipboardPaste } from 'lucide-react'
import { Button } from './ui/button'
import { useClipboard } from '@/hooks/useClipboard'

export const PasteTextButton = ({
    setText,
}: {
    setText: (text: string) => void
}) => {
    const { pasteText } = useClipboard()

    const pasteLink = async (event: any) => {
        event.preventDefault()
        const text = await pasteText()
        setText(text)
    }
    return (
        <Button onClick={pasteLink} className="my-2">
            <ClipboardPaste /> Pegar
        </Button>
    )
}
