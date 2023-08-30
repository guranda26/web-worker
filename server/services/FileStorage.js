const fs = require('fs');
const fsp = fs.promises;

class FileStorage {
  static getRealPath(path) {
    return `${global.appRoot}/storage/${path}`
  }

  static async checkFileExist(path, mode = fs.constants.F_OK) {
    try {
      await fsp.access(FileStorage.getRealPath(path), mode);
      return true
    } catch (e) {
      return false
    }
  }

  static async readFile(path) {
    if (await FileStorage.checkFileExist(path)) {
      return await fsp.readFile(FileStorage.getRealPath(path), 'utf-8');
    } else {
      throw new Error('File read error');
    }
  }

  static async readJsonFile(path) {
    const rawJson = await FileStorage.readFile(path);
    try {
      return JSON.parse(rawJson);
    } catch (e) {
      return {error: 'Non valid JSON in file content'};
    }
  }

  static async writeFile(path, content) {
    const preparedContent = typeof content !== 'string' && typeof content === 'object' ? JSON.stringify(content) : content;
    return await fsp.writeFile(FileStorage.getRealPath(path), preparedContent);
  }

  static async deleteFile(path) {
    if (!await FileStorage.checkFileExist(path, fs.constants.F_OK | fs.constants.W_OK)) {
      return await fsp.unlink(FileStorage.getRealPath(path));
    }
    return true;
  }

}

module.exports = FileStorage;
