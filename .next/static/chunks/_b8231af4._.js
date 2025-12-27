(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_b8231af4._.js", {

"[project]/lib/validations.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "animalSchema": (()=>animalSchema),
    "characterSchema": (()=>characterSchema),
    "forgotPasswordSchema": (()=>forgotPasswordSchema),
    "humanSchema": (()=>humanSchema),
    "otherSchema": (()=>otherSchema),
    "registerSchema": (()=>registerSchema),
    "resetPasswordSchema": (()=>resetPasswordSchema),
    "signInSchema": (()=>signInSchema),
    "storySchema": (()=>storySchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/types.js [app-client] (ecmascript)");
;
const signInSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])({
        required_error: "Email is required"
    }).min(1, "Email is required").email("Invalid email"),
    password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])({
        required_error: "Password is required"
    }).min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters")
});
const registerSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().email("Invalid email address"),
    password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."),
    confirmPassword: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(8, "Password confirmation is required")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: [
        "confirmPassword"
    ]
});
const forgotPasswordSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().email("Invalid email address")
});
const resetPasswordSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(8, "Password must be at least 8 characters"),
    confirmPassword: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(8, "Confirm Password must be at least 8 characters")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: [
        "confirmPassword"
    ]
});
const humanSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    _id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().optional(),
    characterType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"])("human"),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Name is required"),
    age: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["union"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Age is required"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"])()
    ]),
    gender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Gender is required"),
    ethnicity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Ethnicity is required"),
    hairColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Hair Color is required"),
    hairLength: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Hair Length is required"),
    characterAttributes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Character attributes are required"),
    characterImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().optional()
});
const animalSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    _id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().optional(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Name is required"),
    characterType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enum"])([
        "dog",
        "cat",
        "bird"
    ]),
    breed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Breed is required"),
    characterAttributes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Character attributes are required"),
    characterImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().optional()
});
const otherSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    _id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().optional(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Name is required"),
    characterType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enum"])([
        "",
        "other"
    ]),
    characterAttributes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Character attributes are required"),
    characterImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().optional()
});
const characterSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["discriminatedUnion"])("characterType", [
    humanSchema,
    animalSchema,
    otherSchema
]);
const storySchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"])({
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(1, "Title is required"),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().min(10, "Description must be at least 10 characters"),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"])().optional(),
    rhyming: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boolean"])().default(false),
    characters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["array"])(characterSchema).optional()
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/utils/helpers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "bookCoverImage": (()=>bookCoverImage),
    "createBackendUrl": (()=>createBackendUrl),
    "createFrontendUrl": (()=>createFrontendUrl),
    "objectToFormData": (()=>objectToFormData),
    "printAmount": (()=>printAmount),
    "printDateTime": (()=>printDateTime),
    "printTime": (()=>printTime),
    "printTimeAgo": (()=>printTimeAgo),
    "returnSceneTypeTitle": (()=>returnSceneTypeTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/moment/moment.js [app-client] (ecmascript)");
;
function createFrontendUrl(path) {
    if (!path) {
        return null;
    }
    if (path.startsWith("http")) {
        return path;
    }
    if (!path.startsWith("/")) {
        path = `/${path}`;
    }
    return `${"TURBOPACK compile-time value", "http://localhost:3000"}${path}`;
}
function createBackendUrl(path) {
    if (!path) {
        return "/dummy.svg";
    }
    if (path.startsWith("http")) {
        return path;
    }
    if (!path.startsWith("/")) {
        path = `/${path}`;
    }
    return `${"TURBOPACK compile-time value", "http://localhost:4000"}${path}`;
}
const objectToFormData = (obj, form = null, namespace = null)=>{
    const fd = form || new FormData();
    let formKey = null;
    for(const property in obj){
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            if (namespace) {
                formKey = namespace + "[" + property + "]";
            } else {
                formKey = property;
            }
            if (typeof obj[property] === "object" && !(obj[property] instanceof Blob) && !(obj[property] instanceof File) && !(obj[property] instanceof Array)) {
                objectToFormData(obj[property], fd, property);
            } else if (obj[property] instanceof Array) {
                for(let i = 0; i < obj[property].length; i++){
                    fd.append(formKey + "[]", obj[property][i]);
                }
            } else {
                fd.append(formKey, obj[property]);
            }
        }
    }
    return fd;
};
const printDateTime = (timeData)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(timeData).format("ll LT");
};
const printTime = (timeData)=>{
    // return moment(timeData).format("ll LT");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(timeData).format("ll ");
};
const printTimeAgo = (timeData)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(timeData).fromNow();
};
const bookCoverImage = (story)=>{
    if (story.scenes && story.scenes.length > 0) {
        const frontCoverScene = story.scenes.find((scene)=>scene.type === "front_cover");
        if (frontCoverScene != null) {
            return createBackendUrl(frontCoverScene.image);
        }
    }
    return `https://placehold.co/400x400/2b1354/FFFFFF.png?text=${encodeURIComponent(story?.title)}&font=roboto`;
};
const printAmount = (amount)=>{
    return `$${parseFloat(amount).toFixed(2)}`;
};
const returnSceneTypeTitle = (sceneType, defaultTitle = "Content")=>{
    switch(sceneType){
        case "cover":
            return "Cover";
        case "title":
            return "Title & Copyright";
            "TURBOPACK unreachable";
        case "dedication":
            return "Dedication";
            "TURBOPACK unreachable";
        case "oums_message":
            return "OUMS message";
            "TURBOPACK unreachable";
        case "table_content":
            return "Table of Content & Content 1";
            "TURBOPACK unreachable";
        case "back_cover":
            return "Back Cover";
            "TURBOPACK unreachable";
        case "front_cover":
            return "Cover";
            "TURBOPACK unreachable";
    }
    return defaultTitle;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/services/http-service.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "sendRequest": (()=>sendRequest)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/localStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
;
;
//axios request timout
const axiosClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    timeout: 240000,
    withCredentials: true
});
axiosClient.interceptors.request.use(function(config) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalStorageItem"])("authToken");
    if (token) {
        config.headers["x-access-token"] = token;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});
const sendRequest = async (path, method = "GET", data = {}, headers = null, contentType = "application/json")=>{
    return new Promise((resolve, reject)=>{
        //create request as per paramaters
        const params = {
            url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBackendUrl"])(path),
            method,
            headers: {
                "Content-Type": contentType,
                ...headers || {}
            },
            params: {},
            data: {}
        };
        if (data !== null) {
            if (method == "GET") {
                params.params = data;
            } else if ([
                "POST",
                "PATCH",
                "PUT"
            ].includes(method)) {
                params.data = data;
            }
        }
        axiosClient(params).then((response)=>{
            return resolve(response.data);
        }).catch((error)=>{
            console.log(error);
            if (error?.response?.status === 403 || error?.response?.status === 401) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeLocalStorageItem"])("authToken");
                if (!window.location.href.includes("/login")) {
                    window.location.replace("/login");
                }
            }
            return reject(error?.response?.data);
        });
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/config/endpoints.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "endpoint": (()=>endpoint)
});
const endpoint = {
    public: {
        CONFIGURATIONS: "/public/configurations",
        PUBLIC_STORY: "/public/public-story"
    },
    auth: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        VERIFY_USER: "/auth/activateAccount",
        FORGOT_PASSWORD: "/auth/forgotPassword",
        RESET_PASSWORD: "/auth/resetPassword",
        RESEND_OTP: "/auth/resendActivationEmail",
        GOOGLE_LOGIN: "/auth/google",
        GOOGLE_CALLBACK: "/auth/google/callback"
    },
    user: {
        PROFILE: "/user/profile",
        UPLOAD_MEDIA: "/user/upload-media",
        UPDATE_PROFILE: "/user/update-profile",
        CHANGE_PASSWORD: "/user/change-password",
        DELETE_ACCOUNT: "/user/delete-account"
    },
    story: {
        LIST: "/story/list",
        CREATE: "/story/create",
        UPDATE: "/story/update",
        PAY: "/story/pay",
        IMAGE: "/story/generate-image",
        CHARACTER: "/story/regenerate-character",
        COVER_EDITOR: "/story/cover-editor",
        UPDATE_COVER_IMAGE: "/story/update-cover-image",
        REGENERATE: "/story/regenerate",
        REGENERATE_COVER: "/story/regenerate-cover",
        VIEW: "/story/view"
    },
    character: {
        LIST: "/character/user/list"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/services/auth-service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "forgetPassword": (()=>forgetPassword),
    "googleAuthCallback": (()=>googleAuthCallback),
    "googleLogin": (()=>googleLogin),
    "login": (()=>login),
    "resendOtp": (()=>resendOtp),
    "resetPassword": (()=>resetPassword),
    "signUp": (()=>signUp),
    "verifyUser": (()=>verifyUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/http-service.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/endpoints.tsx [app-client] (ecmascript)");
;
;
const login = async (payload)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.LOGIN, 'POST', payload);
};
const signUp = async (payload)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.REGISTER, 'POST', payload);
};
const verifyUser = async (payload)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.VERIFY_USER, 'POST', payload);
};
const forgetPassword = async (payload)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.FORGOT_PASSWORD, 'POST', payload);
};
const resetPassword = async (payload)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.RESET_PASSWORD, 'POST', payload);
};
const resendOtp = async (payload)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.RESEND_OTP, 'POST', payload);
};
const googleLogin = async ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.GOOGLE_LOGIN, 'GET');
};
const googleAuthCallback = async (payload)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$http$2d$service$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$endpoints$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endpoint"].auth.GOOGLE_CALLBACK, 'POST', payload);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/google-btn/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GoogleBtn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth-service.ts [app-client] (ecmascript)");
;
;
;
function GoogleBtn() {
    const handleGoogleLogin = async ()=>{
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["googleLogin"])();
            console.log(response, '---response---');
            const loginUrl = response?.data;
            if (loginUrl) {
                window.location.href = loginUrl; // redirect to Google login page
            }
        } catch (err) {
            console.error("Google login failed", err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: handleGoogleLogin,
            className: "rounded-[40px] bg-[#E1E1E1] w-full flex items-center gap-[12px] justify-center p-[12px] md:p-[17px] mb-[24px] cursor-pointer",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    width: 24,
                    height: 24,
                    src: "/assets/images/google-logo.svg",
                    alt: "google-logo"
                }, void 0, false, {
                    fileName: "[project]/components/google-btn/page.tsx",
                    lineNumber: 27,
                    columnNumber: 23
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[#2B1354] text-center font-poppins text-base font-medium leading-normal",
                    children: "Continue with Google"
                }, void 0, false, {
                    fileName: "[project]/components/google-btn/page.tsx",
                    lineNumber: 33,
                    columnNumber: 23
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/google-btn/page.tsx",
            lineNumber: 22,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_c = GoogleBtn;
var _c;
__turbopack_context__.k.register(_c, "GoogleBtn");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Common/ButtonLoader.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ButtonLoader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
function ButtonLoader({ loading = false, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/assets/images/regenrate-simple.svg",
            width: 24,
            height: 24,
            alt: "icon",
            className: `${loading ? 'animate-spin' : ''} ${dark ? 'blackimg' : ''} w-[24px] h-[24px] object-cover me-2`
        }, void 0, false, {
            fileName: "[project]/components/Common/ButtonLoader.tsx",
            lineNumber: 11,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_c = ButtonLoader;
var _c;
__turbopack_context__.k.register(_c, "ButtonLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Screens/Login.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Login)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/localStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$google$2d$btn$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/google-btn/page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Common$2f$ButtonLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Common/ButtonLoader.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function Login() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { register, handleSubmit, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInSchema"])
    });
    const onSubmit = async (data)=>{
        try {
            setLoading(true);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])(data);
            if (response?.data?.token) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setLocalStorageItem"])("authToken", response.data.token);
            }
            router.push("/my-stories");
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(err?.message);
            setLoading(false);
        }
    };
    const handleGoogleCallback = async (code)=>{
        try {
            setLoading(true);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["googleAuthCallback"])({
                code
            });
            const { token } = response.data;
            // Store token and user info in localStorage
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setLocalStorageItem"])("authToken", token);
            // Redirect to dashboard
            router.push("/my-stories");
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Google login failed");
            router.push("/login");
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Login.useEffect": ()=>{
            const code = searchParams.get("code");
            if (code) {
                handleGoogleCallback(code);
            }
        }
    }["Login.useEffect"], [
        searchParams
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "md:p-[34px] p-[15px] space-y-4 md:space-y-6 sm:p-8 bg-[#EBEBEB] rounded-[34px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-[#2B282F] text-center text-[28px] md:text-[34px] font-normal leading-normal tracking-[-1.36px] candal-font mb-[34px]",
                children: "Login"
            }, void 0, false, {
                fileName: "[project]/components/Screens/Login.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "space-y-4 md:space-y-6",
                onSubmit: handleSubmit(onSubmit),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-[18px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                ...register("email"),
                                className: "bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none",
                                placeholder: "Email"
                            }, void 0, false, {
                                fileName: "[project]/components/Screens/Login.tsx",
                                lineNumber: 78,
                                columnNumber: 21
                            }, this),
                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-600 text-sm mt-1",
                                children: errors.email.message
                            }, void 0, false, {
                                fileName: "[project]/components/Screens/Login.tsx",
                                lineNumber: 85,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Screens/Login.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-[18px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                ...register("password"),
                                className: "bg-[#D8D8D8] text-[#6F6A77] text-base font-medium leading-normal w-full rounded-[40px] md:py-[17px] py-[12px] px-[18px] md:px-[24px] focus:outline-none",
                                placeholder: "Password"
                            }, void 0, false, {
                                fileName: "[project]/components/Screens/Login.tsx",
                                lineNumber: 89,
                                columnNumber: 21
                            }, this),
                            errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-600 text-sm mt-1",
                                children: errors.password.message
                            }, void 0, false, {
                                fileName: "[project]/components/Screens/Login.tsx",
                                lineNumber: 96,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Screens/Login.tsx",
                        lineNumber: 88,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-[18px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/forgot-password",
                            className: "text-[#2B1354] font-poppins text-base font-medium leading-normal hover:underline",
                            children: "Forgot password?"
                        }, void 0, false, {
                            fileName: "[project]/components/Screens/Login.tsx",
                            lineNumber: 102,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Screens/Login.tsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "flex justify-center align-center bg-[#C4CD24] rounded-[40px] w-full py-[12px] md:py-[17px] text-[#2B1354] text-center font-poppins text-base font-medium leading-normal cursor-pointer disabled:bg-gray-400",
                        disabled: loading,
                        children: [
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Common$2f$ButtonLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                dark: true,
                                loading: true
                            }, void 0, false, {
                                fileName: "[project]/components/Screens/Login.tsx",
                                lineNumber: 114,
                                columnNumber: 32
                            }, this) : null,
                            loading ? "Please wait..." : "Login"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Screens/Login.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "or-divider relative w-full text-center my-[20px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Or"
                        }, void 0, false, {
                            fileName: "[project]/components/Screens/Login.tsx",
                            lineNumber: 118,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Screens/Login.tsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$google$2d$btn$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Screens/Login.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#2B1354] text-center font-poppins text-base font-medium leading-normal",
                        children: [
                            "Don't have an account yet?",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/register",
                                className: "text-[#2B1354] font-poppins text-base font-semibold leading-normal underline",
                                children: "Sign up"
                            }, void 0, false, {
                                fileName: "[project]/components/Screens/Login.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Screens/Login.tsx",
                        lineNumber: 121,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Screens/Login.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Screens/Login.tsx",
        lineNumber: 69,
        columnNumber: 9
    }, this);
}
_s(Login, "0N6W4ngrIezsPggSn2F3CXyhWWo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = Login;
var _c;
__turbopack_context__.k.register(_c, "Login");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(auth)/login/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LoginPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Screens$2f$Login$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Screens/Login.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
;
function LoginPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/app/(auth)/login/page.tsx",
                lineNumber: 10,
                columnNumber: 27
            }, void 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Screens$2f$Login$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/(auth)/login/page.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(auth)/login/page.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_b8231af4._.js.map