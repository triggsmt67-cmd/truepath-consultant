import { mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const repository = process.env.GITHUB_REPOSITORY;
if (repository !== 'triggsmt67-cmd/truepath-consultant' || !process.env.GH_TOKEN) {
  throw new Error('Run state restore only in the intended GitHub repository with its scoped job token');
}
const api = async path => {
  const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}`, Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`State lookup failed: HTTP ${response.status}`);
  return response.json();
};
const runs = await api('actions/workflows/indexnow.yml/runs?status=success&per_page=30');
for (const run of runs.workflow_runs) {
  if (run.head_branch !== 'main' || run.head_repository?.full_name !== repository || !Number.isSafeInteger(run.id)) continue;
  const artifacts = await api(`actions/runs/${run.id}/artifacts`);
  const state = artifacts.artifacts.find(artifact => artifact.name === 'indexnow-state');
  if (!state) continue;
  if (state.expired) throw new Error('Previous IndexNow state expired; review before bootstrapping a new inventory');
  await mkdir('.indexnow', { recursive: true });
  execFileSync('gh', ['run', 'download', String(run.id), '--repo', repository, '--name', 'indexnow-state', '--dir', '.indexnow'], { stdio: 'inherit' });
  console.log(`Restored IndexNow submission history from run ${run.id}`);
  process.exit(0);
}
console.log('No previous IndexNow state artifact: initializing the inventory for the recent site migration.');
