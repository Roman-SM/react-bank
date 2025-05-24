import "./TitleStyle.css";
import { TitleProps } from "@shared/types";

export function Title({
  title,
  description,
  variantContainer,
  variantText,
  variantDescr,
}: TitleProps) {
  return (
    <div
      className={
        variantContainer ? `title-welcome-page-container` : "title-container"
      }
    >
      <h3
        className={
          variantText ? `title-welcome-page-text` : "title-container-text"
        }
      >
        {title}
      </h3>
      <p
        className={
          variantDescr
            ? `title-welcome-page-description`
            : "title-container-description"
        }
      >
        {description}
      </p>
    </div>
  );
}
