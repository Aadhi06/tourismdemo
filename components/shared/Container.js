import { cx } from "@/lib/utils";

export function Container({ className = "", children, as: Tag = "div" }) {
  return (
    <Tag className={cx("mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-16", className)}>
      {children}
    </Tag>
  );
}
