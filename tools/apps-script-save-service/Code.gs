const REPOSITORY = "pixelprosecutor/autodidact-test";
const ALLOWED_ORIGIN = "https://pixelprosecutor.github.io";
const FILES = {
  cassettes: "assets/cassettes/cassette-metadata.json",
  achievements: "assets/achievements/achievement-metadata.json",
  stores: "assets/stores/store-metadata.json"
};

/*
One-time setup:
1. In Project Settings > Script properties, add GITHUB_TOKEN. Give it only
   Contents read/write access to the Autodidact repository.
2. Deploy as a Web app: Execute as "Me"; Who has access: "Anyone".
3. Copy the deployment URL into SAVE_SERVICE_URL in the Cassette Editor.
*/
function doPost(event) {
  try {
    const payload = JSON.parse(event.parameter.payload || "{}");
    if (payload.source !== "autodidact-management-editor") {
      throw new Error("Unrecognized save request.");
    }
    const changes = payload.changes || {};
    const saved = [];
    Object.keys(changes).forEach((section) => {
      if (!FILES[section]) throw new Error("Unsupported content section: " + section);
      validateSection(section, changes[section]);
      saveFile(FILES[section], JSON.stringify(changes[section], null, 2) + "\n", section);
      saved.push(section);
    });
    return response({ ok: true, message: "Saved " + saved.join(", ") + "." });
  } catch (error) {
    return response({ ok: false, message: error.message || "Could not save changes." });
  }
}

function validateSection(section, data) {
  const key = section === "cassettes" ? "cassettes" : section === "achievements" ? "achievements" : "stores";
  if (!data || !Array.isArray(data[key])) throw new Error("Invalid " + section + " data.");
}

function saveFile(path, content, section) {
  const token = PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");
  if (!token) throw new Error("The save service is missing its GitHub permission.");
  const url = "https://api.github.com/repos/" + REPOSITORY + "/contents/" + path;
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json"
  };
  const current = UrlFetchApp.fetch(url, { headers: headers, muteHttpExceptions: true });
  if (current.getResponseCode() !== 200) throw new Error("Could not read " + section + " metadata.");
  const sha = JSON.parse(current.getContentText()).sha;
  const put = UrlFetchApp.fetch(url, {
    method: "put",
    headers: headers,
    contentType: "application/json",
    payload: JSON.stringify({
      message: "Update " + section + " from Autodidact Management",
      content: Utilities.base64Encode(Utilities.newBlob(content).getBytes()),
      sha: sha
    }),
    muteHttpExceptions: true
  });
  if (put.getResponseCode() < 200 || put.getResponseCode() >= 300) {
    throw new Error("Could not write " + section + " metadata.");
  }
}

function response(result) {
  const message = JSON.stringify({
    source: "autodidact-save-service",
    ok: Boolean(result.ok),
    message: result.message || ""
  }).replace(/</g, "\\u003c");
  return HtmlService.createHtmlOutput(
    "<script>window.top.postMessage(" + message + "," + JSON.stringify(ALLOWED_ORIGIN) + ");</script>"
  );
}
