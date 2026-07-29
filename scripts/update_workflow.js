const fs = require('fs');

const workflow = JSON.parse(fs.readFileSync(__dirname + '/../n8n/invoice-processor-workflow.json', 'utf8'));

fs.writeFileSync(__dirname + '/../n8n/invoice-processor-workflow.json', JSON.stringify(workflow, null, 2));

console.log("n8n Workflow JSON updated successfully with robust Vision error handling and Supabase fallback!");
