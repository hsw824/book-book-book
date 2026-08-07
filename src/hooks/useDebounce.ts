import { useEffect, useState } from "react";

export const useSearchDebounce = (value: string, ms: number = 300) => {
  const [result, setResult] = useState(value);
  // 디바운스 : 입력을 여러번 하면 그때마다 타이머를 새로 갱신한다. 입력이 더이상 없고 타이머가 0이 되면 그 값을 반환한다.
  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(value);
    }, ms);

    return () => clearTimeout(timer);
  }, [value, ms]);

  return result;
};
