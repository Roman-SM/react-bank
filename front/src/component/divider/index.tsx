import "./index.css";

export default function Component({ variant }: { variant: string }) {
  return <hr className={`divider divider-size ${variant}`} />;
}
