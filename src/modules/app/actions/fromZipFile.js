import JSZip from "jszip";
import gitignorer from "gitignore-parser";
import { keys, zipWith, values, pick } from "lodash";
import { dataURLToBlob, blobToBinaryString } from "blob-util";

const defaultGitIgnore = `
.DS_Store
**/.DS_Store
.DS_Store?
.Trashes
ehthumbs.db
Thumbs.db
.Spotlight-V100
._*
__MACOSX
`;

const ignorer = gitignorer.compile(defaultGitIgnore);

export default function fromZipFile({ uuid, path, props: { file } }) {
  let fileNames = [];
  let files = [];

  console.log({ file });
  return dataURLToBlob(file.url)
    .then(blobToBinaryString)
    .then(function(data) {
      console.log({ data });
      return JSZip.loadAsync(data, { createFolders: true, base64: false });
    })
    .then(function(zip) {
      fileNames = keys(zip.files).filter(ignorer.accepts);
      fileNames = fileNames.filter(fileName => !zip.files[fileName].dir);
      files = pick(zip.files, fileNames);
      return Promise.all(
        fileNames.map(fileName => zip.file(fileName).async("string"))
      );
    })
    .then(function(contents) {
      let res = {};
      const fileObjects = values(files);
      zipWith(fileObjects, fileNames, contents, (file, fileName, content) => {
        res[fileName] = {
          uuid: uuid(),
          content: content,
          createdOn: file.date,
          updatedOn: new Date()
        };
      });
      return path.success({ content: res });
    })
    .catch(function(error) {
      console.log({ error });
      return path.error({
        error: {
          message: error.message,
          stack: error.stack
        }
      });
    });
}
