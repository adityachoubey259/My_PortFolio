const baseUrl = (process.env.VERIFY_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

const routes = [
  "/",
  "/projects",
  "/about",
  "/skills",
  "/experience",
  "/contact",
  "/recruiter",
  "/analytics",
  "/playground",
  "/playground/checklist",
  "/playground/rs485",
  "/playground/automation",
  "/lab",
  "/work/xecroai",
  "/work/itl-checklist",
  "/work/rs485-industrial-monitoring",
  "/work/n8n-workflow-automation",
  "/work/python-website-system",
  "/api/health",
  "/resume/Aditya-Choubey-Resume.pdf",
  "/robots.txt",
  "/sitemap.xml",
];

const assistantChecks = [
  { question: "How long did Aditya work at Industrial Trade Link?", includes: ["6 months", "Industrial Trade Link"] },
  { question: "How long at CAITPL?", includes: ["3 months", "CAITPL"] },
  { question: "How long at tirth.ai?", includes: ["3 months", "tirth.ai"] },
  { question: "What is Aditya currently learning?", includes: ["C++", "PLC", "HMI", "SCADA"] },
  { question: "Tell me about RS485 Industrial Monitoring.", includes: ["RS485", "Industrial Trade Link"] },
  { question: "How can I contact Aditya?", includes: ["adityachoubey259@gmail.com", "github.com/adityachoubey259"] },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkRoute(route) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "follow" });
  assert(response.ok, `${route} returned ${response.status}`);
  if (route.endsWith(".pdf")) {
    const type = response.headers.get("content-type") || "";
    assert(type.includes("pdf") || type.includes("octet-stream"), `${route} did not return a PDF-like content type`);
    return;
  }
  const text = await response.text();
  assert(text.length > 20, `${route} returned an unexpectedly small response`);
}

async function checkLegacyRedirect() {
  const response = await fetch(`${baseUrl}/lab/analytics`, { redirect: "manual" });
  assert([307, 308].includes(response.status), `/lab/analytics returned ${response.status} instead of a redirect`);
  assert(response.headers.get("location")?.includes("/analytics"), "/lab/analytics did not redirect to /analytics");
}

async function checkAssistant({ question, includes }) {
  const response = await fetch(`${baseUrl}/api/assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question, sessionId: "release-check" }),
  });
  assert(response.ok, `assistant question failed with ${response.status}: ${question}`);
  const data = await response.json();
  const answer = `${data.answer || ""} ${(data.sources || []).join(" ")}`;
  for (const expected of includes) {
    assert(answer.includes(expected), `assistant answer for "${question}" missing "${expected}"`);
  }
  assert(data.mode === "Portfolio Knowledge Mode" || data.mode === "AI-Powered Conversation", "assistant mode is invalid");
}

async function checkSecurityHeaders() {
  const response = await fetch(`${baseUrl}/`);
  const headers = response.headers;
  assert(headers.get("content-security-policy")?.includes("frame-ancestors 'none'"), "CSP frame-ancestors missing");
  assert(headers.get("x-frame-options") === "DENY", "X-Frame-Options header missing");
  assert(headers.get("x-content-type-options") === "nosniff", "X-Content-Type-Options header missing");
  assert(Boolean(headers.get("referrer-policy")), "Referrer-Policy header missing");
}

async function main() {
  console.log(`Verifying release at ${baseUrl}`);
  for (const route of routes) await checkRoute(route);
  await checkLegacyRedirect();
  await checkSecurityHeaders();
  for (const check of assistantChecks) await checkAssistant(check);
  console.log("Release verification passed.");
}

main().catch((error) => {
  console.error(`Release verification failed: ${error.message}`);
  process.exit(1);
});

