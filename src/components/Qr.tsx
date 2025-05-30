import { Button } from '@/components/ui/button'
import { useQr } from '@/hooks/useQr'
import { useFileStore } from '@/store/fileStore'
import { useQrStore } from '@/store/qrStore'
import { LoaderCircle, QrCode } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export const Qr = () => {
    const { generateQrPreview, generateQrWithLogoPreview } = useQr()
    const [isLoad, setIsLoad] = useState(false)
    const customImage = useFileStore((state) => state.customImage)
    const content = useQrStore((state) => state.content)
    const level = useQrStore((state) => state.level)
    const version = useQrStore((state) => state.version)
    const qrImageSize = useFileStore((state) => state.qrImageSize)
    const logoSize = useFileStore((state) => state.logoSize)
    const { createQR } = useQr()

    useEffect(() => {
        if (customImage !== null) {
            generateQrWithLogoPreview({
                content,
                level,
                size: qrImageSize,
                version,
                logoPath: customImage,
                logoSize,
            })
        } else {
            generateQrPreview({ content, level, size: qrImageSize, version })
        }
    }, [content, level, qrImageSize, version, customImage, logoSize])

    const handleButton = () => {
        createQR({
            content,
            setIsLoad,
            customImage,
            level,
            version,
            qrImageSize,
            logoSize,
        })
    }

    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <div
                className="w-full flex justify-center items-center"
                id="image-container"
            >
                <ImageZoom
                    imageUrl={'/cm.png'}
                    id="qr-preview-image"
                    width={600}
                    height={400}
                />
            </div>
            <div className="mb-24">
                <Button
                    disabled={isLoad}
                    onClick={handleButton}
                    className="w-full"
                >
                    Crear
                    {isLoad ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <QrCode />
                    )}
                </Button>
            </div>
        </div>
    )
}

const ImageZoom = ({
    imageUrl,
    width,
    height,
    id,
}: {
    imageUrl: string
    width: number
    height: number
    id: string
}) => {
    const imageRef = useRef(null)
    const containerRef = useRef(null)
    const [transform, setTransform] = useState(d3.zoomIdentity) // Inicializa con la identidad de transformación

    useEffect(() => {
        if (!containerRef.current || !imageRef.current) return

        // Selecciona el contenedor donde D3 manejará los eventos de zoom
        const svgContainer = d3.select(containerRef.current)

        // Crea el comportamiento de zoom de D3
        const zoom = d3
            .zoom()
            .scaleExtent([0.5, 8]) // Límites de escala (0.5x a 8x)
            .on('zoom', (event) => {
                // Actualiza el estado de la transformación de React
                setTransform(event.transform)
            })

        // Aplica el comportamiento de zoom al contenedor
        //@ts-ignore
        svgContainer.call(zoom)

        // Opcional: Establece la transformación inicial si es necesario
        // svgContainer.call(zoom.transform, d3.zoomIdentity); // Reiniciar al cargar si quieres

        // Cleanup function: Remueve el listener de zoom cuando el componente se desmonta
        return () => {
            svgContainer.on('.zoom', null) // Remueve todos los listeners de zoom
        }
    }, []) // El efecto se ejecuta una vez al montar el componente

    // Aplica la transformación CSS directamente a la imagen
    const imageStyle = {
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
        transformOrigin: '0 0', // Importante para que el zoom sea desde la esquina superior izquierda
        width: '100%', // Asegura que la imagen se ajuste al contenedor antes del zoom
        height: '100%',
        objectFit: 'contain', // Ajusta la imagen dentro de su contenedor
        cursor: 'grab', // Para indicar que es arrastrable
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: width,
                height: height,
                overflow: 'hidden', // Oculta el contenido que se salga del área
                position: 'relative', // Necesario para posicionar la imagen con transform
            }}
        >
            <img
                ref={imageRef}
                src={imageUrl}
                alt="Zoomable Image"
                //@ts-ignore
                style={imageStyle}
                id={id}
            />
        </div>
    )
}
