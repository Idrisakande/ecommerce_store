import images from "@/constants/images"

export function verifyImageUrl(stringUrl?: string) {
  if (stringUrl && stringUrl.length > 0) {
    // The provided stringUrl is valid.
    // Check if it includes a protocol (http:// or https://).
    if (stringUrl.startsWith("http://") || stringUrl.startsWith("https://")) {
      // The stringUrl includes a protocol, so return it as is.
      return stringUrl;
    } else {
      // The stringUrl does not include a protocol, so prepend it.
      return "http://" + stringUrl;
    }
  } else {
    // The provided stringUrl is empty or not provided at all.
    // Return a relative image path instead.
    return images.afruna_logo;
  }
}
