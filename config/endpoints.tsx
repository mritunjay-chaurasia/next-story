export const endpoint = {
  public: {
    CONFIGURATIONS: "/public/configurations",
    PUBLIC_STORY: "/public/public-story",
  },
  auth: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_USER: "/auth/activateAccount",
    FORGOT_PASSWORD: "/auth/forgotPassword",
    RESET_PASSWORD: "/auth/resetPassword",
    RESEND_OTP: "/auth/resendActivationEmail",
    GOOGLE_LOGIN: "/auth/google",
    GOOGLE_CALLBACK: "/auth/google/callback",
  },
  user: {
    PROFILE: "/user/profile",
    UPLOAD_MEDIA: "/user/upload-media",
    UPDATE_PROFILE: "/user/update-profile",
    CHANGE_PASSWORD: "/user/change-password",
    DELETE_ACCOUNT: "/user/delete-account",
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
    VIEW: "/story/view",
  },
  character: {
    LIST: "/character/user/list",
  },
};
