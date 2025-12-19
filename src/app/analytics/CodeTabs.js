"use client";

import { useState } from "react";

const snippets = {
  js: {
    id: "js",
    label: "JS snippet",
    language: "js",
    languageLabel: "JavaScript",
    code: [
      '<span class="token comment">&lt;!-- Fluxly Analytics --&gt;</span>',
      '<span class="token tag">&lt;script</span> <span class="token attr-name">src</span>=<span class="token string">"https://cdn.getfluxly.com/sdk.js"</span> <span class="token attr-name">async</span><span class="token tag">&gt;&lt;/script&gt;</span>',
      '<span class="token tag">&lt;script&gt;</span>',
      '  <span class="token variable">window</span>.<span class="token property">fluxly</span> <span class="token operator">=</span> <span class="token variable">window</span>.<span class="token property">fluxly</span> <span class="token operator">||</span> <span class="token punctuation">[]</span><span class="token punctuation">;</span>',
      "",
      '  <span class="token variable">fluxly</span>.<span class="token method">push</span><span class="token punctuation">([</span><span class="token string">"init"</span><span class="token punctuation">, {</span>',
      '    <span class="token property">projectId</span><span class="token punctuation">:</span> <span class="token string">"demo-project-id"</span><span class="token punctuation">,</span>',
      '    <span class="token property">apiKey</span><span class="token punctuation">:</span> <span class="token string">"pk_live_xxxxx"</span>',
      '  <span class="token punctuation">}]);</span>',
      "",
      '  <span class="token comment">// Auto page view</span>',
      '  <span class="token variable">fluxly</span>.<span class="token method">push</span><span class="token punctuation">([</span><span class="token string">"page"</span><span class="token punctuation">]);</span>',
      '<span class="token tag">&lt;/script&gt;</span>',
    ].join("\n"),
  },
  backend: {
    id: "backend",
    label: "Backend events",
    language: "python",
    languageLabel: "Python",
    code: [
      '<span class="token keyword">import</span> <span class="token builtin">requests</span>',
      "",
      '<span class="token builtin">requests</span>.<span class="token method">post</span><span class="token punctuation">(</span>',
      '    <span class="token string">"https://api.getfluxly.com/v1/events"</span><span class="token punctuation">,</span>',
      '    <span class="token property">headers</span><span class="token punctuation">=</span><span class="token punctuation">{</span>',
      '        <span class="token string">"Content-Type"</span><span class="token punctuation">:</span> <span class="token string">"application/json"</span><span class="token punctuation">,</span>',
      '        <span class="token string">"X-API-Key"</span><span class="token punctuation">:</span> <span class="token string">"pk_live_xxxxx"</span><span class="token punctuation">,</span>',
      '    <span class="token punctuation">},</span>',
      '    <span class="token property">json</span><span class="token punctuation">=</span><span class="token punctuation">{</span>',
      '        <span class="token string">"event"</span><span class="token punctuation">:</span> <span class="token string">"subscription_created"</span><span class="token punctuation">,</span>',
      '        <span class="token string">"profile_id"</span><span class="token punctuation">:</span> <span class="token string">"user_123"</span><span class="token punctuation">,</span>',
      '        <span class="token string">"properties"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>',
      '            <span class="token string">"plan"</span><span class="token punctuation">:</span> <span class="token string">"starter"</span><span class="token punctuation">,</span>',
      '            <span class="token string">"amount"</span><span class="token punctuation">:</span> <span class="token number">2900</span><span class="token punctuation">,</span>',
      '            <span class="token string">"currency"</span><span class="token punctuation">:</span> <span class="token string">"USD"</span><span class="token punctuation">,</span>',
      '        <span class="token punctuation">},</span>',
      '        <span class="token string">"context"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>',
      '            <span class="token string">"source"</span><span class="token punctuation">:</span> <span class="token string">"django_backend"</span><span class="token punctuation">,</span>',
      '        <span class="token punctuation">},</span>',
      '    <span class="token punctuation">},</span>',
      '    <span class="token property">timeout</span><span class="token punctuation">=</span><span class="token number">2</span><span class="token punctuation">,</span>',
      '<span class="token punctuation">)</span>',
    ].join("\n"),
  },
  stripe: {
    id: "stripe",
    label: "Stripe code example",
    language: "python",
    languageLabel: "Python",
    code: [
      '<span class="token keyword">def</span> <span class="token function">handle_stripe_payment</span><span class="token punctuation">(</span><span class="token variable">event</span><span class="token punctuation">):</span>',
      '    <span class="token variable">user_id</span> <span class="token operator">=</span> <span class="token variable">event</span><span class="token punctuation">[</span><span class="token string">"data"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"object"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"customer"</span><span class="token punctuation">]</span>',
      "",
      '    <span class="token builtin">requests</span>.<span class="token method">post</span><span class="token punctuation">(</span>',
      '        <span class="token string">"https://api.getfluxly.com/v1/events"</span><span class="token punctuation">,</span>',
      '        <span class="token property">headers</span><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token string">"X-API-Key"</span><span class="token punctuation">:</span> <span class="token string">"pk_live_xxxxx"</span><span class="token punctuation">},</span>',
      '        <span class="token property">json</span><span class="token punctuation">=</span><span class="token punctuation">{</span>',
      '            <span class="token string">"event"</span><span class="token punctuation">:</span> <span class="token string">"payment_succeeded"</span><span class="token punctuation">,</span>',
      '            <span class="token string">"profile_id"</span><span class="token punctuation">:</span> <span class="token variable">user_id</span><span class="token punctuation">,</span>',
      '            <span class="token string">"properties"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>',
      '                <span class="token string">"amount"</span><span class="token punctuation">:</span> <span class="token variable">event</span><span class="token punctuation">[</span><span class="token string">"data"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"object"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"amount"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>',
      '                <span class="token string">"currency"</span><span class="token punctuation">:</span> <span class="token string">"USD"</span><span class="token punctuation">,</span>',
      '            <span class="token punctuation">},</span>',
      '        <span class="token punctuation">},</span>',
      '    <span class="token punctuation">)</span>',
    ].join("\n"),
  },
};

export default function CodeTabs() {
  const [active, setActive] = useState(null);
  const firstTabId = Object.values(snippets)[0].id;

  const handleClick = (id) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="code-tabs" role="tablist" aria-label="SDK examples">
        {Object.values(snippets).map((snippet) => (
          <button
            key={snippet.id}
            type="button"
            onClick={() => handleClick(snippet.id)}
            role="tab"
            id={`analytics-code-tab-${snippet.id}`}
            aria-controls={`analytics-code-panel-${snippet.id}`}
            aria-selected={active === snippet.id}
            tabIndex={active === snippet.id || (!active && snippet.id === firstTabId) ? 0 : -1}
            className={`code-tab ${active === snippet.id ? "is-active" : ""}`}
          >
            {snippet.label}
          </button>
        ))}
      </div>
      {Object.values(snippets).map((snippet) => (
        <pre
          key={snippet.id}
          id={`analytics-code-panel-${snippet.id}`}
          role="tabpanel"
          aria-labelledby={`analytics-code-tab-${snippet.id}`}
          hidden={active !== snippet.id}
          className={`code-block code-block--${snippet.language} code-block--labeled`}
          data-lang={snippet.languageLabel}
        >
          {/* Tokenized snippets are rendered as HTML for syntax highlighting. */}
          <code dangerouslySetInnerHTML={{ __html: snippet.code }} />
        </pre>
      ))}
    </div>
  );
}
