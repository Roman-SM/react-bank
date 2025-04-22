import "./index.css";

interface LinkProps {
  text: string;
  textLink: string;
  link: string;
}

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
