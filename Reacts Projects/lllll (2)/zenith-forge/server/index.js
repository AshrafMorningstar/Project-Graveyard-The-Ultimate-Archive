/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory queue for prototype
const jobQueue = [];

app.post("/api/v1/jobs", (req, res) => {
  const job = {
    id: Date.now().toString(),
    status: "pending",
    payload: req.body,
    createdAt: new Date(),
  };
  jobQueue.push(job);
  console.log(`[ControlPlane] Enqueued Job ${job.id}`);
  res.status(202).json(job);
});

app.get("/api/v1/jobs/check", (req, res) => {
  if (jobQueue.length > 0) {
    const job = jobQueue.shift();
    console.log(`[ControlPlane] Validating Job ${job.id} for worker dispatch`);
    res.json(job);
  } else {
    res.status(204).send();
  }
});

app.listen(PORT, () => {
  console.log(`[ZenithForge] Control Plane listening on port ${PORT}`);
});
