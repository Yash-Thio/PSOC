import { useEffect, useState } from "react";

export function useShowOncePerTab(key: string) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = window.sessionStorage.getItem(key) === "1";
    if (!seen) {
      setShouldShow(true);
      window.sessionStorage.setItem(key, "1");
    }
  }, [key]);

  return shouldShow;
}