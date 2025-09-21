import { generateText, stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { COMMIT_MESSAGE_PROMPT, SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "./tools";
import { writeFileSync } from "fs";

const codeReviewAgent = async (prompt: string, outputFile?: string) => {
  const result = streamText({
    model: google("models/gemini-1.5-flash"),
    prompt,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool: getFileChangesInDirectoryTool,
    },
    stopWhen: stepCountIs(10),
  });

  let output = "";
  for await (const chunk of result.textStream) {
    if (outputFile) {
      output += chunk;
    } else {
      process.stdout.write(chunk);
    }
  }

  if (outputFile) {
    writeFileSync(outputFile, output);
    console.log(`Code review written to ${outputFile}`);
  }
};

const commitMessageAgent = async (prompt: string) => {
  const { text } = await generateText({
    model: google("models/gemini-1.5-flash"),
    prompt,
    system: COMMIT_MESSAGE_PROMPT,
    tools: {
      getFileChangesInDirectoryTool,
    },
  });

  console.log(text);
};

// Specify which directory the code review agent should review changes in your prompt
await codeReviewAgent(
  "Review the code changes in '../my-agent' directory, make your reviews and suggestions file by file",
  "review.md",
);

await commitMessageAgent(
  "Generate a commit message for the changes in '../my-agent' directory",
);
