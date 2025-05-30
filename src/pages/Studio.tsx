import { Qr } from '@/components/Qr'
import { QrAdvancedOptions } from '@/components/QrAdvancedOptions'
import { QrOptions } from '@/components/QrOptions'

import { StudioRouter } from '@/components/StudioRouter'

export const Studio = () => {
    return (
        <section className="w-full h-[100%] flex flex-col justify-center items-center">
            <div className="">
                <QrOptions />
            </div>

            <div className="w-full h-full grid grid-cols-9 gap-x-2">
                <div className="col-span-2">
                    <StudioRouter />
                </div>
                <div className="col-span-5 col-start-3">
                    <Qr />
                </div>
                <div className="col-span-2 col-start-8">
                    <QrAdvancedOptions />
                </div>
            </div>
        </section>
    )
}
