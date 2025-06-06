import { useQrStore } from '@/store/qrStore'
import { useState } from 'react'
import { PasteTextButton } from './PasteTextButton'

export const QrText = () => {
    const [text, setText] = useState('')
    const setContent = useQrStore((state) => state.setContent)

    const handlerText = (value: string) => {
        setContent(value)
        setText(value)
    }

    return (
        <section className="px-2 pt-6">
            <textarea
                className="textarea-sizing px-2 py-2 border border-black text-lg max-h-96 h-96 w-full resize-none rounded-sm shadow-md"
                placeholder="Escribe el texto"
                value={text}
                onChange={(event) => handlerText(event.target.value)}
            ></textarea>
            <PasteTextButton setText={setText} />
        </section>
    )
}
