"use client";

import { Button } from "./ui/button";

interface ClientLinkProps {
  url: string;
  children?: React.ReactNode; // 子元素
  [key: string]: any; // 允许任意其他 props
}

export function ClientLink({
  url,
  children,
  ...restProps
}: ClientLinkProps): JSX.Element {
  const handleClick = () => {
    window.open(url, "_blank"); // 在新标签页打开 URL  };
  };

  return (
    <Button variant="ghost" onClick={handleClick} {...restProps}>
      {children}
    </Button>
  );
}
