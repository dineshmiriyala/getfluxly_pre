"use client";

import { useState } from "react";
import CodeBlock from "@/app/components/CodeBlock";

export default function HomeCodeTabs({ sdkInstall, sdkTrack, httpPost, httpHandler }) {
  const [activeCodeTab, setActiveCodeTab] = useState("sdk");

  return (
    <div className="surface p-5">
      <div className="code-tabs" role="tablist" aria-label="SDK code samples">
        <button
          type="button"
          className={`code-tab ${activeCodeTab === "sdk" ? "is-active" : ""}`}
          onClick={() => setActiveCodeTab("sdk")}
          role="tab"
          id="home-code-tab-sdk"
          aria-controls="home-code-panel-sdk"
          aria-selected={activeCodeTab === "sdk"}
          tabIndex={activeCodeTab === "sdk" ? 0 : -1}
        >
          JS SDK
        </button>
        <button
          type="button"
          className={`code-tab ${activeCodeTab === "http" ? "is-active" : ""}`}
          onClick={() => setActiveCodeTab("http")}
          role="tab"
          id="home-code-tab-http"
          aria-controls="home-code-panel-http"
          aria-selected={activeCodeTab === "http"}
          tabIndex={activeCodeTab === "http" ? 0 : -1}
        >
          HTTP API
        </button>
      </div>
      <div
        id="home-code-panel-sdk"
        role="tabpanel"
        aria-labelledby="home-code-tab-sdk"
        hidden={activeCodeTab !== "sdk"}
        className="code-stack"
      >
        <p className="code-meta">Install script</p>
        <CodeBlock language="html" code={sdkInstall} />
        <p className="code-meta">Track and identify</p>
        <CodeBlock language="js" code={sdkTrack} />
      </div>
      <div
        id="home-code-panel-http"
        role="tabpanel"
        aria-labelledby="home-code-tab-http"
        hidden={activeCodeTab !== "http"}
        className="code-stack"
      >
        <p className="code-meta">Send events</p>
        <CodeBlock language="python" code={httpPost} />
        <p className="code-meta">Capture payments</p>
        <CodeBlock language="python" code={httpHandler} />
      </div>
    </div>
  );
}
