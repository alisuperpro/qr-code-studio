import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import { Switch } from './ui/switch'
import { useQrStore } from '@/store/qrStore'

export const QrWifi = () => {
    const [t, setT] = useState('') // encryption type
    const [s, setS] = useState('') // SSID
    const [p, setP] = useState('') // Password
    const [h, setH] = useState(false) // Hide network
    const setContent = useQrStore((state) => state.setContent)

    function escapeWiFiInput(input: string) {
        if (!input) return ''

        // Caracteres a escapar: \, ;, ", :
        const escapeMap = {
            '\\': '\\\\', // \ → \\
            ';': '\\;', // ; → \;
            '"': '\\"', // " → \"
            ':': '\\:', // : → \:
        }
        return input.replace(
            /[\\;":]/g,
            // @ts-ignore
            (char: string | number) => escapeMap[char]
        )
    }
    const handlerWifiTemplate = () => {
        const sanitizeSSID = escapeWiFiInput(s)
        const sanitizePassword = escapeWiFiInput(p)

        const template = `
        WIFI:
        T:${t};
        S:${sanitizeSSID};
        ${t === 'nopass' ? '' : `P:${sanitizePassword}`};
        H:${h};
        ;
    `
        console.log(template)
        setContent(template)
    }

    useEffect(() => {
        if (t === 'nopass') {
            setP('')
        }
        handlerWifiTemplate()
    }, [t, s, p, h])

    return (
        <section className="w-full h-full flex flex-col px-8 justify-center items-center gap-y-4">
            <div className="w-full flex flex-col gap-y-2">
                <Label htmlFor="ssid">Nombre de la red (SSID)</Label>
                <Input
                    type="text"
                    onChange={(event) => setS(event.target.value)}
                    value={s}
                    id="ssid"
                />
            </div>
            <div className="w-full flex flex-col gap-y-2">
                <Label htmlFor="network-password">Contraseña</Label>
                <Input
                    type="password"
                    value={p}
                    onChange={(event) => setP(event.target.value)}
                    disabled={t === 'nopass' ? true : false}
                    id="network-password"
                />
            </div>

            <div className="w-full py-2 flex flex-row justify-start items-center gap-x-2">
                <Switch id="hide-network" onCheckedChange={setH} checked={h} />
                <Label htmlFor="hide-network">Red oculta</Label>
            </div>

            <div className="w-full">
                <Select onValueChange={setT} value={t}>
                    <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Tipo de encriptacion" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nopass">Sin encriptacion</SelectItem>
                        <SelectItem value="WPA2">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </section>
    )
}
