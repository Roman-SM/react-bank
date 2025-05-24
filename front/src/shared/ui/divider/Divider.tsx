import "./DividerStyle.css";

export function Divider({ variant }: { variant: string }) {
  return <hr className={`divider divider-size ${variant}`} />;
}
