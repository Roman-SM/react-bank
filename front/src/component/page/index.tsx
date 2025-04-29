import "./index.css";

export default function Component({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "gray" | "white";
}) {
  return <div className={`page page-background ${variant}`}>{children}</div>;
}
