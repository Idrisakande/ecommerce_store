export declare interface EventTarget {
  addEventListener(
    type: string,
    listener: (event: Event) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
}

export type T_loading_provider = {
  isLoading?: boolean;
  setIsloading?: (arg: boolean) => void;
};
