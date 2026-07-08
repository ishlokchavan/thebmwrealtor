// Central business contact config.
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/thebmwrealtor.noida/";

// Business WhatsApp in international format, digits only (no +, spaces).
export const BUSINESS_WHATSAPP =
  process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP ?? "919910568658";

export const BUSINESS_WHATSAPP_DISPLAY = "+91 99105 68658";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

// Photographic imagery. These render on the live site (the browser fetches them
// directly). Swap for your own committed photos in /public/images any time.
export const IMAGES = {
  heroExterior:
    "https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260708_002751_598fcc05-61f4-42b4-87c1-f4e57b7cc0a8.png",
  interior: "",
};
