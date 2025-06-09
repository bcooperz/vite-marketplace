import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface CancellablePromise<T> extends Promise<T> {
  [abortSymbol]: AbortController | undefined;
}

export const abortSymbol = Symbol("abortController");

export interface Metadata {
  lastUpdate: number;
}

export interface AxiosRequestConfigWithMetadata extends InternalAxiosRequestConfig {
  metadata?: Metadata;
}

export interface AxiosResponseWithMetadata extends AxiosResponse {
  config: AxiosRequestConfigWithMetadata;
}
