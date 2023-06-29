import { ToastrMessageType, ToastrPosition } from "./notification";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const app = useNuxtApp();
  async function Delete(path: String, id: String, options: FetchOptions) {
    options.method = "DELETE";
    path = `${path}${path.charAt(path.length) != "/" ? "/" : ""}${id}`;
    return await request(path, options);
  }

  async function Get(path: String, options: FetchOptions) {
    options.method = "GET";
    return await request(path, options);
  }

  function Test() {
    console.log("TEST");
    app.$notify("merhaba", "hata", {
      timeOut: 100000,
      position: ToastrPosition.TopRight,
      messageType: ToastrMessageType.Error,
    });
  }

  async function Post(path: String, options: FetchOptions) {
    options.method = "POST";
    return await request(path, options);
  }

  async function Update(path: String, id: String, options: FetchOptions) {
    options.method = "PUT";
    path = `${path}${path.charAt(path.length) != "/" ? "/" : ""}${id}`;
    return await request(path, options);
  }

  // nuxt3 $fetch methodunun kullandığı tipler ve interfaceler aşağıdadır normalde kütüphaneden gelmesi gerekiyor geçici olarak buraya ekledım
  type HTTPMethod =
    | "GET"
    | "HEAD"
    | "PATCH"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE";
  type FetchRequest = RequestInfo;
  interface FetchResponse<T> extends Response {
    _data?: T;
  }
  interface SearchParameters {
    [key: string]: any;
  }
  interface FetchContext<T = any, R extends ResponseType = ResponseType> {
    request: FetchRequest;
    options: FetchOptions<R>;
    response?: FetchResponse<T>;
    error?: Error;
  }
  interface FetchOptions<R extends ResponseType = ResponseType>
    extends Omit<RequestInit, "body"> {
    method: Uppercase<HTTPMethod> | Lowercase<HTTPMethod>;
    baseURL?: string;
    body?: RequestInit["body"] | Record<string, any>;
    ignoreResponseError?: boolean;
    params?: SearchParameters;
    query?: SearchParameters;
    parseResponse?: (responseText: string) => any;
    responseType?: R;
    response?: boolean;
    retry?: number | false;
    onRequest?: (data: any) => void;
    onRequestError?: (data: any) => void;
    onResponse?: (data: any) => void;
    onResponseError?: (data: any) => void;
  }

  /*
method:
    baseURL?: string;
    body?: RequestInit["body"] | Record<string, any>;
    ignoreResponseError?: boolean;
    params?: SearchParameters;
    query?: SearchParameters;
    parseResponse?: (responseText: string) => any;
    responseType?: R;
    response?: boolean;
    retry?: number | false;
    onRequest?(context: FetchContext): Promise<void> | void;
    onRequestError?(context: FetchContext & {
        error: Error;
    }): Promise<void> | void;
    onResponse?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
    onResponseError?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
*/

  async function request(path: String, options: FetchOptions) {
    const BaseUrl =
      runtimeConfig.public.baseURL ||
      "https://api.mahmoudzadehjewellery.com/v1";

    const headers = new Headers();
    const jwt = localStorage.getItem("access-token");

    if (jwt) headers.append("Authorization", `Bearer ${jwt}`);

    if (!(options.body instanceof FormData)) {
      options.body = JSON.stringify(options.body);
      headers.append("Content-Type", "application/json");
    }

    path = `${BaseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
    return await $fetch(path.toString(), {
      method: options.method,
      headers: headers,
      body: options.body || undefined,
      params: options.params || undefined,
      query: options.query || undefined,
      onRequest(context) {
        options.onRequest != null ? options.onRequest(context) : {};
      },
      onResponse(context) {
        options.onResponse != null ? options.onResponse(context) : {};
      },
      onRequestError(context) {
        options.onRequestError != null ? options.onRequestError(context) : {};
      },
      onResponseError(context) {
        options.onResponseError != null ? options.onResponseError(context) : {};
      },
    });
  }

  return {
    provide: {
      http: {
        request,
        Post,
        Get,
        Test,
        Update,
        Delete,
      },
    },
  };
});
