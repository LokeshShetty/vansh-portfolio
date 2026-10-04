import { Fragment } from "react";

// Inter's ₹ lives in its latin-ext file (~130 KB). Drawing just that glyph
// from the system font keeps the page on the single latin file.
export function Text({ children }: { children: string }) {
  const parts = children.split("₹");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="sys">₹</span>}
      {part}
    </Fragment>
  ));
}
