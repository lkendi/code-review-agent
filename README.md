# Code Review Agent

This is an AI agent that can help you with your software development tasks. It can review your code, generate commit messages, and more.

## Features

- **Code Review**: The agent can review your code changes and provide feedback on correctness, clarity, maintainability, and more. The review is saved in a `review.md` file.
- **Commit Message Generation**: The agent can generate a commit message for your changes, following the Conventional Commits specification.

## Usage

To run the agent, use the following command:

```bash
bun run index.ts
```

This will run both the code review and commit message generation agents.

## Configuration

You can configure the agent by modifying the `index.ts` file. For example, you can change the directory that the agent reviews by modifying the following line:

```typescript
await codeReviewAgent(
  "Review the code changes in '../my-agent' directory, make your reviews and suggestions file by file",
  "review.md",
);
```