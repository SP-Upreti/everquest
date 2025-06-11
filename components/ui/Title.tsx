import React from "react";
type TitleProps = {
  text: string;
  fontSize?: string; // Optional prop for font size
  color?: string; // Optional prop for font size
  textalign?: string; // Optional prop for font size
};

const Title: React.FC<TitleProps> = ({
  text,
  fontSize = "text-4vw",
  color = "text-black",
  textalign = "text-center",
}) => {
  return (
    <div
      className={`lg:text-[4vw] leading-[1.1] text-3xl uppercase font-extrabold  title ${fontSize} ${color} ${textalign}`}
    >
      {text}
    </div>
  );
};

export default Title;
