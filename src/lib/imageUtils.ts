export function getPlaceholder(kind: "product" | "artisan") {
  return kind === "product" ? "/placeholders/product.svg" : "/placeholders/avatar.svg";
}

export function isValidHttpUrl(url?: string | null) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function safeSrc(url: string | null | undefined, kind: "product" | "artisan") {
  return isValidHttpUrl(url) ? (url as string) : getPlaceholder(kind);
}
