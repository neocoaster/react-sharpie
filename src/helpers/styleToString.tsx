const styleToString = (style: React.CSSProperties) => {
  let str = '';
  const properties = Object.entries(style);
  properties.forEach((property) => {
    str += `${property[0]}: ${property[1]}; `;
  });
  return str;
};

export default styleToString;
