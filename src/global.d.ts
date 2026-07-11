declare module 'fs/promises' {
    import { ObjectEncodingOptions } from 'fs';
    export function writeFile(path: string, data: string, options?: string | ObjectEncodingOptions): Promise<void>;
    export function readFile(path: string, options?: string | ObjectEncodingOptions): Promise<string>;
}

declare module 'path' {
    export function join(...paths: string[]): string;
}

declare namespace process {
    export function cwd(): string;
}