import { Label } from './ui/label'
import { useQrStore } from '@/store/qrStore'
import { useState } from 'react'
import { PasteTextButton } from './PasteTextButton'

export const QrUrl = () => {
    const [url, setUrl] = useState('')
    const setContent = useQrStore((state) => state.setContent)

    const handlerUrl = (value: string) => {
        setUrl(value)
        setContent(value)
    }

    return (
        <section className="w-full px-4 py-2 flex justify-center items-center h-full">
            <div className="w-full">
                <div className=" flex justify-center items-center">
                    <div className="flex justify-center items-center flex-col gap-y-2 ">
                        <div className="">
                            <Label htmlFor="url">URL</Label>
                            <div className="w-full flex flex-row justify-center items-center gap-x-2">
                                <textarea
                                    id="url"
                                    value={url}
                                    onChange={(event) =>
                                        handlerUrl(event.target.value)
                                    }
                                    placeholder="https://cachemarketing.net/"
                                    className="textarea-sizing w-60 max-w-60 max-h-40 resize-none px-2 py-2 outline-1 border-[1px] rounded-sm border-black"
                                ></textarea>
                            </div>
                            <PasteTextButton setText={setUrl} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
