import { readFile } from 'node:fs/promises';
const rows=JSON.parse(await readFile(new URL('../public/data/numbers.json',import.meta.url),'utf8'));
const errs=[];const ids=new Set();
for(const [i,n] of rows.entries()){
 const at=`row ${i+1} (${n.id||'no id'})`;
 for(const k of ['id','group','name_en','name_sw','number','hours','county','source_url','source_label','last_verified']) if(!n[k])errs.push(`${at}: missing ${k}`);
 if(n.verification_status!=='verified')errs.push(`${at}: not verified`);
 if(ids.has(n.id))errs.push(`${at}: duplicate id`);ids.add(n.id);
 if(!/^(\+?\d[\d ()-]{1,18}|\d{3,6})$/.test(n.number||''))errs.push(`${at}: invalid number format`);
 try{const u=new URL(n.source_url);if(u.protocol!=='https:')errs.push(`${at}: source must use HTTPS`)}catch{errs.push(`${at}: invalid source URL`)}
 if(!/^\d{4}-\d{2}-\d{2}$/.test(n.last_verified||''))errs.push(`${at}: verification date must be YYYY-MM-DD`);
}
if(!rows.length)errs.push('directory is empty');
if(errs.length){console.error(errs.join('\n'));process.exit(1)}
console.log(`Validated ${rows.length} source-backed public directory entries.`);
