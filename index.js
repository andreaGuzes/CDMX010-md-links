const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const process = require("process");
const marked = require("marked");
require("colors");

function getArrayMdFiles(pathFile) {
  const arrayMdFile = [];
  const absolutePath = path.resolve(pathFile);
  const files = fs.readdirSync(pathFile);
  files.forEach((file) => {
    const absoluteRouteFile = path.join(absolutePath, file);
    const extension = path.extname(absoluteRouteFile);
    if (extension === ".md") {
      return arrayMdFile.push(absoluteRouteFile);
    }
  });
  return arrayMdFile;
};

const readMD = (file) => fs.readFileSync(file, "utf-8");

const getLinks = (pathFile) => {
  const links = [];
  const arrayMd = getArrayMdFiles(pathFile);
  const myRen = new marked.Renderer();
  arrayMd.forEach((file) => {
    myRen.link = (href, title, text) => {
      links.push({
        href,
        text,
        file,
      });
    };
    marked(readMD(file), { renderer: myRen });
  });
  return links;
};

const stats = (pathFile) => {
  let links = getLinks(pathFile);
  let allLinks = links.map((link) => link.href);
  const totalLinks = allLinks.length;
  const uniqueLinks = [...new Set(allLinks)].length;
  let statsResult = {
    Total: totalLinks,
    Unique: uniqueLinks,
  };
  return statsResult;
};

const validateLink = (pathFile) => {
  let linksMds = getLinks(pathFile);
  return new Promise((resolve, reject) => {
    let arrLinks = linksMds.map((link) => {
      return fetch(link.href)
        .then((result) => {
          const linkInfo = {
            href: link.href,
            text: link.text,
            file: link.file,
          };
          if (result.status === 200) {
            linkInfo.status = result.status;
            linkInfo.message = result.statusText;
            return linkInfo;
          } else {
            linkInfo.status = result.status;
            linkInfo.message = "FAIL";
            return linkInfo;
          }
        })
        .catch((err) => console.log(err));
    });
    return Promise.all(arrLinks)
      .then((result) => {
        resolve(result);
        return result;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const brokenLinks = (pathFile) =>
  new Promise((resolve) => {
    validateLink(pathFile).then((result) => {
      const brokenLinks = result.filter((link) => link.message === "FAIL")
        .length;
      return resolve(brokenLinks);
    });
  });

// const options = {
//   one: process.argv[2],
//   two: process.argv[3],
// };

function mdlinks(pathFile, options) {
  getArrayMdFiles(pathFile);
  getLinks(pathFile);

  // const option = [];
  // if (options.two == undefined) {
  //   option.push(options.one);
  // } else if (options.two !== undefined) {
  //   option.push(options.one + " " + options.two);
  // }

  //options.forEach((options) => {
    if (options === "--validate" || options === "--v") {
      validateLink(pathFile).then((result) => {
        result;
        console.log(result);
      });
    } else if (options === "--stats" || options === "--s") {
      console.log(stats(pathFile));
    } else if (options === "--stats --validate" || options === "--s --v") {
      brokenLinks(pathFile).then((result) => {
        result;
        console.log("Broken:", result);
      });
      console.log(stats(pathFile));
    } else {
     // console.log(getLinks(pathFile));
    };
  //});
};

module.exports = {
mdlinks
}


