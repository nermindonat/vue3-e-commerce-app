export const getImageUrl = (imagePath: string): string => {
  return `${import.meta.env.VITE_API_BASE_URL}/${
    import.meta.env.VITE_IMG_FOLDER_NAME
  }/${imagePath}`;
};
