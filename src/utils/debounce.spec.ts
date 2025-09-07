import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("The function must be called once after the delay", () => {
        const fn = vi.fn();
        const debouncedFn = debounce(fn, 300);

        debouncedFn();
        vi.advanceTimersByTime(299);
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test("The timer must be reset if it is called again before the time is up.", () => {
        const fn = vi.fn();
        const debouncedFn = debounce(fn, 300);

        debouncedFn();
        vi.advanceTimersByTime(100);
        debouncedFn();
        vi.advanceTimersByTime(100);
        debouncedFn();
        vi.advanceTimersByTime(299);
        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test("Calls the function with the last arguments", () => {
        const fn = vi.fn();
        const debouncedFn = debounce(fn, 200);

        debouncedFn("hola");
        debouncedFn("chau");
        vi.advanceTimersByTime(200);

        expect(fn).toHaveBeenCalledWith("chau");
    });
});
