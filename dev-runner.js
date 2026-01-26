const { concurrently } = require("concurrently");

const apps = [
  {
    name: "gateway",
    cwd: "./smr-backend/api-gateway",
    command: "pnpm run dev",
    prefixColor: "blue",
  },
  {
    name: "user-svc",
    cwd: "./smr-backend/user-service",
    command: "pnpm run dev",
    prefixColor: "magenta",
  },
  {
    name: "notify-svc",
    cwd: "./smr-backend/notification-service",
    command: "pnpm run dev",
    prefixColor: "green",
  },
    {
      name: "frontend",
      cwd: "./smr-frontend",
      command: "pnpm run dev",
      prefixColor: "cyan",
    },
  {
    name: "shared-lib",
    cwd: "./smr-shared-library",
    command: "pnpm run dev",
    prefixColor: "gray",
  },
];

// Map apps to concurrently format
const commands = apps.map((app) => ({
  command: `pnpm --dir ${app.cwd} run dev`, // Using --dir is cleaner than cd && command
  name: app.name,
  prefixColor: app.prefixColor,
}));

const { result } = concurrently(commands, {
  prefix: "name",
  killOthers: ["failure", "success"], // Kills all if one fails
  restartTries: 0,
});

result.then(
  () => console.log("All services finished successfully"),
  (err) => console.error("A service encountered an error:", err),
);
