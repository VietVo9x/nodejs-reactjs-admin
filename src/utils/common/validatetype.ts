export const isFileArrayValidSize = (files: any) => {
  const maxSize = 1 * 1024 * 1024;

  const invalidFiles = files.filter((file: any) => {
    // Kiểm tra kích thước
    if (file.size > maxSize) {
      return true;
    }
    return false;
  });

  return invalidFiles;
};
export const isValidFileTypes = (files: any) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name;
    const extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return false;
    }
  }

  return true; // Trả về true nếu tất cả các tệp tin đều hợp lệ
};
export const isValidFileType = (fileName: any) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
  return allowedExtensions.includes(extension);
};
