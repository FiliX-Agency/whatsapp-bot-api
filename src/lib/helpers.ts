export function getMediaType(mimeType: string) {
  if (mimeType.startsWith("image")) {
    return "image";
  } else if (mimeType.startsWith("video")) {
    return "video";
  } else if (mimeType.startsWith("audio")) {
    return "audio";
  } else {
    return "document";
  }
}
