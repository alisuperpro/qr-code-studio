import { useQrStore } from '@/store/qrStore'
import { QrAdvancedOptions } from './QrAdvancedOptions'

export const QrText = () => {
  const setContent = useQrStore((state) => state.setContent)
  const content = useQrStore((state) => state.content)

  return (
    <section className="px-2 pt-6">
      <textarea
        className="textarea-sizing px-2 py-2  outline-1 border-[1px] border-black text-lg max-h-96 h-96 w-full resize-none rounded-sm shadow-md"
        placeholder="Escribe el texto"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <div className="px-4 py-2">
        <QrAdvancedOptions />
      </div>
    </section>
  )
}
