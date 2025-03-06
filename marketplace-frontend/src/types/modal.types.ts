import { FunctionComponent } from "react";

export type ModalResult<T> = T | null;
// todo: possible to create type like below where it's inferred
export type ModalComponent<T> = FunctionComponent<{ handleOk: (result: ModalResult<T>) => void }>;

// todo: what is difference between this and ModalComponent types
export type CreateModalType = <T>(Component: ModalComponent<T>) => Promise<T | null>;

// type Resolver<T> = (value: T | null | PromiseLike<T | null>) => void;
type Resolver<T> = Parameters<ConstructorParameters<typeof Promise<T>>[0]>[0];

export interface ModalDetails<T> {
  Component: ModalComponent<T> | null;
  Resolve: Resolver<T | null> | null;
}
