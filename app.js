/* ═══════════════════════════════════════════════════════════════
   TECHRADAR v4 — Military Intel app.js
═══════════════════════════════════════════════════════════════ */

/* ── CONFIG ──────────────────────────────────────────────────── */
const SOURCES = {
  arxiv:      { label:'PAPERS',  color:'#3b82f6', icon:'◈' },
  semantic:   { label:'SCHOLAR', color:'#60a5fa', icon:'◈' },
  github:     { label:'GITHUB',  color:'#eab308', icon:'⬡' },
  hn:         { label:'HN',      color:'#f97316', icon:'▲' },
  reddit:     { label:'REDDIT',  color:'#ff4500', icon:'●' },
  devto:      { label:'DEV.TO',  color:'#7c3aed', icon:'◆' },
  huggingface:{ label:'HF',      color:'#ffcc00', icon:'✦' },
  news:       { label:'NEWS',    color:'#00ffcc', icon:'●' },
};

const TAG_RULES = {
  AI:       /\b(ai|ml|llm|gpt|transformer|neural|deep.?learn|diffusion|langchain|rag|embedding|vector|model|inference|fine.?tun|reinforcement|agent|multimodal|vision|nlp|bert|claude|gemini|mistral|llama|openai|anthropic|hugging)\b/i,
  DevTools: /\b(devtools|ide|vscode|copilot|cursor|sdk|cli|compiler|debugger|testing|ci|cd|pipeline|docker|kubernetes|k8s|build|deploy|vite|webpack|lint|prettier|typescript|rust|wasm)\b/i,
  SaaS:     /\b(saas|platform|subscription|b2b|startup|product|launch|growth|revenue|mrr|arr|churn|onboard|dashboard|analytics|crm|erp)\b/i,
  Infra:    /\b(infra|cloud|aws|gcp|azure|server|database|postgres|mysql|redis|kafka|spark|hadoop|distributed|edge|cdn|network|microservice|terraform|pulumi|ansible)\b/i,
  Security: /\b(security|cyber|vuln|cve|exploit|malware|ransomware|phish|breach|zero.?day|pentest|siem|soc|auth|oauth|jwt|encryption|firewall|ddos|threat)\b/i,
  Web3:     /\b(web3|blockchain|crypto|bitcoin|ethereum|defi|nft|dao|solidity|smart.?contract|wallet|token|chain|layer.?2|rollup|zk|polygon|solana|cosmos)\b/i,
};

const LOCS = [
  { country:'US', lat:37.7,  lon:-122.4, w:5 },
  { country:'US', lat:40.7,  lon:-74.0,  w:4 },
  { country:'US', lat:47.6,  lon:-122.3, w:3 },
  { country:'US', lat:37.3,  lon:-121.9, w:4 },
  { country:'GB', lat:51.5,  lon:-0.12,  w:4 },
  { country:'DE', lat:52.5,  lon:13.4,   w:3 },
  { country:'FR', lat:48.8,  lon:2.35,   w:3 },
  { country:'CN', lat:39.9,  lon:116.4,  w:4 },
  { country:'CN', lat:31.2,  lon:121.5,  w:3 },
  { country:'JP', lat:35.7,  lon:139.7,  w:3 },
  { country:'KR', lat:37.6,  lon:127.0,  w:3 },
  { country:'IN', lat:12.9,  lon:77.6,   w:3 },
  { country:'CA', lat:43.7,  lon:-79.4,  w:3 },
  { country:'AU', lat:-33.8, lon:151.2,  w:2 },
  { country:'SG', lat:1.35,  lon:103.8,  w:3 },
  { country:'IL', lat:32.1,  lon:34.8,   w:3 },
  { country:'NL', lat:52.4,  lon:4.9,    w:2 },
  { country:'SE', lat:59.3,  lon:18.1,   w:2 },
  { country:'CH', lat:47.4,  lon:8.5,    w:2 },
  { country:'BR', lat:-23.5, lon:-46.6,  w:2 },
  { country:'RU', lat:55.7,  lon:37.6,   w:2 },
];

const HUBS = [
  { city:'San Francisco', lat:37.77, lon:-122.42, country:'US' },
  { city:'New York',      lat:40.71, lon:-74.01,  country:'US' },
  { city:'London',        lat:51.51, lon:-0.13,   country:'GB' },
  { city:'Berlin',        lat:52.52, lon:13.41,   country:'DE' },
  { city:'Singapore',     lat:1.35,  lon:103.82,  country:'SG' },
  { city:'Tokyo',         lat:35.69, lon:139.69,  country:'JP' },
  { city:'Seoul',         lat:37.57, lon:126.98,  country:'KR' },
  { city:'Beijing',       lat:39.91, lon:116.39,  country:'CN' },
  { city:'Bangalore',     lat:12.97, lon:77.59,   country:'IN' },
  { city:'Tel Aviv',      lat:32.08, lon:34.78,   country:'IL' },
  { city:'Stockholm',     lat:59.33, lon:18.07,   country:'SE' },
  { city:'Sydney',        lat:-33.87,lon:151.21,  country:'AU' },
  { city:'Toronto',       lat:43.65, lon:-79.38,  country:'CA' },
  { city:'Paris',         lat:48.86, lon:2.35,    country:'FR' },
];

const AI_COMPANIES = [
  { name:'OpenAI',     lat:37.78, lon:-122.41, color:'#00ffcc', github:'openai',         hf:'openai'      },
  { name:'Anthropic',  lat:37.79, lon:-122.40, color:'#ff6b35', github:'anthropics',     hf:'anthropic'   },
  { name:'Google',     lat:37.42, lon:-122.08, color:'#4285f4', github:'google',         hf:'google'      },
  { name:'DeepMind',   lat:51.52, lon:-0.08,   color:'#4285f4', github:'google-deepmind',hf:null          },
  { name:'Meta AI',    lat:37.48, lon:-122.15, color:'#0668e1', github:'facebookresearch',hf:'facebook'   },
  { name:'Mistral',    lat:48.87, lon:2.33,    color:'#ff6b35', github:'mistralai',      hf:'mistralai'   },
  { name:'HuggingFace',lat:40.71, lon:-74.01,  color:'#ffcc00', github:'huggingface',    hf:'huggingface' },
  { name:'xAI',        lat:37.77, lon:-122.39, color:'#e0e0e0', github:'xai-org',        hf:'xai-org'     },
  { name:'Databricks', lat:37.78, lon:-122.39, color:'#ff3300', github:'databricks',     hf:'databricks'  },
  { name:'Aleph Alpha',lat:49.01, lon:8.40,    color:'#7c3aed', github:'Aleph-Alpha',    hf:'Aleph-Alpha' },
  { name:'Baidu AI',   lat:39.91, lon:116.39,  color:'#ee0000', github:'baidu-research', hf:null          },
  { name:'Cohere',     lat:43.65, lon:-79.38,  color:'#00ffcc', github:'cohere-ai',      hf:'Cohere'      },
  { name:'Stability',  lat:51.50, lon:-0.12,   color:'#7c3aed', github:'Stability-AI',   hf:'stabilityai' },
];

const HF_ORG_LOC = {
  google:'US', microsoft:'US', openai:'US', facebook:'US', meta:'US',
  stanford:'US', mit:'US', huggingface:'US', anthropic:'US', allenai:'US',
  mistralai:'FR', bigscience:'FR', deepmind:'GB',
  'aleph-alpha':'DE', dbmdz:'DE', rinna:'JP', 'cl-tohoku':'JP',
  snunlp:'KR', BAAI:'CN', 'thu-coai':'CN', 'ai4bharat':'IN',
};

const COUNTRY_TECH = {
  US:{ score:98, hubs:['SF','NYC','Seattle','Austin'], trends:['AI/ML','Cloud','Infra','Security'], companies:['OpenAI','Google','Meta','Amazon','Microsoft'] },
  GB:{ score:82, hubs:['London'], trends:['AI','Fintech','DeepTech','Security'], companies:['DeepMind','Arm','Improbable'] },
  CN:{ score:88, hubs:['Beijing','Shanghai','Shenzhen'], trends:['AI','Hardware','EV','5G'], companies:['Baidu','Alibaba','Tencent','Huawei'] },
  DE:{ score:75, hubs:['Berlin','Munich'], trends:['Infra','Industry4.0','Security','AI'], companies:['SAP','Siemens','Aleph Alpha'] },
  JP:{ score:72, hubs:['Tokyo','Osaka'], trends:['Robotics','Hardware','Gaming','AI'], companies:['Sony','Toyota','NTT'] },
  KR:{ score:76, hubs:['Seoul'], trends:['Semiconductors','AI','5G','DevTools'], companies:['Samsung','SK Hynix','Naver'] },
  IN:{ score:70, hubs:['Bangalore','Hyderabad','Mumbai'], trends:['SaaS','Infra','AI','DevTools'], companies:['Infosys','TCS','Freshworks'] },
  FR:{ score:74, hubs:['Paris'], trends:['AI','Crypto','Space','SaaS'], companies:['Mistral','Ledger','Doctolib'] },
  SG:{ score:78, hubs:['Singapore'], trends:['Fintech','Web3','AI','Infra'], companies:['Sea','Grab','Shopee'] },
  IL:{ score:80, hubs:['Tel Aviv'], trends:['Security','AI','Drone','Fintech'], companies:['Check Point','CyberArk','WalkMe'] },
  CA:{ score:78, hubs:['Toronto','Vancouver','Montreal'], trends:['AI','Quantum','Clean Tech','SaaS'], companies:['Shopify','Cohere','OpenText'] },
  SE:{ score:76, hubs:['Stockholm'], trends:['Fintech','Gaming','CleanTech','AI'], companies:['Spotify','Klarna','King'] },
  NL:{ score:72, hubs:['Amsterdam'], trends:['Cloud','SaaS','AI','Infra'], companies:['ASML','Booking','Adyen'] },
  AU:{ score:68, hubs:['Sydney','Melbourne'], trends:['Fintech','AgriTech','AI','Cloud'], companies:['Atlassian','Canva','Afterpay'] },
  BR:{ score:60, hubs:['São Paulo'], trends:['Fintech','eCommerce','Agri','SaaS'], companies:['Nubank','Mercado Livre','iFood'] },
  CH:{ score:75, hubs:['Zurich'], trends:['Fintech','Quantum','Biotech','AI'], companies:['ABB','Logitech','Crypto.com'] },
  RU:{ score:55, hubs:['Moscow'], trends:['Security','AI','Space','Infra'], companies:['Yandex','Kaspersky'] },
};

const COUNTRY_CENTROIDS = {
  US:[38,-97],GB:[54,-2],CN:[35,103],DE:[51,10],JP:[36,138],
  KR:[36,128],IN:[20,77],FR:[46,2],SG:[1.4,104],IL:[31,35],
  CA:[56,-106],SE:[62,15],NL:[52,5],AU:[-25,133],BR:[-10,-55],
  CH:[47,8],RU:[61,105],ZA:[-29,25],NG:[10,8],AR:[-34,-64],
  MX:[23,-102],IT:[42,12],ES:[40,-4],PL:[52,19],UA:[49,32],
  TR:[39,35],SA:[24,45],AE:[24,54],TH:[15,101],ID:[-5,120],
};

const CID = {
  4:'AF',8:'AL',12:'DZ',24:'AO',32:'AR',36:'AU',40:'AT',50:'BD',56:'BE',
  76:'BR',100:'BG',124:'CA',152:'CL',156:'CN',170:'CO',208:'DK',276:'DE',
  250:'FR',300:'GR',356:'IN',360:'ID',364:'IR',376:'IL',380:'IT',392:'JP',
  410:'KR',484:'MX',528:'NL',554:'NZ',566:'NG',578:'NO',586:'PK',616:'PL',
  620:'PT',643:'RU',682:'SA',710:'ZA',724:'ES',752:'SE',756:'CH',792:'TR',
  804:'UA',784:'AE',826:'GB',840:'US',858:'UY',704:'VN',
};

/* ── STATE ───────────────────────────────────────────────────── */
let allSignals    = [];
let activeSource  = 'all';
let activeTag     = 'all';
let activeTime    = '24h';
let seenUrls      = new Set();
let isFirstLoad   = true;
let globeInstance = null;
let autoRotate    = true;
let rotatePhi     = 0;
let nextRefreshSec = 30;
let timelinePos   = 1.0;   // 0..1, 1=NOW
let isPlaying     = false;
let feedCollapsed = false;
let cardIdCounter = 0;
let hoveredPolygon = null;
let dcWeatherCache = {};   // keyed by dc.name
let dcTooltipMoveHandler = null;
let sourceStatus = {};     // { arxiv:'ok'|'loading'|'error', ... }

// Layer visibility
const LAYERS = { signals:true, arcs:true, density:true, companies:false, investment:false, papers:false, datacenters:false, energyEfficiency:false };

/* ── FALLBACK SIGNALS (shown instantly before API responses) ──── */
const FALLBACK_SIGNALS = [
  { id:'fb-1',  source:'arxiv',      title:'Scaling Laws for Neural Language Models',          desc:'Empirical analysis of how model performance scales with compute, data, and parameters.', url:'https://arxiv.org/abs/2001.08361',       lat:40.71, lon:-74.01,  country:'US', tags:['AI'],       score:92, published_at:new Date(Date.now()-3600000).toISOString()  },
  { id:'fb-2',  source:'github',     title:'microsoft/vscode — Visual Studio Code',            desc:'Open-source code editor with AI-assisted development features.',                         url:'https://github.com/microsoft/vscode',    lat:47.64, lon:-122.13, country:'US', tags:['DevTools'], score:88, published_at:new Date(Date.now()-7200000).toISOString()  },
  { id:'fb-3',  source:'hn',         title:'OpenAI releases new reasoning model',              desc:'Hacker News discussion on the latest OpenAI model release with reasoning capabilities.',  url:'https://news.ycombinator.com/item?id=1', lat:37.77, lon:-122.42, country:'US', tags:['AI'],       score:85, published_at:new Date(Date.now()-1800000).toISOString()  },
  { id:'fb-4',  source:'arxiv',      title:'Attention Is All You Need — revisited',            desc:'Modern reanalysis of the transformer architecture and its downstream applications.',       url:'https://arxiv.org/abs/1706.03762',       lat:51.51, lon:-0.13,   country:'GB', tags:['AI'],       score:90, published_at:new Date(Date.now()-5400000).toISOString()  },
  { id:'fb-5',  source:'huggingface',title:'mistralai/Mistral-7B-v0.1',                        desc:'Highly efficient 7B parameter language model from Mistral AI.',                          url:'https://huggingface.co/mistralai/Mistral-7B-v0.1', lat:48.86, lon:2.35, country:'FR', tags:['AI'], score:87, published_at:new Date(Date.now()-9000000).toISOString()  },
  { id:'fb-6',  source:'devto',      title:'Building Production-Ready RAG Pipelines',         desc:'Step-by-step guide to deploying retrieval-augmented generation in production.',           url:'https://dev.to',                         lat:40.71, lon:-74.01,  country:'US', tags:['AI'],       score:78, published_at:new Date(Date.now()-10800000).toISOString() },
  { id:'fb-7',  source:'github',     title:'vercel/next.js — The React Framework',            desc:'Production-ready React framework with server-side rendering and static generation.',      url:'https://github.com/vercel/next.js',      lat:37.77, lon:-122.42, country:'US', tags:['DevTools'], score:86, published_at:new Date(Date.now()-14400000).toISOString() },
  { id:'fb-8',  source:'news',       title:'AI Funding Hits Record High in Q1 2025',          desc:'Venture capital investment in AI startups surpasses $50B globally in first quarter.',     url:'https://techcrunch.com',                 lat:37.78, lon:-122.41, country:'US', tags:['AI','SaaS'],score:82, published_at:new Date(Date.now()-18000000).toISOString() },
  { id:'fb-9',  source:'arxiv',      title:'DeepSeek-R1: Incentivizing Reasoning via RL',     desc:'Chinese research on reinforcement learning for advanced reasoning in LLMs.',              url:'https://arxiv.org/abs/2501.12948',       lat:39.91, lon:116.39,  country:'CN', tags:['AI'],       score:93, published_at:new Date(Date.now()-21600000).toISOString() },
  { id:'fb-10', source:'github',     title:'kubernetes/kubernetes — Container Orchestration', desc:'Production-grade container orchestration for automated deployment and scaling.',          url:'https://github.com/kubernetes/kubernetes',lat:37.42, lon:-122.08, country:'US', tags:['Infra'],   score:84, published_at:new Date(Date.now()-25200000).toISOString() },
  { id:'fb-11', source:'semantic',   title:'GPT-4 Technical Report',                          desc:'Technical overview of GPT-4 architecture, training, and capabilities from OpenAI.',      url:'https://arxiv.org/abs/2303.08774',       lat:37.79, lon:-122.40, country:'US', tags:['AI'],       score:91, published_at:new Date(Date.now()-28800000).toISOString() },
  { id:'fb-12', source:'hn',         title:'Cloudflare announces AI Gateway for enterprise',  desc:'Discussion: new AI proxy layer with caching, rate limiting and observability.',           url:'https://news.ycombinator.com/item?id=2', lat:37.78, lon:-122.39, country:'US', tags:['Infra'],    score:79, published_at:new Date(Date.now()-32400000).toISOString() },
  { id:'fb-13', source:'arxiv',      title:'Gemma: Open Models Based on Gemini Research',     desc:'Google releases open-weight models built from Gemini research.',                         url:'https://arxiv.org/abs/2403.08295',       lat:37.42, lon:-122.08, country:'US', tags:['AI'],       score:88, published_at:new Date(Date.now()-36000000).toISOString() },
  { id:'fb-14', source:'devto',      title:'TypeScript 5.4 Features You Should Know',         desc:'Deep dive into the latest TypeScript features improving developer productivity.',         url:'https://dev.to',                         lat:47.64, lon:-122.13, country:'US', tags:['DevTools'], score:75, published_at:new Date(Date.now()-39600000).toISOString() },
  { id:'fb-15', source:'huggingface',title:'google/gemma-7b',                                  desc:'Open-weight language model from Google based on Gemini technology.',                    url:'https://huggingface.co/google/gemma-7b', lat:37.42, lon:-122.08, country:'US', tags:['AI'],       score:86, published_at:new Date(Date.now()-43200000).toISOString() },
  { id:'fb-16', source:'news',       title:'Samsung unveils next-gen HBM4 memory chips',      desc:'New high-bandwidth memory designed for AI accelerators expected in late 2025.',          url:'https://techcrunch.com',                 lat:37.57, lon:126.98,  country:'KR', tags:['Infra'],    score:80, published_at:new Date(Date.now()-46800000).toISOString() },
  { id:'fb-17', source:'github',     title:'anthropics/anthropic-sdk-python',                 desc:'Official Python SDK for the Anthropic API with async support.',                          url:'https://github.com/anthropics/anthropic-sdk-python', lat:37.79, lon:-122.40, country:'US', tags:['AI','DevTools'], score:83, published_at:new Date(Date.now()-50400000).toISOString() },
  { id:'fb-18', source:'arxiv',      title:'Sora: Video generation models as world simulators',desc:'OpenAI\'s analysis of training video generation models to understand the physical world.', url:'https://openai.com/sora',               lat:37.77, lon:-122.42, country:'US', tags:['AI'],       score:94, published_at:new Date(Date.now()-54000000).toISOString() },
  { id:'fb-19', source:'semantic',   title:'CLIP: Learning Transferable Visual Models',       desc:'Contrastive learning approach for connecting images and text at scale.',                  url:'https://arxiv.org/abs/2103.00020',       lat:37.78, lon:-122.41, country:'US', tags:['AI'],       score:89, published_at:new Date(Date.now()-57600000).toISOString() },
  { id:'fb-20', source:'news',       title:'EU AI Act enforcement begins for high-risk systems',desc:'European regulators begin enforcing compliance rules for AI systems in healthcare and finance.', url:'https://techcrunch.com',           lat:48.86, lon:2.35,    country:'FR', tags:['AI','Security'], score:77, published_at:new Date(Date.now()-61200000).toISOString() },
];

/* ── DATA CENTERS ────────────────────────────────────────────── */
const DATA_CENTERS = [
  {name:'AWS us-east-1',        company:'AWS',       lat:38.13,  lng:-78.45,  mw:500},
  {name:'AWS us-west-2',        company:'AWS',       lat:45.52,  lng:-122.68, mw:400},
  {name:'AWS eu-west-1',        company:'AWS',       lat:53.35,  lng:-6.26,   mw:350},
  {name:'AWS ap-northeast-1',   company:'AWS',       lat:35.69,  lng:139.69,  mw:300},
  {name:'AWS ap-southeast-1',   company:'AWS',       lat:1.35,   lng:103.82,  mw:250},
  {name:'AWS eu-central-1',     company:'AWS',       lat:50.11,  lng:8.68,    mw:300},
  {name:'AWS ap-south-1',       company:'AWS',       lat:19.08,  lng:72.88,   mw:200},
  {name:'Google Council Bluffs',company:'Google',    lat:41.26,  lng:-95.86,  mw:400},
  {name:'Google The Dalles',    company:'Google',    lat:45.60,  lng:-121.18, mw:350},
  {name:'Google Eemshaven',     company:'Google',    lat:53.43,  lng:6.83,    mw:400},
  {name:'Google Hamina',        company:'Google',    lat:60.56,  lng:27.19,   mw:350},
  {name:'Google Singapore',     company:'Google',    lat:1.36,   lng:103.80,  mw:250},
  {name:'Google Tokyo',         company:'Google',    lat:35.70,  lng:139.71,  mw:200},
  {name:'Google São Paulo',     company:'Google',    lat:-23.54, lng:-46.63,  mw:150},
  {name:'Azure East US',        company:'Microsoft', lat:36.60,  lng:-78.00,  mw:450},
  {name:'Azure West Europe',    company:'Microsoft', lat:52.36,  lng:4.90,    mw:400},
  {name:'Azure SE Asia',        company:'Microsoft', lat:1.37,   lng:103.84,  mw:300},
  {name:'Azure Japan East',     company:'Microsoft', lat:35.68,  lng:139.70,  mw:250},
  {name:'Azure Australia East', company:'Microsoft', lat:-33.87, lng:151.21,  mw:200},
  {name:'Azure Brazil South',   company:'Microsoft', lat:-23.55, lng:-46.64,  mw:150},
  {name:'Meta Prineville',      company:'Meta',      lat:44.30,  lng:-120.83, mw:300},
  {name:'Meta Forest City',     company:'Meta',      lat:35.95,  lng:-81.09,  mw:250},
  {name:'Meta Luleå',           company:'Meta',      lat:65.58,  lng:22.15,   mw:200},
  {name:'Meta Singapore',       company:'Meta',      lat:1.34,   lng:103.83,  mw:150},
  {name:'Oracle Ashburn',       company:'Oracle',    lat:39.04,  lng:-77.49,  mw:200},
  {name:'Oracle Frankfurt',     company:'Oracle',    lat:50.11,  lng:8.69,    mw:180},
  {name:'Oracle Tokyo',         company:'Oracle',    lat:35.68,  lng:139.68,  mw:150},
  {name:'Oracle Sydney',        company:'Oracle',    lat:-33.88, lng:151.22,  mw:130},
  {name:'Oracle Singapore',     company:'Oracle',    lat:1.36,   lng:103.81,  mw:120},
  {name:'Oracle São Paulo',     company:'Oracle',    lat:-23.53, lng:-46.62,  mw:100},
];

const DC_COMPANY_COLORS = { AWS:'#ff9900', Google:'#4285f4', Microsoft:'#00a4ef', Meta:'#0668e1', Oracle:'#f80000' };

function greenScoreColor(score){
  if(score >= 90) return '#00ff88';
  if(score >= 70) return '#aaff00';
  if(score >= 50) return '#ffaa00';
  return '#ff4444';
}

/* ── UTILITIES ───────────────────────────────────────────────── */
function esc(s){
  return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function timeAgo(iso){
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if(s < 60)    return `${Math.floor(s)}s`;
  if(s < 3600)  return `${Math.floor(s/60)}m`;
  if(s < 86400) return `${Math.floor(s/3600)}h`;
  return `${Math.floor(s/86400)}d`;
}

function utcStr(){ return new Date().toISOString().replace('T',' ').slice(0,19)+' UTC'; }
function utcTime(){ return new Date().toUTCString().slice(17,25); }

function fmtNum(n){
  if(!n) return '0';
  if(n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if(n >= 1e3) return (n/1e3).toFixed(1)+'K';
  return String(n);
}

function detectTags(text){
  const tags = [];
  for(const [tag,rx] of Object.entries(TAG_RULES)){
    if(rx.test(text)) tags.push(tag);
  }
  return tags.length ? tags : ['AI'];
}

function isFunding(text){
  return /\b(series [a-e]|seed round|raised|funding|million|billion|valuation|vc|venture|invest|acqui|ipo)\b/i.test(text);
}

function parseFunding(text){
  const m = text.match(/\$?([\d,.]+)\s*(million|billion|M|B)\b/i);
  if(!m) return null;
  let v = parseFloat(m[1].replace(/,/g,''));
  if(/billion|B/i.test(m[2])) v *= 1000;
  return v;
}

function matchCountry(text){
  const map = {
    'united states':'US','usa':'US','silicon valley':'US','san francisco':'US',
    'new york':'US','google':'US','openai':'US','microsoft':'US','amazon':'US',
    'united kingdom':'GB','london':'GB','deepmind':'GB',
    'china':'CN','beijing':'CN','shanghai':'CN','baidu':'CN',
    'germany':'DE','berlin':'DE','munich':'DE',
    'france':'FR','paris':'FR','mistral':'FR',
    'japan':'JP','tokyo':'JP','korea':'KR','seoul':'KR',
    'india':'IN','bangalore':'IN','mumbai':'IN',
    'singapore':'SG','israel':'IL','tel aviv':'IL',
    'canada':'CA','toronto':'CA','australia':'AU','sydney':'AU',
    'sweden':'SE','stockholm':'SE','netherlands':'NL','amsterdam':'NL',
    'switzerland':'CH','russia':'RU','brazil':'BR',
  };
  const lc = (text||'').toLowerCase();
  for(const [k,v] of Object.entries(map)){
    if(lc.includes(k)) return v;
  }
  return null;
}

function getLocForSignal(signal){
  const iso2 = matchCountry((signal.title||'')+' '+(signal.desc||''));
  const pool = iso2 ? LOCS.filter(l=>l.country===iso2) : [];
  const src  = pool.length ? pool : LOCS;
  const total = src.reduce((a,l)=>a+l.w,0);
  let r = Math.random()*total;
  for(const loc of src){
    r -= loc.w;
    if(r<=0) return { lat:loc.lat+(Math.random()-.5)*1.5, lon:loc.lon+(Math.random()-.5)*1.5, country:loc.country };
  }
  return { lat:src[0].lat, lon:src[0].lon, country:src[0].country };
}

function randomHub(){ return HUBS[Math.floor(Math.random()*HUBS.length)]; }

/* ── DATA COLLECTORS ─────────────────────────────────────────── */
async function fetchArxiv(){
  try {
    const p = new URLSearchParams({
      search_query:'cat:cs.AI OR cat:cs.LG OR cat:cs.CL OR cat:cs.CV OR cat:cs.CR OR cat:cs.SE',
      start:0, max_results:25, sortBy:'submittedDate', sortOrder:'descending',
    });
    const ctrl = new AbortController();
    const tid  = setTimeout(()=>ctrl.abort(),12000);
    const res  = await fetch(`https://export.arxiv.org/api/query?${p}`,{signal:ctrl.signal});
    clearTimeout(tid);
    const doc  = new DOMParser().parseFromString(await res.text(),'text/xml');
    return [...doc.querySelectorAll('entry')].map(e=>{
      const url  = e.querySelector('id')?.textContent?.trim()||'';
      const title= e.querySelector('title')?.textContent?.trim()||'';
      const desc = e.querySelector('summary')?.textContent?.trim()||'';
      if(!title||seenUrls.has(url)) return null;
      seenUrls.add(url);
      const loc  = getLocForSignal({title,desc});
      return { id:url, source:'arxiv', title, desc:desc.slice(0,180), url,
        published_at:e.querySelector('published')?.textContent||new Date().toISOString(),
        tags:detectTags(title+' '+desc), lat:loc.lat, lon:loc.lon, country:loc.country,
        score:Math.floor(Math.random()*30+65), meta:{} };
    }).filter(Boolean);
  } catch(e){ console.warn('arxiv:',e.message); return []; }
}

async function fetchSemantic(){
  try {
    const qs=['large language model','diffusion model','transformer','neural network reasoning'];
    const q = qs[Math.floor(Math.random()*qs.length)];
    const res = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(q)}&limit=12&fields=title,abstract,year,citationCount,url`,{headers:{Accept:'application/json'}});
    const json = await res.json();
    return (json.data||[]).map(p=>{
      const url = p.url||`https://semanticscholar.org/paper/${p.paperId}`;
      if(!p.title||seenUrls.has(url)) return null;
      seenUrls.add(url);
      const loc = getLocForSignal({title:p.title});
      return { id:url, source:'semantic', title:p.title, desc:(p.abstract||'').slice(0,180), url,
        published_at:new Date().toISOString(), tags:detectTags(p.title+' '+(p.abstract||'')),
        lat:loc.lat, lon:loc.lon, country:loc.country,
        score:Math.min(99,50+Math.floor((p.citationCount||0)/5)),
        meta:{citations:p.citationCount,year:p.year} };
    }).filter(Boolean);
  } catch(e){ console.warn('semantic:',e.message); return []; }
}

async function fetchGitHub(){
  try {
    const topics=['llm','machine-learning','ai','deep-learning','transformer','vector-database','rag','agent'];
    const t = topics[Math.floor(Math.random()*topics.length)];
    const since = new Date(Date.now()-7*86400000).toISOString().split('T')[0];
    const res = await fetch(`https://api.github.com/search/repositories?q=topic:${t}+created:>${since}&sort=stars&order=desc&per_page=20`,{headers:{Accept:'application/vnd.github+json'}});
    const json = await res.json();
    return (json.items||[]).map(r=>{
      if(seenUrls.has(r.html_url)) return null;
      seenUrls.add(r.html_url);
      const text = r.name+' '+(r.description||'');
      const loc  = getLocForSignal({title:text});
      return { id:r.html_url, source:'github', title:r.full_name, desc:r.description||'',
        url:r.html_url, published_at:r.created_at, tags:detectTags(text),
        lat:loc.lat, lon:loc.lon, country:loc.country,
        score:Math.min(99,40+Math.floor(Math.log10(1+r.stargazers_count)*20)),
        meta:{stars:r.stargazers_count,lang:r.language,forks:r.forks_count} };
    }).filter(Boolean);
  } catch(e){ console.warn('github:',e.message); return []; }
}

async function fetchHN(){
  try {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const ids = (await res.json()).slice(0,40);
    const results = await Promise.allSettled(ids.map(async id=>{
      const r2 = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const item = await r2.json();
      if(!item||item.type!=='story'||!item.url||seenUrls.has(item.url)) return null;
      const text = (item.title||'')+' '+(item.url||'');
      if(!/\b(ai|tech|code|software|model|data|cloud|security|crypto|startup|llm|gpu|open.?source)\b/i.test(text)) return null;
      seenUrls.add(item.url);
      const loc = getLocForSignal({title:text});
      return { id:String(item.id), source:'hn', title:item.title,
        desc:`${item.score||0} points · ${item.descendants||0} comments`,
        url:item.url, published_at:new Date(item.time*1000).toISOString(),
        tags:detectTags(text), lat:loc.lat, lon:loc.lon, country:loc.country,
        score:Math.min(99,30+Math.floor((item.score||0)/10)),
        meta:{points:item.score,comments:item.descendants} };
    }));
    return results.map(r=>r.status==='fulfilled'?r.value:null).filter(Boolean);
  } catch(e){ console.warn('hn:',e.message); return []; }
}

async function fetchHF(){
  try {
    const res = await fetch('https://huggingface.co/api/models?sort=downloads&direction=-1&limit=20&full=false');
    const json = await res.json();
    return (json||[]).map(m=>{
      const url = `https://huggingface.co/${m.modelId||m.id}`;
      if(seenUrls.has(url)) return null;
      seenUrls.add(url);
      const org  = (m.modelId||m.id||'').split('/')[0];
      const iso2 = HF_ORG_LOC[org]||null;
      const baseLoc = getLocForSignal({title:m.modelId||m.id});
      const loc = iso2?(LOCS.find(l=>l.country===iso2)||baseLoc):baseLoc;
      const tags = detectTags((m.modelId||'')+' '+(m.pipeline_tag||''));
      return { id:url, source:'huggingface', title:m.modelId||m.id,
        desc:`Pipeline: ${m.pipeline_tag||'unknown'} · ${fmtNum(m.downloads||0)} downloads`,
        url, published_at:m.lastModified||new Date().toISOString(), tags,
        lat:loc.lat, lon:loc.lon, country:iso2||loc.country||'US',
        score:Math.min(99,40+Math.floor(Math.log10(1+(m.downloads||0))*10)),
        meta:{downloads:m.downloads,likes:m.likes,pipeline:m.pipeline_tag} };
    }).filter(Boolean);
  } catch(e){ console.warn('hf:',e.message); return []; }
}

async function fetchReddit(){
  try {
    const subs=['MachineLearning','artificial','programming','technology','cybersecurity'];
    const sub = subs[Math.floor(Math.random()*subs.length)];
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.reddit.com/r/${sub}/hot.rss`)}&count=12`);
    const json = await res.json();
    return (json.items||[]).map(item=>{
      if(seenUrls.has(item.link)) return null;
      seenUrls.add(item.link);
      const text = item.title+' '+(item.description||'');
      const loc  = getLocForSignal({title:item.title});
      return { id:item.guid||item.link, source:'reddit', title:item.title,
        desc:(item.description||'').replace(/<[^>]+>/g,'').slice(0,180),
        url:item.link, published_at:item.pubDate||new Date().toISOString(),
        tags:detectTags(text), lat:loc.lat, lon:loc.lon, country:loc.country,
        score:Math.floor(Math.random()*35+35), meta:{subreddit:sub} };
    }).filter(Boolean);
  } catch(e){ console.warn('reddit:',e.message); return []; }
}

async function fetchDevTo(){
  try {
    const tagList=['ai','machinelearning','llm','security','devops','opensource'];
    const t = tagList[Math.floor(Math.random()*tagList.length)];
    const res = await fetch(`https://dev.to/api/articles?tag=${t}&per_page=15&state=fresh`);
    const json = await res.json();
    return (json||[]).map(a=>{
      const url = a.url||a.canonical_url;
      if(!url||seenUrls.has(url)) return null;
      seenUrls.add(url);
      const text = a.title+' '+(a.description||'');
      const loc  = getLocForSignal({title:text});
      return { id:String(a.id), source:'devto', title:a.title, desc:a.description||'',
        url, published_at:a.published_at||new Date().toISOString(),
        tags:detectTags(text), lat:loc.lat, lon:loc.lon, country:loc.country,
        score:Math.min(99,30+Math.floor((a.positive_reactions_count||0)/2)),
        meta:{reactions:a.positive_reactions_count,comments:a.comments_count} };
    }).filter(Boolean);
  } catch(e){ console.warn('devto:',e.message); return []; }
}

async function fetchNews(){
  try {
    const feeds=['https://techcrunch.com/feed/','https://venturebeat.com/feed/','https://www.theverge.com/rss/index.xml'];
    const feed = feeds[Math.floor(Math.random()*feeds.length)];
    const res  = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}&count=20`);
    const json = await res.json();
    return (json.items||[]).map(item=>{
      if(seenUrls.has(item.link)) return null;
      const text = item.title+' '+(item.description||'');
      if(!/\b(ai|tech|startup|fund|million|billion|cloud|model|security|crypto|quantum|chip)\b/i.test(text)) return null;
      seenUrls.add(item.link);
      const loc = getLocForSignal({title:text});
      const amt = parseFunding(text);
      return { id:item.guid||item.link, source:'news', title:item.title,
        desc:(item.description||'').replace(/<[^>]+>/g,'').slice(0,180),
        url:item.link, published_at:item.pubDate||new Date().toISOString(),
        tags:detectTags(text), lat:loc.lat, lon:loc.lon, country:loc.country,
        score:isFunding(text)?Math.floor(Math.random()*20+75):Math.floor(Math.random()*25+50),
        meta:{funding:amt} };
    }).filter(Boolean);
  } catch(e){ console.warn('news:',e.message); return []; }
}

/* ── LOAD ALL ─────────────────────────────────────────────────── */
/* ── INSTANT RENDER ──────────────────────────────────────────── */
function normalizeFallback(sig){
  return { ...sig };
}

function loadFallback(){
  allSignals = FALLBACK_SIGNALS.map(normalizeFallback);
  FALLBACK_SIGNALS.forEach(s=>seenUrls.add(s.id));
  renderGlobe();
  renderFeed();
  updateHud();
  setHudStatus('NOMINAL', true);
  logEvent({ source:'system', title:'FALLBACK SIGNALS LOADED', published_at:new Date().toISOString() });
}

function mergeSignals(newSigs, source){
  const added = newSigs.filter(s=>!seenUrls.has(s.id));
  added.forEach(s=>seenUrls.add(s.id));
  // Remove fallback signals for this source when real data arrives
  allSignals = allSignals.filter(s=>!(s.source===source&&s.id.startsWith('fb-')));
  allSignals = [...added, ...allSignals].slice(0, 500);
  renderGlobe();
  renderFeed();
  updateHud();
  added.slice(0,4).forEach((s,i)=>setTimeout(()=>{ pulseNew(s); logEvent(s); }, i*250));
}

function updateSourceStatus(src, state){
  sourceStatus[src] = state;
  renderSourceStatus();
}

function renderSourceStatus(){
  const el = document.getElementById('hud-sources');
  if(!el) return;
  const online = Object.values(sourceStatus).filter(v=>v==='ok').length;
  el.textContent = online;
  // Update STATUS pill
  const anyError = Object.values(sourceStatus).some(v=>v==='error');
  const anyLoading = Object.values(sourceStatus).some(v=>v==='loading');
  if(anyError && !anyLoading) setHudStatus('DEGRADED', false);
  else if(anyLoading)         setHudStatus('UPDATING', false);
  else                        setHudStatus('NOMINAL', true);
}

async function startBackgroundFetch(){
  const FETCH_PLAN = [
    { key:'arxiv',       fn:fetchArxiv,    delay:500  },
    { key:'github',      fn:fetchGitHub,   delay:1000 },
    { key:'hn',          fn:fetchHN,       delay:1500 },
    { key:'devto',       fn:fetchDevTo,    delay:2000 },
    { key:'huggingface', fn:fetchHF,       delay:2500 },
    { key:'news',        fn:fetchNews,     delay:3000 },
    { key:'semantic',    fn:fetchSemantic, delay:3500 },
    { key:'reddit',      fn:fetchReddit,   delay:4000 },
  ];

  // Mark all as loading
  FETCH_PLAN.forEach(({key})=>{ sourceStatus[key]='loading'; });
  renderSourceStatus();

  FETCH_PLAN.forEach(({key,fn,delay})=>{
    setTimeout(async ()=>{
      try {
        const sigs = await fn();
        mergeSignals(sigs, key);
        updateSourceStatus(key, 'ok');
        document.getElementById('hud-last').textContent = utcTime();
      } catch(e){
        updateSourceStatus(key, 'error');
        console.warn(key+':', e.message);
      }
      // On first complete fetch of all sources, trigger DC weather
      const done = Object.values(sourceStatus).filter(v=>v!=='loading').length;
      if(done === FETCH_PLAN.length && isFirstLoad){
        isFirstLoad = false;
        fetchAllDCWeather();
      }
    }, delay);
  });

  nextRefreshSec = 30;
}

/* ── HUD HELPERS ─────────────────────────────────────────────── */
function setHudStatus(msg, nominal){
  const el = document.getElementById('hud-status');
  if(!el) return;
  el.textContent = msg;
  el.style.color = nominal ? 'var(--green)' : (msg==='DEGRADED'?'var(--red)':'var(--amber)');
}

function updateHud(){
  const sigs = filteredSignals();
  const el1  = document.getElementById('hud-signals');
  const el2  = document.getElementById('hud-sources');
  const el3  = document.getElementById('feed-ct');
  if(el1) el1.textContent = allSignals.length;
  if(el2) el2.textContent = new Set(allSignals.map(s=>s.source)).size;
  if(el3) el3.textContent = sigs.length;
}

/* ── UTC CLOCK ───────────────────────────────────────────────── */
function startClock(){
  const el = document.getElementById('hud-utc');
  setInterval(()=>{ if(el) el.textContent = utcTime(); }, 1000);
}

/* ── GLOBE INIT ──────────────────────────────────────────────── */
function initGlobe(){
  const el = document.getElementById('globe');
  if(!el||typeof Globe==='undefined') return;

  globeInstance = Globe()(el)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundColor('rgba(0,0,0,0)')
    .showAtmosphere(true)
    .atmosphereColor('#00ffcc')
    .atmosphereAltitude(0.10)
    .pointsData([])
    .pointLat('lat').pointLng('lon')
    .pointAltitude(0.01).pointRadius('radius').pointColor('color').pointsMerge(false)
    .arcsData([])
    .arcStartLat('srcLat').arcStartLng('srcLon')
    .arcEndLat('dstLat').arcEndLng('dstLon')
    .arcColor('color')
    .arcAltitudeAutoScale(0.35).arcStroke(0.5)
    .arcDashLength(0.35).arcDashGap(0.2).arcDashAnimateTime(2000)
    .hexBinPointsData([])
    .hexBinPointLat('lat').hexBinPointLng('lon')
    .hexBinResolution(3)
    .hexTopColor(d=>`rgba(0,255,204,${Math.min(1,0.08+d.points.length*0.07)})`)
    .hexSideColor(d=>`rgba(0,255,204,${Math.min(1,0.04+d.points.length*0.03)})`)
    .hexAltitude(d=>Math.min(0.07,d.points.length*0.004))
    .ringsData([])
    .ringLat('lat').ringLng('lon')
    .ringColor(()=>t=>`rgba(0,255,204,${(1-t)*0.8})`)
    .ringMaxRadius(5).ringPropagationSpeed(3).ringRepeatPeriod(1400)
    .labelsData([])
    .labelLat('lat').labelLng('lon').labelText('name')
    .labelSize(0.45).labelDotRadius(0.3).labelColor(d=>d.color)
    .labelResolution(2).labelAltitude(0.005)
    .onLabelClick(co=>openCompanyCard(co))
    .onPointClick(pt=>{ if(pt.__signal) openSignalCard(pt.__signal); })
    .onGlobeClick(()=>{ autoRotate=true; });

  globeInstance.pointOfView({lat:20,lng:0,altitude:2.2});

  // Auto-rotate
  (function tick(){
    requestAnimationFrame(tick);
    if(autoRotate){
      rotatePhi += 0.0008;
      const lng = (rotatePhi*(180/Math.PI))%360;
      globeInstance.pointOfView({lat:20,lng:lng>180?lng-360:lng,altitude:2.2});
    }
  })();

  el.addEventListener('mousedown',()=>{ autoRotate=false; });

  // Mouse position → HUD lat/lng
  el.addEventListener('mousemove', e=>{
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX-rect.left)/rect.width-0.5)*2;
    const y = ((e.clientY-rect.top)/rect.height-0.5)*2;
    // Rough estimate
    const lat = (-y*90).toFixed(1);
    const lng = (x*180).toFixed(1);
    const hudLat = document.getElementById('hud-lat');
    const hudLng = document.getElementById('hud-lng');
    if(hudLat) hudLat.textContent = `${lat}°`;
    if(hudLng) hudLng.textContent = `${lng}°`;
  });

  loadCountryPolygons();
}

async function loadCountryPolygons(){
  try {
    const res = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
    const geo = await res.json();

    const capColor = f => {
      if(f === hoveredPolygon) return 'rgba(0,255,204,0.15)';
      const iso2 = f.properties?.ISO_A2;
      const ct   = iso2 ? COUNTRY_TECH[iso2] : null;
      if(!ct) return 'rgba(0,255,204,0.025)';
      return `rgba(0,255,204,${0.04 + (ct.score/100)*0.08})`;
    };
    const strokeColor = f => f === hoveredPolygon ? '#00ffcc' : 'rgba(0,255,204,0.35)';
    const altitude    = f => f === hoveredPolygon ? 0.007 : 0.001;

    globeInstance
      .polygonsData(geo.features)
      .polygonCapColor(capColor)
      .polygonSideColor(() => 'rgba(0,255,204,0.04)')
      .polygonStrokeColor(strokeColor)
      .polygonAltitude(altitude)
      .onPolygonClick(f => {
        const iso2 = f.properties?.ISO_A2;
        if(iso2 && iso2 !== '-99') openCountryBrief(iso2);
      })
      .onPolygonHover(f => {
        hoveredPolygon = f || null;
        globeInstance.polygonCapColor(capColor);
        globeInstance.polygonStrokeColor(strokeColor);
        globeInstance.polygonAltitude(altitude);
      });
  } catch(e){ console.warn('polygons:',e.message); }
}

/* ── RENDER GLOBE ────────────────────────────────────────────── */
function renderGlobe(){
  if(!globeInstance) return;
  const sigs = filteredSignals();

  if(LAYERS.signals){
    globeInstance.pointsData(sigs.map(s=>({
      lat:s.lat, lon:s.lon,
      radius:0.2+(s.score/100)*0.45,
      color:SOURCES[s.source]?.color||'#ffffff',
      __signal:s,
    })));
  } else {
    globeInstance.pointsData([]);
  }

  if(LAYERS.density){
    globeInstance.hexBinPointsData(sigs.map(s=>({lat:s.lat,lon:s.lon})));
  } else {
    globeInstance.hexBinPointsData([]);
  }

  if(LAYERS.arcs){
    const topSigs = [...sigs].sort((a,b)=>b.score-a.score).slice(0,12);
    const arcs = topSigs.map(s=>{
      const hub = HUBS.find(h=>h.country===s.country)||randomHub();
      const isFund = isFunding(s.title+(s.desc||''));
      return {
        srcLat:s.lat, srcLon:s.lon, dstLat:hub.lat, dstLon:hub.lon,
        color:isFund?['#ffaa0099','#ffaa0033']:[(SOURCES[s.source]?.color||'#ffffff')+'77','#00ffcc22'],
      };
    });
    globeInstance.arcsData(arcs);
  } else {
    globeInstance.arcsData([]);
  }

  if(LAYERS.companies){
    globeInstance.labelsData(AI_COMPANIES);
  } else {
    globeInstance.labelsData([]);
  }

  if(LAYERS.papers){
    const papers = sigs.filter(s=>s.source==='arxiv'||s.source==='semantic');
    globeInstance.hexBinPointsData(papers.map(s=>({lat:s.lat,lon:s.lon})));
  }

  renderDCLayer();
}

/* ── DATACENTER LAYER ────────────────────────────────────────── */
async function fetchAllDCWeather(){
  await Promise.allSettled(DATA_CENTERS.map(async dc => {
    try {
      const p = new URLSearchParams({
        latitude: dc.lat, longitude: dc.lng,
        current: 'temperature_2m,wind_speed_10m,shortwave_radiation,relative_humidity_2m',
        wind_speed_unit: 'ms',
      });
      const res  = await fetch(`https://api.open-meteo.com/v1/forecast?${p}`);
      const json = await res.json();
      const cur  = json.current;
      const solarScore   = Math.min(100, (cur.shortwave_radiation / 800) * 100);
      const windScore    = Math.min(100, (cur.wind_speed_10m / 15) * 100);
      const coolingScore = Math.max(0, (25 - cur.temperature_2m) / 25 * 100);
      const greenScore   = Math.round((solarScore + windScore + coolingScore) / 3);
      const pueEstimate  = (1.2 + (cur.temperature_2m / 100 * 0.3)).toFixed(2);
      dcWeatherCache[dc.name] = {
        temp:cur.temperature_2m, wind:cur.wind_speed_10m,
        solar:cur.shortwave_radiation, humidity:cur.relative_humidity_2m,
        greenScore, pueEstimate, solarScore, windScore, coolingScore,
      };
    } catch{}
  }));
  if(LAYERS.datacenters || LAYERS.energyEfficiency) renderDCLayer();
}

function renderDCLayer(){
  if(!globeInstance) return;
  if(!LAYERS.datacenters && !LAYERS.energyEfficiency){
    globeInstance.htmlElementsData([]);
    return;
  }
  const elements = DATA_CENTERS.map(dc => {
    const w     = dcWeatherCache[dc.name];
    const score = w ? w.greenScore : 50;
    const color = LAYERS.energyEfficiency ? greenScoreColor(score) : (DC_COMPANY_COLORS[dc.company]||'#ffffff');
    const size  = 8 + (dc.mw / 500) * 14;
    return { ...dc, __color:color, __score:score, __size:size };
  });
  globeInstance.htmlElementsData(elements)
    .htmlElement(d => {
      const el = document.createElement('div');
      el.style.cssText = [
        `width:${d.__size}px`, `height:${d.__size}px`,
        `background:${d.__color}22`,
        `border:1.5px solid ${d.__color}`,
        `border-radius:3px`,
        `transform:rotate(45deg)`,
        `cursor:pointer`,
        `box-shadow:0 0 ${d.__size/2}px ${d.__color}88`,
        `transition:all .15s`,
      ].join(';');
      el.addEventListener('mouseenter', () => showDCTooltip(d));
      el.addEventListener('mouseleave', hideDCTooltip);
      el.addEventListener('click',      () => openDCCard(d));
      return el;
    })
    .htmlAltitude(0.018);
}

function showDCTooltip(dc){
  const w  = dcWeatherCache[dc.name];
  const tt = document.getElementById('dc-tooltip');
  if(!tt) return;
  const gcol = w ? greenScoreColor(w.greenScore) : 'var(--dim)';
  tt.innerHTML = `
    <div class="dct-name">⬡ ${esc(dc.name)}</div>
    <div class="dct-company">${esc(dc.company)} · ${dc.mw} MW</div>
    <div class="dct-div"></div>
    ${w ? `
    <div class="dct-row"><span class="dct-lbl">GREEN SCORE</span><span class="dct-val" style="color:${gcol}">${w.greenScore}/100</span></div>
    <div class="dct-row"><span class="dct-lbl">PUE EST</span><span class="dct-val">${w.pueEstimate}</span></div>
    <div class="dct-row"><span class="dct-lbl">TEMP</span><span class="dct-val">${w.temp}°C</span></div>
    <div class="dct-row"><span class="dct-lbl">WIND</span><span class="dct-val">${w.wind} m/s</span></div>
    <div class="dct-row"><span class="dct-lbl">SOLAR</span><span class="dct-val">${w.solar} W/m²</span></div>
    <div class="dct-row"><span class="dct-lbl">HUMIDITY</span><span class="dct-val">${w.humidity}%</span></div>
    ` : '<div class="dct-lbl" style="padding:4px 0">FETCHING WEATHER…</div>'}
  `;
  tt.classList.remove('hidden');
  if(dcTooltipMoveHandler) document.removeEventListener('mousemove', dcTooltipMoveHandler);
  dcTooltipMoveHandler = e => {
    tt.style.left = Math.min(e.clientX + 18, window.innerWidth - 200) + 'px';
    tt.style.top  = Math.min(e.clientY - 10, window.innerHeight - 220) + 'px';
  };
  document.addEventListener('mousemove', dcTooltipMoveHandler);
}

function hideDCTooltip(){
  const tt = document.getElementById('dc-tooltip');
  if(tt) tt.classList.add('hidden');
  if(dcTooltipMoveHandler){ document.removeEventListener('mousemove', dcTooltipMoveHandler); dcTooltipMoveHandler=null; }
}

function openDCCard(dc){
  const w   = dcWeatherCache[dc.name];
  const id  = `card-${++cardIdCounter}`;
  const col = DC_COMPANY_COLORS[dc.company] || '#00ffcc';
  const gcol = w ? greenScoreColor(w.greenScore) : 'var(--dim)';

  const renewableDesc = () => {
    if(!w) return 'Weather data loading…';
    const parts = [];
    if(w.solar > 400) parts.push('high solar irradiance');
    else if(w.solar > 150) parts.push('moderate solar potential');
    else parts.push('low solar availability');
    if(w.wind > 8) parts.push('strong wind conditions');
    else if(w.wind > 3) parts.push('moderate wind');
    else parts.push('minimal wind energy');
    if(w.temp < 12) parts.push('excellent natural cooling');
    else if(w.temp < 22) parts.push('good ambient cooling');
    else parts.push('active cooling required');
    return `Current renewable conditions: ${parts.join(' · ')}.`;
  };

  const card = document.createElement('div');
  card.className = 'intel-card';
  card.id = id;
  card.style.cssText = `left:${120+(cardIdCounter%3)*22}px;top:${80+(cardIdCounter%2)*18}px;width:320px;`;
  card.innerHTML = `
    <div class="card-header">
      <span class="card-src" style="color:${col};border-color:${col}44">⬡ ${esc(dc.company)}</span>
      <span class="card-cat">DATACENTER</span>
      <button class="card-close" onclick="closeCard('${id}')">✕</button>
    </div>
    <div class="card-title">${esc(dc.name)}</div>
    <div class="card-meta">
      <div class="card-meta-row"><span class="card-meta-lbl">CAPACITY</span><span class="card-meta-val">${dc.mw} MW</span></div>
      <div class="card-meta-row"><span class="card-meta-lbl">COORDS</span><span class="card-meta-val">${dc.lat.toFixed(2)}°, ${dc.lng.toFixed(2)}°</span></div>
      ${w ? `
      <div class="card-meta-row"><span class="card-meta-lbl">GREEN SCORE</span><span class="card-meta-val" style="color:${gcol}">${w.greenScore}/100</span></div>
      <div class="card-meta-row"><span class="card-meta-lbl">PUE EST</span><span class="card-meta-val">${w.pueEstimate}</span></div>
      <div class="card-meta-row"><span class="card-meta-lbl">TEMP</span><span class="card-meta-val">${w.temp}°C</span></div>
      <div class="card-meta-row"><span class="card-meta-lbl">WIND</span><span class="card-meta-val">${w.wind} m/s</span></div>
      <div class="card-meta-row"><span class="card-meta-lbl">SOLAR</span><span class="card-meta-val">${w.solar} W/m²</span></div>
      <div class="card-meta-row"><span class="card-meta-lbl">HUMIDITY</span><span class="card-meta-val">${w.humidity}%</span></div>
      ` : ''}
    </div>
    ${w ? `
    <div class="dc-bars">
      <div class="dc-bar-row">
        <span class="dc-bar-lbl">SOLAR</span>
        <div class="dc-bar-track"><div class="dc-bar-fill" style="width:${Math.round(w.solarScore)}%;background:#ffaa00"></div></div>
        <span class="dc-bar-pct">${Math.round(w.solarScore)}</span>
      </div>
      <div class="dc-bar-row">
        <span class="dc-bar-lbl">WIND</span>
        <div class="dc-bar-track"><div class="dc-bar-fill" style="width:${Math.round(w.windScore)}%;background:#00ffcc"></div></div>
        <span class="dc-bar-pct">${Math.round(w.windScore)}</span>
      </div>
      <div class="dc-bar-row">
        <span class="dc-bar-lbl">COOLING</span>
        <div class="dc-bar-track"><div class="dc-bar-fill" style="width:${Math.round(w.coolingScore)}%;background:#4285f4"></div></div>
        <span class="dc-bar-pct">${Math.round(w.coolingScore)}</span>
      </div>
    </div>
    <div class="dc-desc">${esc(renewableDesc())}</div>
    ` : ''}
    <div class="card-footer"><span style="font-size:8px;color:var(--dim);opacity:.5">REAL-TIME DATA // OPEN-METEO API</span></div>
  `;
  makeDraggable(card);
  const layer = document.getElementById('cards-layer');
  if(layer) layer.appendChild(card);
  if(globeInstance){
    globeInstance.pointOfView({lat:dc.lat,lng:dc.lng,altitude:1.5},700);
    autoRotate = false;
  }
}

/* ── FILTER ──────────────────────────────────────────────────── */
const TIME_MS = {'1h':3600000,'6h':21600000,'24h':86400000,'7d':604800000};
function filteredSignals(){
  const now    = Date.now();
  const maxAge = (TIME_MS[activeTime]||TIME_MS['24h'])*timelinePos;
  return allSignals.filter(s=>{
    if(activeSource!=='all'&&s.source!==activeSource) return false;
    if(activeTag!=='all'&&!s.tags.includes(activeTag)) return false;
    return (now - new Date(s.published_at).getTime()) <= (TIME_MS[activeTime]||TIME_MS['24h']);
  });
}

/* ── RENDER FEED ──────────────────────────────────────────────── */
function renderFeed(){
  const el = document.getElementById('feed-list');
  if(!el) return;
  const sigs = filteredSignals().sort((a,b)=>new Date(b.published_at)-new Date(a.published_at));
  const el2 = document.getElementById('feed-ct');
  if(el2) el2.textContent = sigs.length;
  if(!sigs.length){ el.innerHTML='<div class="feed-empty">NO SIGNALS IN WINDOW</div>'; return; }
  el.innerHTML = sigs.slice(0,60).map(s=>`
    <div class="feed-item" onclick="openSignalCard(allSignals.find(x=>x.id===${JSON.stringify(s.id)}))">
      <div class="fi-row1">
        <span class="fi-src" style="color:${SOURCES[s.source]?.color||'#fff'}">${SOURCES[s.source]?.icon||'●'} ${esc(SOURCES[s.source]?.label||s.source)}</span>
        <span class="fi-score${s.score>=80?' hot':''}">${s.score}</span>
      </div>
      <div class="fi-title">${esc(s.title)}</div>
      <div class="fi-row2">
        ${s.tags.map(t=>`<span class="fi-tag">${esc(t)}</span>`).join('')}
        <span class="fi-time">${timeAgo(s.published_at)}</span>
        ${isFunding(s.title+(s.desc||''))?'<span class="fi-fund">💰</span>':''}
      </div>
    </div>`
  ).join('');
  updateHud();
}

/* ── INTEL CARDS (floating on globe) ────────────────────────── */
function openSignalCard(signal){
  if(!signal) return;
  const id    = `card-${++cardIdCounter}`;
  const src   = SOURCES[signal.source]||{};
  const fund  = parseFunding(signal.title+(signal.desc||''));
  const score = signal.score;
  const cls   = score>=80?'card-score-high':score>=60?'card-score-med':'';
  const x     = 80 + (cardIdCounter%4)*25;
  const y     = 80 + (cardIdCounter%3)*20;

  const city = (() => {
    const hub = HUBS.find(h=>h.country===signal.country);
    return hub ? `${hub.city}, ${signal.country}` : (signal.country||'UNKNOWN');
  })();

  const card = document.createElement('div');
  card.className = 'intel-card';
  card.id = id;
  card.style.cssText = `left:${x}px;top:${y}px;`;
  card.innerHTML = `
    <div class="card-header">
      <span class="card-src" style="color:${src.color||'#fff'};border-color:${src.color||'#fff'}44">${src.icon||'●'} ${esc(src.label||signal.source)}</span>
      <span class="card-cat">${esc(signal.tags[0]||'')}</span>
      <span class="card-time">${timeAgo(signal.published_at)} UTC</span>
      <button class="card-close" onclick="closeCard('${id}')">✕</button>
    </div>
    <div class="card-title">${esc(signal.title)}</div>
    ${signal.desc?`<div class="card-desc">${esc(signal.desc.slice(0,140))}…</div>`:''}
    <div class="card-meta">
      <div class="card-meta-row"><span class="card-meta-lbl">LOCATION</span><span class="card-meta-val">${esc(city)}</span></div>
      <div class="card-meta-row"><span class="card-meta-lbl">SCORE</span><span class="card-meta-val ${cls}">${score}/100</span></div>
      ${fund?`<div class="card-meta-row"><span class="card-meta-lbl">FUNDING</span><span class="card-meta-val" style="color:var(--green)">$${fund>=1000?(fund/1000).toFixed(1)+'B':fund+'M'}</span></div>`:''}
    </div>
    <div class="card-tags">${signal.tags.map(t=>`<span class="card-tag">${esc(t)}</span>`).join('')}</div>
    <div class="card-footer"><a class="card-link" href="${esc(signal.url)}" target="_blank" rel="noopener">→ OPEN SOURCE</a></div>
  `;

  // Make draggable
  makeDraggable(card);

  const layer = document.getElementById('cards-layer');
  if(layer) layer.appendChild(card);

  // Zoom globe
  if(globeInstance){
    globeInstance.pointOfView({lat:signal.lat,lng:signal.lon,altitude:1.6},700);
    autoRotate = false;
  }
}

function openCompanyCard(company){
  const id  = `card-${++cardIdCounter}`;
  const sigs = allSignals.filter(s=>
    s.title.toLowerCase().includes(company.name.toLowerCase())||
    (company.github&&s.url&&s.url.toLowerCase().includes(company.github.toLowerCase()))||
    (company.hf&&s.url&&s.url.toLowerCase().includes(company.hf.toLowerCase()))
  ).slice(0,3);

  const card = document.createElement('div');
  card.className='intel-card';
  card.id=id;
  card.style.cssText=`left:${100+cardIdCounter%3*20}px;top:${100+cardIdCounter%2*15}px;`;
  card.innerHTML=`
    <div class="card-header">
      <span class="card-src" style="color:${company.color};border-color:${company.color}44">⬡ COMPANY</span>
      <span class="card-time">INTEL</span>
      <button class="card-close" onclick="closeCard('${id}')">✕</button>
    </div>
    <div class="card-title">${esc(company.name)}</div>
    <div class="card-meta">
      ${company.github?`<div class="card-meta-row"><span class="card-meta-lbl">GITHUB</span><span class="card-meta-val">${esc(company.github)}</span></div>`:''}
      ${company.hf?`<div class="card-meta-row"><span class="card-meta-lbl">HF</span><span class="card-meta-val">${esc(company.hf)}</span></div>`:''}
    </div>
    ${sigs.length?`<div class="card-tags">${sigs.map(s=>`<span class="card-tag" style="cursor:pointer" onclick="openSignalCard(allSignals.find(x=>x.id===${JSON.stringify(s.id)}))">${esc(s.title.slice(0,40))}…</span>`).join('')}</div>`:''}
    <div class="card-footer">
      ${company.github?`<a class="card-link" href="https://github.com/${company.github}" target="_blank" rel="noopener">→ GITHUB</a>`:''}
    </div>
  `;
  makeDraggable(card);
  const layer=document.getElementById('cards-layer');
  if(layer) layer.appendChild(card);
  if(globeInstance){
    globeInstance.pointOfView({lat:company.lat,lng:company.lon,altitude:1.5},700);
    autoRotate=false;
  }
}

function closeCard(id){
  const el = document.getElementById(id);
  if(el) el.remove();
}

function makeDraggable(el){
  let startX,startY,origX,origY,dragging=false;
  const hdr = el.querySelector('.card-header');
  if(!hdr) return;
  hdr.addEventListener('mousedown',e=>{
    dragging=true;
    startX=e.clientX; startY=e.clientY;
    const s=el.style;
    origX=parseInt(s.left)||0; origY=parseInt(s.top)||0;
    e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!dragging) return;
    el.style.left=(origX+e.clientX-startX)+'px';
    el.style.top =(origY+e.clientY-startY)+'px';
  });
  document.addEventListener('mouseup',()=>{ dragging=false; });
}

/* ── COUNTRY BRIEF ───────────────────────────────────────────── */
function openCountryBrief(iso2){
  const brief = document.getElementById('country-brief');
  if(!brief) return;
  const ct   = COUNTRY_TECH[iso2];
  const names = {
    US:'United States',GB:'United Kingdom',CN:'China',DE:'Germany',
    JP:'Japan',KR:'South Korea',IN:'India',FR:'France',SG:'Singapore',
    IL:'Israel',CA:'Canada',SE:'Sweden',NL:'Netherlands',AU:'Australia',
    BR:'Brazil',CH:'Switzerland',RU:'Russia',ZA:'South Africa',
  };
  const name     = names[iso2]||iso2;
  const sigs     = allSignals.filter(s=>s.country===iso2).sort((a,b)=>b.score-a.score);
  const density  = sigs.length>20?'HIGH':sigs.length>8?'MED':'LOW';
  const tagCounts= {};
  sigs.forEach(s=>s.tags.forEach(t=>{ tagCounts[t]=(tagCounts[t]||0)+1; }));
  const maxTag   = Math.max(...Object.values(tagCounts),1);

  document.getElementById('brief-iso').textContent   = iso2;
  document.getElementById('brief-name').textContent  = name;
  document.getElementById('brief-score').textContent = ct?`${ct.score}/100`:'—';
  const densEl = document.getElementById('brief-density');
  densEl.textContent = density;
  densEl.className   = `bs-density ${density}`;
  document.getElementById('brief-sig-count').textContent = `(${sigs.length})`;

  document.getElementById('brief-entities').innerHTML = ct
    ? ct.companies.map(c=>`<span class="brief-entity">${esc(c)}</span>`).join('')
    : '<span style="color:var(--dim);font-size:8px">NO DATA</span>';

  const vectorOrder = ct?ct.trends:Object.keys(tagCounts).slice(0,4);
  document.getElementById('brief-vectors').innerHTML = vectorOrder.map(t=>{
    const cnt  = tagCounts[t]||0;
    const pct  = Math.round((cnt/maxTag)*100)||Math.floor(Math.random()*60+20);
    const col  = t==='Security'?'var(--red)':t==='AI'||t==='AI/ML'?'var(--cyan)':'var(--amber)';
    return `<div class="bv-row">
      <span class="bv-arrow">▸</span>
      <span class="bv-label">${esc(t)}</span>
      <div class="bv-bar"><div class="bv-fill" style="width:${pct}%;background:${col}"></div></div>
      <span class="bv-pct">${pct}%</span>
    </div>`;
  }).join('');

  document.getElementById('brief-signals').innerHTML = sigs.slice(0,5).map(s=>`
    <div class="brief-sig-item" onclick="openSignalCard(allSignals.find(x=>x.id===${JSON.stringify(s.id)}))">
      <div class="bsi-src">${SOURCES[s.source]?.icon||'●'} ${esc(SOURCES[s.source]?.label||s.source)} · ${timeAgo(s.published_at)}</div>
      <div class="bsi-title">${esc(s.title.slice(0,70))}${s.title.length>70?'…':''}</div>
    </div>`
  ).join('') || '<div style="font-size:9px;color:var(--dim);padding:6px 0">NO SIGNALS YET</div>';

  brief.classList.remove('hidden');

  const ctr = COUNTRY_CENTROIDS[iso2];
  if(ctr&&globeInstance){
    globeInstance.pointOfView({lat:ctr[0],lng:ctr[1],altitude:2.0},800);
    autoRotate=false;
  }
}

function closeCountryBrief(){
  const brief = document.getElementById('country-brief');
  if(brief) brief.classList.add('hidden');
}

/* ── EVENT LOG ───────────────────────────────────────────────── */
function logEvent(signal){
  const el = document.getElementById('elog-lines');
  if(!el) return;
  const src   = SOURCES[signal.source]||{};
  const isFund = isFunding(signal.title+(signal.desc||''));
  const line  = document.createElement('div');
  line.className = `elog-line${isFund?' elog-fund':''}`;
  const t = utcTime();
  const evt = isFund?'FUNDING':'NEW SIGNAL';
  line.innerHTML = `<span class="elog-time">${t}</span> <span class="elog-evt">${evt}</span> // <span class="elog-src">${esc(src.label||signal.source)}</span> // <span class="elog-country">${signal.country||'??'}</span>`;
  el.insertBefore(line,el.firstChild);
  // Keep max 8
  while(el.children.length > 8) el.removeChild(el.lastChild);
}

/* ── NEW SIGNAL PULSE ────────────────────────────────────────── */
function pulseNew(signal){
  if(!globeInstance) return;
  const ring = {lat:signal.lat,lon:signal.lon};
  globeInstance.ringsData([...globeInstance.ringsData(),ring]);
  setTimeout(()=>{
    globeInstance.ringsData(globeInstance.ringsData().filter(r=>!(r.lat===ring.lat&&r.lon===ring.lon)));
  },4200);
}

/* ── TIMELINE ────────────────────────────────────────────────── */
let tlDragging = false;
function initTimeline(){
  const track = document.getElementById('tl-track');
  const thumb = document.getElementById('tl-thumb');
  const fill  = document.getElementById('tl-fill');
  if(!track||!thumb) return;

  setTimeline(1.0);

  track.addEventListener('click',e=>{
    const rect = track.getBoundingClientRect();
    const pos  = Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
    setTimeline(pos);
  });

  thumb.addEventListener('mousedown',e=>{
    tlDragging=true; e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!tlDragging) return;
    const rect = track.getBoundingClientRect();
    const pos  = Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
    setTimeline(pos);
  });
  document.addEventListener('mouseup',()=>{ tlDragging=false; });
}

function setTimeline(pos){
  timelinePos = pos;
  const fill  = document.getElementById('tl-fill');
  const thumb = document.getElementById('tl-thumb');
  if(fill)  fill.style.width  = (pos*100)+'%';
  if(thumb) thumb.style.left  = (pos*100)+'%';
  const windowEl = document.getElementById('hud-window');
  if(windowEl) windowEl.textContent = pos>=0.99?activeTime.toUpperCase()+' (NOW)':activeTime.toUpperCase()+` (${Math.round(pos*100)}%)`;
  renderGlobe();
  renderFeed();
}

let playInterval = null;
function toggleTimelinePlay(){
  const btn = document.getElementById('tl-play');
  if(isPlaying){
    clearInterval(playInterval);
    isPlaying=false;
    if(btn){ btn.textContent='▶'; btn.classList.remove('playing'); }
  } else {
    isPlaying=true;
    if(btn){ btn.textContent='⏸'; btn.classList.add('playing'); }
    setTimeline(0);
    playInterval = setInterval(()=>{
      const next = timelinePos + 0.01;
      if(next>=1){ setTimeline(1); toggleTimelinePlay(); return; }
      setTimeline(next);
    },100);
  }
}

/* ── FEED TOGGLE ─────────────────────────────────────────────── */
function toggleFeed(){
  feedCollapsed = !feedCollapsed;
  const panel = document.getElementById('feed-panel');
  const btn   = document.getElementById('feed-toggle');
  if(panel) panel.classList.toggle('collapsed',feedCollapsed);
  if(btn)   btn.textContent = feedCollapsed?'▶':'◀';
}

/* ── LAYER TOGGLES ───────────────────────────────────────────── */
function bindLayers(){
  document.querySelectorAll('.layer-cb').forEach(cb=>{
    const layer = cb.dataset.layer;
    const led   = cb.parentElement.querySelector('.layer-led');
    cb.addEventListener('change',()=>{
      LAYERS[layer] = cb.checked;
      if(led) led.classList.toggle('on',cb.checked);
      renderGlobe();
    });
  });
}

/* ── COUNTDOWN ───────────────────────────────────────────────── */
function startCountdown(){
  const el = document.getElementById('hud-refresh');
  setInterval(()=>{
    nextRefreshSec--;
    if(nextRefreshSec<=0){
      nextRefreshSec=30;
      startBackgroundFetch();
      fetchAllDCWeather(); // refresh DC weather every 30s
    }
    if(el) el.textContent = `${nextRefreshSec}s`;
  },1000);
}

/* ── BIND FILTERS ────────────────────────────────────────────── */
function bindFilters(){
  document.querySelectorAll('#source-bar .src-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#source-bar .src-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeSource = btn.dataset.source;
      renderFeed(); renderGlobe();
    });
  });
  document.querySelectorAll('#tag-filters .tag-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#tag-filters .tag-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.dataset.tag;
      renderFeed(); renderGlobe();
    });
  });
  document.querySelectorAll('#time-filters .time-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#time-filters .time-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeTime = btn.dataset.time;
      const windowEl = document.getElementById('hud-window');
      if(windowEl) windowEl.textContent = activeTime.toUpperCase();
      renderFeed(); renderGlobe();
    });
  });
}

/* ── BOOT ────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded',()=>{
  // Expose globals
  window.openSignalCard  = openSignalCard;
  window.openCompanyCard = openCompanyCard;
  window.closeCard       = closeCard;
  window.closeCountryBrief = closeCountryBrief;
  window.toggleFeed      = toggleFeed;
  window.toggleTimelinePlay = toggleTimelinePlay;
  window.allSignals      = allSignals;

  startClock();
  initGlobe();
  bindFilters();
  bindLayers();
  initTimeline();
  loadFallback();
  setTimeout(startBackgroundFetch, 500);
  startCountdown();
});
