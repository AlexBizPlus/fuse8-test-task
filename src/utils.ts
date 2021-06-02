// eslint-disable-next-line import/prefer-default-export
export const splitPrice = (elem: string | number): string => {
  if (elem === 0 || elem === "0" || elem === "") {
    return '0';
  }

  const str = typeof elem === "string" ? elem.split(".")[0].split("") : Math.round(elem).toString().split("");

  return str
    .reduce((sum, item, index) => {
      if ((str.length - index) % 3 === 0) {
        return `${sum} ${item}`;
      }
      return sum + item;

    }, "")
    .trim()
    .replace(/\s/g, ',');
};
