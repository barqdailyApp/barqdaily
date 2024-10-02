import { cookies } from "next/headers";

import { defaultLocale } from "@/i18n/config-locale";
import { HOST_API, COOKIES_KEYS } from "@/config-global";

import {
  ApiResponse,
  RequestOptions,
  ApiErrorResponse,
} from "@/types/crud-types";

// Base URL for the API
const API_BASE_URL = HOST_API;

// Helper function to get the token from cookies
const getToken = (): string => {
  const cookieStore = cookies();
  return cookieStore.get(COOKIES_KEYS.session)?.value || "";
};

// Helper function to get the language from cookies or default to 'ar'
const getLanguage = (): string => {
  const cookieStore = cookies();
  return cookieStore.get(COOKIES_KEYS.lang)?.value || defaultLocale;
};

function isFormData(value: unknown) {
  return value instanceof FormData;
}
const commonErrorMessages = new Map([
  ["404", "ERROR.REQUEST_URL_NO_FOUND"],
  ["500", "ERROR.INTERNAL_SERVER_ERROR"],
  ["503", "ERROR.SERVICE_IS_NOT_AVAILABLE"],
]);
const commonErrorStatus = new Set([500, 503, 404]);
// generic function to make API requests
async function apiRequest<TResponse, TBody = undefined>(
  endpoint: string,
  method: string,
  body?: TBody,
  options: RequestOptions = {}
): Promise<ApiResponse<TResponse>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const cookie = cookies().getAll();
  const token = cookie.find(
    (item) => item.name === COOKIES_KEYS.session
  )?.value;
  const lang =
    cookie.find((item) => item.name === COOKIES_KEYS.lang)?.value ||
    defaultLocale;

  const headers = {
    ...(!isFormData(body) && {
      "Content-Type": "application/json",
    }),
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    "Accept-Language": lang,
    ...options.headers,
  };

  let reqBody;
  if (body) {
    reqBody = isFormData(body) ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: reqBody,
      cache: options.cache,
    });

    // UN-AUTHORIZED
    if (response.status === 401) {
      return errorObject("ERROR.UNAUTHORIZED", response.status);
    }

    if (commonErrorStatus.has(response.status)) {
      const errMsg = commonErrorMessages.get(
        response.status.toString()
      ) as string;
      return errorObject(errMsg, response.status);
    }

    // IF THE RETURN VALUR IS NOTHING BUT A SUCCESS REQUEST (ex: edit/delete requests);
    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return {
        success: true,
        data: {} as TResponse, // return an empty object or a default value
        message: "Success",
        status: response.status,
      };
    }

    const responseData = await response.json();

    // Response check after parsing so i can get the error message
    if (!response.ok) {
      const errMsg =
        responseData?.error?.message ||
        (responseData?.errors &&
          Object.values(responseData.errors).join(" | ")) ||
        "ERROR.AN_ERROR_OCCURRED";
      const resCode = responseData?.code || null;
      const resDetails = responseData?.details || null;
      const resData = responseData?.data || {};
      const resVErrors = responseData?.validationErrors || null;
      return errorObject(
        errMsg,
        response.status,
        resCode,
        resDetails,
        resData,
        resVErrors
      );
    }

    return {
      success: true,
      data: responseData.data,
      message: responseData.message || "Success",
      status: response.status,
    };
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "ERROR.AN_UNEXPECTED_ERROR_OCCURRED";
    return errorObject(errMsg, 500);
  }
}

// CRUD functions
export async function getData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, "GET", undefined, options);
}

export async function postData<TResponse, TBody>(
  endpoint: string,
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, "POST", data, options);
}

export async function editData<TResponse, TBody>(
  endpoint: string,
  method: "PUT" | "PATCH",
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, method, data, options);
}

export async function deleteData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, "DELETE", undefined, options);
}

const errorObject = (
  error: string = "",
  status: string | number = "",
  code: unknown = null,
  details: unknown = null,
  data: unknown = {},
  validationErrors: unknown = null
): ApiErrorResponse => ({
  success: false,
  error,
  status,
  code,
  details,
  data,
  validationErrors,
});
