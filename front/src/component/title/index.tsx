import "./index.css";

type TitleProps = {
  title: string;
  description: string;
  variantContainer?: "container" | "welcome-page-container";
  variantText?: "container-text" | "welcome-page-text";
  variantDescr?: "container-description" | "welcome-page-description";
};

export default function Component({
  title,
  description,
  variantContainer = "container",
  variantText = "container-text",
  variantDescr = "container-description",
}: TitleProps) {
  return (
    <div className={`title ${variantContainer}`}>
      <h3 className={`title ${variantText}`}>{title}</h3>
      <p className={`title ${variantDescr}`}>{description}</p>
    </div>
  );
}
