/**
 * download a file
 * @param {string} content - contents of the file
 * @param {string} filename - file name
 * @param {string} type - mime type of the file
 */
export function saveFile(content, filename, type) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
}

/**
 * read file as text
 * @param {Blob} file - file blob
 * @returns {Promise} promise that resolves to string
 */
export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (ev) => {
      resolve(ev.target.result);
    };

    reader.onerror = () => {
      reject('File upload error');
    };
  });
}
