import React, { useState, useEffect } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css";
import Markdown from 'react-markdown';
import axios from "axios"

import "./App.css";


function App() {
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState(`const hello = "Hello World console";
    const greet = (name) => {
      return \`Hello \${name}\`;
    };`);

  const [review, setReview] = useState("");


  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function handleCodeReview() {
    try {
      setLoading(true); 
      const response = await axios.post("http://localhost:3000/api/v1/ai/get-response", {
        code: code,
      });
      if(response.status == 200) {
        setLoading(false);
      }
      console.log(response.data.result);
      setReview(response.data.result);
    } catch (error) {
      console.error("Error fetching code review:", error);
    }
  }

  return (
    <>
     <main>
  <div className="left panel">
    <div className="code">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={code => highlight(code, prism.languages.javascript, "javascript")}
        padding={10}
        style={{
          fontFamily: '"Fira code", monospace',
          backgroundColor: "#1e1e1e",
          color: "#f8f8f2",
          minHeight: '100%',
        }}
      />
    </div>
    <div
  className={`review ${loading ? "loading" : ""}`}
  role="button"
  onClick={!loading ? handleCodeReview : null}
>
  {loading ? "Reviewing..." : "Review"}
</div>
  </div>

  <div className="right panel">
  <div className="markdown-output">
  <Markdown
    rehypePlugins={[rehypeHighlight]}
    components={{
      p: ({ node, ...props }) => <p className="md-paragraph" {...props} />,
      h1: ({ node, ...props }) => <h1 className="md-heading" {...props} />,
      h2: ({ node, ...props }) => <h2 className="md-heading" {...props} />,
      li: ({ node, ...props }) => <li className="md-list-item" {...props} />,
      code: ({ node, inline, className, children, ...props }) => (
        <code className={`md-code ${className || ''}`} {...props}>
          {children}
        </code>
      ),
    }}
  >
    {review}
  </Markdown>
</div>

<div
  className="copy"
  role="button"
  onClick={() => {
    navigator.clipboard.writeText(review);
  }}
>
  Copy
</div>
  </div>
</main>

    </>
  );
}

export default App;
