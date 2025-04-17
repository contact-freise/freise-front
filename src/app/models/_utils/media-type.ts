export type MediaType = 'video' | 'audio' | 'image';
export type MediaExtension = 'mp4' | 'mp3' | 'wav' | 'jpg' | 'png' | 'jpeg' | 'gif';
export type MediaMimeType = 'video/mp4' | 'audio/mpeg' | 'audio/wav' | 'image/jpeg' | 'image/png' | 'image/gif';
export type MediaFile = {
  type: MediaType;
  name: string;
  size: number;
  extension: MediaExtension;
  mimeType: MediaMimeType;
};
export type MediaFilePreview = {
  url: string;
  type: MediaType;
};