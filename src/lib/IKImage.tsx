'use client'

import Image from 'next/image'

const imageKitLoader = ({ src, width, quality }:{
    src: string,
    width: number,
    quality?: number
}) => {
    const params = [`w-${width}`, `q-${quality || 80}`]
    return `https://ik.imagekit.io/rx1l63ol1q/${src}?tr=${params.join(',')}`
  };

export default function IKImage({
    src,
    alt,
    width,
    height,
    sizes,
    fill,
    className,
}:{
    src: string,
    alt: string,
    width?: number | undefined,
    height?: number | undefined,
    sizes?: string | undefined,
    fill?: boolean | undefined,
    className?:string | undefined,
}) {
    return (
        <Image 
            loader={imageKitLoader}
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            fill={fill}
            className={className}
        />
    )
}