import Image from 'next/image';

type ButtonLoaderProps = {
    loading?: boolean
    dark?: boolean
}

export default function ButtonLoader({ loading = false, dark = false }: ButtonLoaderProps) {
    return (
        <>
            <Image
                src="/assets/images/regenrate-simple.svg"
                width={24}
                height={24}
                alt="icon"
                className={`${loading ? 'animate-spin' : ''} ${dark ? 'blackimg' : ''} w-[24px] h-[24px] object-cover me-2`}
            />
        </>
    );
}
