// Add your custom type declarations here
declare module 'gray-matter' {
  interface GrayMatterFile<T = any> {
    data: T;
    content: string;
    excerpt?: string;
    orig: string;
    language?: string;
    matter: string;
    stringify(): string;
  }

  interface Options {
    excerpt?: boolean | ((input: string) => string);
    excerpt_separator?: string;
    engines?: Record<string, any>;
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter(
    input: string | Buffer,
    options?: Options
  ): GrayMatterFile;

  export = matter;
}

// Framer Motion type declarations
declare module 'framer-motion' {
  import * as React from 'react';

  export type VariantLabels = string | string[];
  
  export type Variant = {
    [key: string]: string | number | object;
  };

  export type Variants = {
    [key: string]: Variant;
  };

  export interface MotionProps {
    initial?: boolean | VariantLabels | Variant;
    animate?: VariantLabels | Variant | TargetAndTransition;
    exit?: VariantLabels | Variant | TargetAndTransition;
    transition?: object;
    whileHover?: VariantLabels | Variant;
    whileTap?: VariantLabels | Variant;
    whileDrag?: VariantLabels | Variant;
    whileInView?: VariantLabels | Variant;
    variants?: Variants;
    style?: React.CSSProperties;
    className?: string;
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
    onUpdate?: (latest: any) => void;
    children?: React.ReactNode;
  }

  export interface TargetAndTransition {
    [key: string]: any;
  }

  export interface MotionValue<T = any> {
    get(): T;
    set(value: T): void;
    onChange(subscriber: (latest: T) => void): () => void;
  }

  export interface AnimationControls {
    start(definition: any): Promise<any>;
    stop(): void;
    set(value: any): void;
  }

  export const motion: {
    [K in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
      MotionProps & JSX.IntrinsicElements[K]
    >;
  };

  export function useAnimation(): AnimationControls;
  export function useMotionValue<T = any>(initial: T): MotionValue<T>;
  export function useTransform<T>(
    value: MotionValue<number>,
    input: number[],
    output: T[],
    options?: { clamp?: boolean }
  ): MotionValue<T>;
}

// Sonner type declarations
declare module 'sonner' {
  import { CSSProperties } from 'react';

  export interface ToastClassnames {
    toast?: string;
    title?: string;
    description?: string;
    loader?: string;
    closeButton?: string;
    icon?: string;
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  }

  export interface ToastProps {
    id?: number | string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    icon?: React.ReactNode;
    duration?: number;
    promise?: Promise<any>;
    className?: string;
    style?: CSSProperties;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    dismissible?: boolean;
    onDismiss?: () => void;
    onAutoClose?: () => void;
    action?: {
      label: string;
      onClick: () => void;
    };
  }

  export interface ToasterProps {
    position?: ToastProps['position'];
    theme?: 'light' | 'dark' | 'system';
    richColors?: boolean;
    expand?: boolean;
    duration?: number;
    visibleToasts?: number;
    closeButton?: boolean;
    className?: string;
    style?: CSSProperties;
    toastOptions?: {
      className?: string;
      classNames?: ToastClassnames;
      unstyled?: boolean;
      style?: CSSProperties;
    };
  }

  export function Toaster(props: ToasterProps): JSX.Element;

  export interface ToastOptions extends Omit<ToastProps, 'id'> {
    type?: 'success' | 'error' | 'warning' | 'info';
  }

  export function toast(
    message: string | React.ReactNode,
    options?: ToastOptions
  ): number | string;

  // Additional toast methods
  export namespace toast {
    function success(message: string | React.ReactNode, options?: ToastOptions): number | string;
    function error(message: string | React.ReactNode, options?: ToastOptions): number | string;
    function warning(message: string | React.ReactNode, options?: ToastOptions): number | string;
    function info(message: string | React.ReactNode, options?: ToastOptions): number | string;
    function loading(message: string | React.ReactNode, options?: ToastOptions): number | string;
    function promise<T>(
      promise: Promise<T>,
      messages: {
        loading: string | React.ReactNode;
        success: string | React.ReactNode;
        error: string | React.ReactNode;
      },
      options?: ToastOptions
    ): Promise<T>;
    function dismiss(toastId?: number | string): void;
    function custom(component: React.ReactNode, options?: ToastOptions): number | string;
  }
}
