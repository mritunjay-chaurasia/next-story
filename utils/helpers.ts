import { getLocalStorageItem } from "@/lib/localStorage";
import moment from "moment";

export function createFrontendUrl(path: string | undefined): string | null {
    if (!path) {
        return null;
    }
    if (path.startsWith("http")) {
        return path;
    }
    if (!path.startsWith("/")) {
        path = `/${path}`;
    }
    return `${process.env.NEXT_PUBLIC_FRONTEND_URL}${path}`;
}

export function createBackendUrl(path: string | undefined): string {
    if (!path) {
        return "/dummy.svg";
    }
    if (path.startsWith("http")) {
        return path;
    }
    if (!path.startsWith("/")) {
        path = `/${path}`;
    }
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}

export const objectToFormData = (
    obj: any,
    form: any = null,
    namespace: any = null
) => {
    const fd = form || new FormData();
    let formKey: any = null;
    for (const property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            if (namespace) {
                formKey = namespace + "[" + property + "]";
            } else {
                formKey = property;
            }
            if (
                typeof obj[property] === "object" &&
                !(obj[property] instanceof Blob) &&
                !(obj[property] instanceof File) &&
                !(obj[property] instanceof Array)
            ) {
                objectToFormData(obj[property], fd, property);
            } else if (obj[property] instanceof Array) {
                for (let i = 0; i < obj[property].length; i++) {
                    fd.append(formKey + "[]", obj[property][i]);
                }
            } else {
                fd.append(formKey, obj[property]);
            }
        }
    }
    return fd;
};

export const printDateTime = (timeData: any) => {
    return moment(timeData).format("ll LT");
};

export const printTime = (timeData: any) => {
    // return moment(timeData).format("ll LT");
    return moment(timeData).format("ll ");
};

export const printTimeAgo = (timeData: any) => {
    return moment(timeData).fromNow();
};

export const bookCoverImage = (story: Story) => {
    if (story.scenes && story.scenes.length > 0) {
        const frontCoverScene = story.scenes.find((scene) => scene.type === "front_cover");
        if (frontCoverScene != null) {
            return createBackendUrl(frontCoverScene.image);
        }
    }
    return `https://placehold.co/400x400/2b1354/FFFFFF.png?text=${encodeURIComponent(story?.title)}&font=roboto`;
}

export const printAmount = (amount: any) => {
    return `$${parseFloat(amount).toFixed(2)}`;
};

export const returnSceneTypeTitle = (sceneType: any, defaultTitle = "Content") => {
    switch (sceneType) {
        case "cover":
            return "Cover"
        case "title":
            return "Title & Copyright"
            break;
        case "dedication":
            return "Dedication"
            break;
        case "oums_message":
            return "OUMS message"
            break;
        case "table_content":
            return "Table of Content & Content 1"
            break;
        case "back_cover":
            return "Back Cover"
            break;
        case "front_cover":
            return "Cover"
            break;
    }
    return defaultTitle;
}