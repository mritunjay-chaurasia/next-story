'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SmartImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    onClick?: () => void; // <-- optional now
}

export default function SmartImage({
    src,
    alt,
    className = '',
    width = undefined,
    height = undefined,
    ...props
}: SmartImageProps) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [useFallback, setUseFallback] = useState(false);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleImageError = () => {
        setUseFallback(true);
    };

    const handleFallbackError = () => {
        setLoading(false);
        setError(true);
    };

    useEffect(() => {
        setLoading(true);
        setError(false);
        setUseFallback(false);
    }, [src]);

    return (
        <div className="smart-image-wrapper">
            {loading && !error && (
                <div className="smart-image-loader">
                    <div className="smart-image-spinner" />
                </div>
            )}
            {error ? (
                <div className="smart-image-error">Failed to load image</div>
            ) : (
                <>
                    {!useFallback && width ? (
                        <Image
                            width={width}
                            height={height}
                            src={src}
                            alt={alt}
                            onLoad={handleLoad}
                            onError={handleImageError}
                            className={`smart-image ${loading ? 'loading' : 'loaded'} ${className}`}
                            {...props}
                        />
                    ) : (
                        <img
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            onLoad={handleLoad}
                            onError={handleFallbackError}
                            className={`smart-image ${loading ? 'loading' : 'loaded'} ${className}`}
                            {...props}
                        />
                    )}
                </>
            )}
        </div>
    );
}
