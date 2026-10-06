export const lines = (text: string) => text.split('\n').map((s) => s.trim()).filter(Boolean);
export const commas = (text: string) => text.split(',').map((s) => s.trim()).filter(Boolean);