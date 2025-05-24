import "./PageStyle.css";

export function Page({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "gray" | "image";
}) {
  return <div className={`page page-background ${variant}`}>{children}</div>;
}
