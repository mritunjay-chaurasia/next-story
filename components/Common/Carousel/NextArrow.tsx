import { Button } from "@headlessui/react";
import Image from "next/image";

export default function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <Button className="next-btn-in-book" onClick={onClick}>
            <Image
                width={56}
                height={56}
                alt="back-btn"
                src="/assets/images/next-btn-in-book.svg"
                className="w-[56px] h-[56px] cursor-pointer"
            />
        </Button>
    );
}