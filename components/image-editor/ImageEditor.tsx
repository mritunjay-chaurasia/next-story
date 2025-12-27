"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { fabric } from "fabric";
import { uploadMedia } from "@/services/user-service";
import toast from "react-hot-toast";
import { FONT_FAMILIES, FONT_SIZES } from "@/config/constants";
import { BiTrash } from "react-icons/bi";
import Image from "next/image";

function ImageEditor(props: any, ref: any) {

  const { image, annotationsJSON, handleCancel, handleSave } = props;

  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const [fontColor, setFontColor] = useState("#2B1354");
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState<"" | "normal" | "italic" | "oblique" | undefined>("normal");
  const [underline, setUnderline] = useState(false);
  const [fontFamily, setFontFamily] = useState("Caveat");
  const [isDrawing, setIsDrawing] = useState(false);

  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [originalWidth, setOriginalWidth] = useState(550);
  const [originalHeight, setOriginalHeight] = useState(550);

  useEffect(() => {
    if (!canvasEl.current) return;

    const c = new fabric.Canvas(canvasEl.current);

    fabric.Image.fromURL(
      image,
      (img) => {
        setOriginalWidth(img.width || 0);
        setOriginalHeight(img.height || 0);

        img.scaleToWidth(550);

        const imgWidth = 550;
        const imgHeight = 550;

        c.setWidth(imgWidth);
        c.setHeight(imgHeight);

        c.setBackgroundImage(img, () => {
          if (annotationsJSON) {
            c.loadFromJSON(annotationsJSON, c.renderAll.bind(c));
          } else {
            c.renderAll();
          }
          setLoading(false); // Image loaded
        });

        c.isDrawingMode = isDrawing;
        c.freeDrawingBrush.width = 3;
        c.freeDrawingBrush.color = "red";

        c.on("object:selected", (e) => {
          if (e.target) e.target.bringToFront();
        });

        setCanvas(c);
      },
      { crossOrigin: "anonymous" }
    );

    return () => {
      c.dispose();
    };
  }, [image, annotationsJSON]);

  useEffect(() => {
    if (canvas) {
      const active = canvas.getActiveObject();
      if (active && active.type === "i-text" && active instanceof fabric.Text) {
        active.set({
          fill: fontColor,
          fontSize,
          fontWeight,
          fontStyle,
          underline,
          fontFamily,
        });
        canvas.renderAll();
      }
    }
  }, [fontColor, fontSize, fontWeight, fontStyle, underline, fontFamily]);

  const addText = () => {
    if (!canvas) return;
    canvas.isDrawingMode = false;
    setIsDrawing(false);

    const text = new fabric.IText("Type your text", {
      left: 150,
      top: 100,
      fontSize,
      fill: fontColor,
      fontWeight,
      fontStyle,
      underline,
      fontFamily,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const deleteSelectedElement = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
      } else {
        toast.error("No object selected to delete");
      }
    }
  };

  const onSave = async () => {
    if (!canvas || originalWidth === 0 || originalHeight === 0) return;

    setSaveLoading(true);

    //store scales
    const scaleX = originalWidth / canvas.getWidth();
    const scaleY = originalHeight / canvas.getHeight();

    // Step 1: Clone annotations from current canvas (low-res)
    const annotationObjects = canvas.getObjects().filter((obj: any) => {
      return obj.type !== 'image';
    });

    // Step 2: Create a new temporary high-res canvas
    const tempCanvas = new fabric.Canvas(null, {
      width: originalWidth,
      height: originalHeight,
    });

    // Step 3: Load full-resolution image into tempCanvas
    fabric.Image.fromURL(image, (fullImage) => {
      fullImage.scaleToWidth(originalWidth);
      tempCanvas.setBackgroundImage(fullImage, () => {

        // Step 4: Add annotations, scaled properly
        annotationObjects.forEach(obj => {
          const cloned = fabric.util.object.clone(obj);

          // Scale annotation position and size to match full-res
          cloned.left = (obj.left || 0) * scaleX;
          cloned.top = (obj.top || 0) * scaleY;
          cloned.scaleX = (obj.scaleX || 1) * scaleX;
          cloned.scaleY = (obj.scaleY || 1) * scaleY;
          cloned.setCoords();

          tempCanvas.add(cloned);
        });

        tempCanvas.renderAll();

        // Step 5: Export high-res image
        const dataUrl = tempCanvas.toDataURL({ format: "png" });

        fetch(dataUrl)
          .then(res => res.blob())
          .then(async (blob) => {
            const file = new File([blob], "edited-image.png", { type: "image/png" });

            const formData = new FormData();
            formData.append("file", file);

            const response: any = await uploadMedia(formData);
            if (response && response?.data?.url) {
              handleSave(response.data.url);
            } else {
              toast.error(response?.message ?? "Failed to save image");
            }
          })
          .catch(console.error)
          .finally(() => {
            setSaveLoading(false);
            tempCanvas.dispose();
          });
      });
    }, { crossOrigin: "anonymous" });
  };

  const toggleFontWeight = () => {
    setFontWeight((prev) => (prev === "bold" ? "normal" : "bold"));
  };

  const toggleFontStyle = () => {
    setFontStyle((prev) => (prev === "italic" ? "normal" : "italic"));
  };

  const toggleUnderline = () => {
    setUnderline((prev) => !prev);
  };

  const addBubbleFromURL = (svgUrl: string) => {
    if (canvas) {
      fabric.loadSVGFromURL(svgUrl, (objects, options) => {
        const group = fabric.util.groupSVGElements(objects, options);
        group.set({
          left: 300,
          top: 200,
          selectable: true,
          hasControls: true,
          hasBorders: true,
          cornerStyle: "circle",
          transparentCorners: false,
        });

        group.scaleToWidth(200);
        canvas.add(group);
        canvas.setActiveObject(group);
        canvas.renderAll();
      });
    }
  };

  return (
    <div className="canvas-area relative">
      {loading && (
        <div className="canvas-loading">
          <div className="smart-image-spinner" />
          <span>Please wait... <br/>loading image for editing</span>
        </div>
      )}

      {saveLoading && (
        <div className="canvas-loading">
          <div className="smart-image-spinner" />
          <span>Please wait... <br/>saving your new image</span>
        </div>
      )}

      <div className="mb-4 space-x-4 clipart-toolbar-main w-full z-10">
        <div className="flex items-center gap-[18px] mb-3">
          <div className="gap-4 clipart-toolbar rounded-full px-4 py-2 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`/assets/images/bubble${i}.svg`}
                alt={`Bubble ${i}`}
                className="w-8 h-8 cursor-pointer"
                onClick={() => addBubbleFromURL(`/assets/images/bubble${i}.svg`)}
              />
            ))}
            <div className="flex items-center gap-2">
              <button
                onClick={addText}
                className="px-4 py-2 bg-[#2B1354] text-white rounded-full cursor-pointer"
              >
                Add Text
              </button>
              <button
                disabled={saveLoading}
                onClick={onSave}
                className="px-4 py-2 bg-[#C4CD24] text-white rounded-full cursor-pointer"
              >
                {saveLoading ? <>
                  <Image
                    src="/assets/images/regenrate-simple.svg"
                    width={24}
                    height={24}
                    alt="icon"
                    className="animate-spin w-[24px] h-[24px] blackimg object-cover"
                  />
                </> : 'Save'}
              </button>
              <button
                className="px-4 py-2 bg-[#ff0000] text-white rounded-full cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="image-text-menu-topbar">
        <div className="gap-2 rounded-full px-4 py-2 flex-1 image-text-menu-topbar-menu">
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="cursor-pointer rounded-[24px] bg-[#E1E1E1] px-3 py-1"
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>

          <select
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="border px-2 py-1 rounded-full"
            defaultValue="16px"
          >
            {FONT_SIZES.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          <button
            onClick={toggleFontWeight}
            className={`cursor-pointer font-bold px-2 py-1 ${fontWeight === "bold" ? "bg-black text-white" : "bg-gray-200"}`}
          >
            B
          </button>
          <button
            onClick={toggleFontStyle}
            className={`cursor-pointer font-bold px-2 py-1 italic ${fontStyle === "italic" ? "bg-black text-white" : "bg-gray-200"}`}
          >
            I
          </button>
          <button
            onClick={toggleUnderline}
            className={`cursor-pointer font-bold px-2 py-1 underline ${underline ? "bg-black text-white" : "bg-gray-200"}`}
          >
            U
          </button>
          <label className="rounded-full overflow-hidden h-[30px] w-[30px] flex items-center justify-center relative">
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="cursor-pointer rounded-full h-[60px] w-[60px] absolute z-0"
            />
          </label>
          <button
            className="px-4 py-2 delete-toolbar-btn text-white rounded-full cursor-pointer"
            onClick={deleteSelectedElement}
          >
            <BiTrash />
          </button>
        </div>
      </div>

      <canvas ref={canvasEl} className="border border-gray-400" />
    </div>
  );
}

export default forwardRef(ImageEditor);
