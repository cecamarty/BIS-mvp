react-dom_client.js?v=ec4bdeec:20103 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
tab.js:1 Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' chrome-extension://6c94c9bd-7257-461a-9934-3c7fe442ee87/". Either the 'unsafe-inline' keyword, a hash ('sha256-kPx0AsF0oz2kKiZ875xSvv693TBHkQ/0SkMJZnnNpnQ='), or a nonce ('nonce-...') is required to enable inline execution.

(anonymous) @ tab.js:1
(index):1 Access to XMLHttpRequest at 'http://localhost:8080/api/finance/profit' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
App.tsx:16 Error fetching profit: AxiosError
fetchProfit @ App.tsx:16
:8080/api/finance/profit:1  Failed to load resource: net::ERR_FAILED
(index):1 Access to XMLHttpRequest at 'http://localhost:8080/api/finance/profit' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
App.tsx:16 Error fetching profit: AxiosError
fetchProfit @ App.tsx:16
:8080/api/finance/profit:1  Failed to load resource: net::ERR_FAILED
(index):1 Access to XMLHttpRequest at 'http://localhost:8080/api/finance/revenue' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
App.tsx:30 Error adding revenue: AxiosError
handleAddRevenue @ App.tsx:30
:8080/api/finance/revenue:1  Failed to load resource: net::ERR_FAILED
