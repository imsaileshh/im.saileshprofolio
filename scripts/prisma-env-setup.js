const fs = require('fs');
const path = require('path');

// This script runs on Vercel to map the integration-specific database URLs 
// to the standard variables Prisma expects (DATABASE_URL, DIRECT_URL)
if (process.env.VERCEL) {
  let envVars = [];
  
  // Use the Prisma-specific pooled URL for normal connections
  if (process.env.DATABASE_URL_PRISMA_DATABASE_URL) {
    envVars.push(`DATABASE_URL="${process.env.DATABASE_URL_PRISMA_DATABASE_URL}"`);
  } else if (process.env.DATABASE_URL_POSTGRES_URL) {
    // Fallback if Prisma URL doesn't exist
    envVars.push(`DATABASE_URL="${process.env.DATABASE_URL_POSTGRES_URL}"`);
  }
  
  // Use the direct (non-pooled) URL for Prisma migrations
  if (process.env.DATABASE_URL_POSTGRES_URL) {
    envVars.push(`DIRECT_URL="${process.env.DATABASE_URL_POSTGRES_URL}"`);
  }
  
  if (envVars.length > 0) {
    const envPath = path.join(__dirname, '../.env');
    // We append to .env so Next.js and Prisma CLI can pick it up
    fs.appendFileSync(envPath, '\n' + envVars.join('\n'));
    console.log('Successfully mapped Vercel database environment variables for Prisma.');
  }
}
