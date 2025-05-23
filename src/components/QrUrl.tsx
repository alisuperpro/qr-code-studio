import { Button } from '@/components/ui/button'
import { ClipboardPaste } from 'lucide-react'
import { Label } from './ui/label'
import { useClipboard } from '@/hooks/useClipboard'
import { useQrStore } from '@/store/qrStore'

export const QrUrl = () => {
  const content = useQrStore((state) => state.content)
  const setContent = useQrStore((state) => state.setContent)
  const { pasteText } = useClipboard()

  const pasteLink = async (event: any) => {
    event.preventDefault()
    const text = await pasteText()
    setContent(text)
  }
  return (
    <section className="w-full px-4 py-2 flex justify-center items-center h-full">
      <div className="w-full">
        <div className=" flex justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-y-2 ">
            <div className="w-96">
              <Label htmlFor="url">URL</Label>
              <div className="w-full flex flex-row justify-center items-center gap-x-2">
                <textarea
                  id="url"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="https://cachemarketing.net/"
                  className="textarea-sizing w-full max-h-40 resize-none px-2 py-2 outline-1 border-[1px] rounded-sm border-black"
                ></textarea>
              </div>
              <Button onClick={pasteLink} className="my-2">
                <ClipboardPaste /> Pegar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
