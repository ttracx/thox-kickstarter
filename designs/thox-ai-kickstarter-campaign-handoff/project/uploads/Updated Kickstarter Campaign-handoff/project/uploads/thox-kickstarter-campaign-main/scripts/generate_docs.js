"use strict";

/**
 * Render every campaign document into docs/.
 *
 * Prints the byte size of each file and exits nonzero on any failure.
 * Usage: node scripts/generate_docs.js
 */

const path = require("path");
const { writeDocument } = require("./docx_lib");
const documents = require("./content");

const OUT_DIR = path.join(__dirname, "..", "docs");

async function main() {
  let failures = 0;
  console.log(`Rendering ${documents.length} document(s) into ${OUT_DIR}`);
  for (const { file, spec } of documents) {
    const outPath = path.join(OUT_DIR, file);
    try {
      const bytes = await writeDocument(spec, outPath);
      console.log(`  ok  ${file.padEnd(28)} ${bytes.toLocaleString()} bytes`);
    } catch (err) {
      failures += 1;
      console.error(`  FAIL ${file}: ${err.message}`);
    }
  }
  if (failures > 0) {
    console.error(`${failures} document(s) failed to render.`);
    process.exit(1);
  }
  console.log("All documents rendered successfully.");
}

main().catch((err) => {
  console.error(`Fatal error: ${err.stack || err.message}`);
  process.exit(1);
});
