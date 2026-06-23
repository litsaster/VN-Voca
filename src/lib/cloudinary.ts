export function optimizeCloudinaryUrl(url: string, width = 600): string {
  if (!url.includes('res.cloudinary.com')) return url
  // Insert width + quality params after the base upload path
  return url.replace(
    /\/image\/upload\//,
    `/image/upload/w_${width},c_limit,q_auto:eco,f_auto/`
  )
}
