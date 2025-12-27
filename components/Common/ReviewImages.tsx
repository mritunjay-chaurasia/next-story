"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  useKeenSlider,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ReviewImagesProps = {
  images: string[];
};

const ReviewImages: React.FC<ReviewImagesProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const modalSliderRef = useRef<KeenSliderInstance | null>(null);

  const [modalRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    mode: "snap",
    created: (slider) => {
      modalSliderRef.current = slider;
    },
    slideChanged: (slider) => {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          console.log("model update");
          modalSliderRef.current?.update();
        });
      }, 0); // You can also try 100–300ms if 0 fails
    }
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Thumbnail (first image only) */}
      <div className="relative w-full max-w-xl mx-auto">
        <img
          src={images[0]}
          alt="Review image"
          onClick={() => setIsOpen(true)}
          className="w-full h-64 object-cover rounded-xl cursor-pointer"
        />
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative max-w-3xl w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-50 p-2 rounded-full bg-white hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div ref={modalRef} className="keen-slider">
              {images.map((src, index) => (
                <div key={index} className="keen-slider__slide">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[70vh] object-contain bg-black"
                  />
                </div>
              ))}
            </div>

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => modalSliderRef.current?.prev()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => modalSliderRef.current?.next()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ReviewImages;
