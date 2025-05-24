import "./LinkStyle.css";
import { LinkProps } from "@shared/types";

const Link = ({ text, textLink, link }: LinkProps) => {
  return (
    <div className="link-container">
      {text}
      <a href={link} className="link-text">
        {textLink}
      </a>
    </div>
  );
};
export default Link;
