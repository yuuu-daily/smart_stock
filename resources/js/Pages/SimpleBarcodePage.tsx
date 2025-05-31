import { useEffect, useRef } from "react";

export default function SimpleBarcodePage() {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <h1>バーコードテスト</h1>
            <input
                ref={inputRef}
                placeholder="ここにバーコードをスキャン"
                onChange={(e) => console.log("バーコード:", e.target.value)}
                style={{ padding: "8px", fontSize: "1.2rem" }}
            />
        </>
    );
}
