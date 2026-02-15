export type Mode = "digits" | "words";
export interface FormatOptions {
  mode?: Mode;
}
export function formatTime(options?: FormatOptions): string;
export function formatTime(time: Date, options?: FormatOptions): string;
export function formatTime(timeStr: string, options?: FormatOptions): string;
