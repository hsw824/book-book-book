import { useSearchDebounce } from '@/hooks/useDebounce';
import { act, renderHook } from '@testing-library/react';

describe('useSearchDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('초기값을 그대로 반환한다.', () => {
    const { result } = renderHook(({ value }) => useSearchDebounce(value), { initialProps: { value: '' } });
    expect(result.current).toBe('');
  });

  test('299ms 까지는 이전값을 유지하다가 300ms에는 결과값이 유지되어야 한다.', () => {
    const { result, rerender } = renderHook(({ value }) => useSearchDebounce(value), {
      initialProps: { value: '' },
    });

    rerender({ value: '해' });
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('해');
  });

  test('연속으로 입력한 경우 마지막 입력 후 300ms가 지나야 마지막 값만 반영되어야 한다.', () => {
    const { result, rerender } = renderHook(({ value }) => useSearchDebounce(value), {
      initialProps: { value: '' },
    });
    rerender({ value: '해' });
    act(() => {
      vi.advanceTimersByTime(50);
    });

    rerender({ value: '해리' });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: '해리포터' });
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('해리포터');
  });

  test('ms를 지정하면 그 시간을 기준으로 동작한다.', () => {
    const { rerender, result } = renderHook(({ value }) => useSearchDebounce(value, 1000), {
      initialProps: { value: '' },
    });

    rerender({ value: '함께 자라기' });

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(result.current).toBe('');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('함께 자라기');
  });
});
