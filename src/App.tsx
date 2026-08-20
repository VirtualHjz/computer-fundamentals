import { useMemo, useState } from 'react';
import { domains, goalPaths, nodes, resources, type DomainId } from './knowledge';

const nodeById = new Map(nodes.map(n=>[n.id,n]));

function BinaryLab(){
  const [value,setValue]=useState(173);
  const bits=value.toString(2).padStart(8,'0').split('');
  const weights=[128,64,32,16,8,4,2,1];
  return <div className='labBody'>
    <div className='labReadout'><span>十进制</span><strong>{value}</strong><input aria-label='二进制数值' type='range' min='0' max='255' value={value} onChange={e=>setValue(Number(e.target.value))}/></div>
    <div className='bitRow'>{bits.map((b,i)=><div className={`bit ${b==='1'?'on':''}`} key={i}><b>{b}</b><small>{weights[i]}</small></div>)}</div>
    <p className='equation'>{bits.map((b,i)=>b==='1'?weights[i]:0).filter(Boolean).join(' + ') || '0'} = {value}</p>
    <div className='labExplain'><b>你正在看什么？</b><p>8 个 bit 一共有 2⁸ = 256 种组合。这里每一位的“权重”是 2 的幂；亮起的位相加，就是当前数字。字符、颜色、音频最终也只是对更多字节建立解释规则。</p></div>
  </div>
}

const cpuSteps=[
  ['FETCH 取指','PC 指向内存中的下一条机器指令，CPU 把它读进指令寄存器。'],
  ['DECODE 译码','控制单元判断指令要读取哪些寄存器、做哪一种运算、结果写到哪里。'],
  ['EXECUTE 执行','ALU、分支单元或其他执行单元真正完成加减、比较、跳转等动作。'],
  ['WRITE BACK 写回','结果进入寄存器/内存，PC 更新，下一轮继续。']
];
function CpuLab(){
  const [step,setStep]=useState(0);
  return <div className='labBody'><div className='cpuDiagram'>
    {['内存','指令寄存器','控制单元','ALU / 寄存器'].map((x,i)=><div className={`cpuBox ${i===step?'hot':''}`} key={x}>{x}<small>{i===0?'0101 1100':i===1?'ADD R1,R2':i===2?'译码信号':'42 → 67'}</small></div>)}
    <div className='cpuWire'><span style={{left:`${step*30+5}%`}}></span></div>
  </div><div className='stepControl'><span>第 {step+1}/4 拍</span><h4>{cpuSteps[step][0]}</h4><p>{cpuSteps[step][1]}</p><button onClick={()=>setStep((step+1)%4)}>下一拍 →</button></div></div>
}

const httpSteps=[
  ['DNS','example.com → 203.0.113.8','先把“名字”变成网络地址。'],
  ['TCP / QUIC','建立传输通道','准备让两端可靠地交换数据。'],
  ['TLS','验证证书并协商密钥','在 HTTP 之前先建立加密与身份信任。'],
  ['HTTP Request','GET /api/profile','method + path + headers + body 描述需求。'],
  ['Backend','身份 → 业务 → 数据库','服务器执行真正的业务逻辑。'],
  ['HTTP Response','200 + JSON','服务器把结果编码成响应返回。'],
  ['Browser','更新状态 → 重新渲染','响应最后变成你看到的 UI。']
];
function HttpLab(){
  const [step,setStep]=useState(0);
  return <div className='labBody'><div className='journey'>{httpSteps.map((s,i)=><button key={s[0]} className={i===step?'active':i<step?'done':''} onClick={()=>setStep(i)}><span>{i+1}</span><b>{s[0]}</b><small>{s[1]}</small></button>)}</div><div className='packetTrack'><span style={{width:`${(step/(httpSteps.length-1))*100}%`}}></span></div><div className='labExplain'><b>{httpSteps[step][0]} · {httpSteps[step][1]}</b><p>{httpSteps[step][2]}</p><button onClick={()=>setStep((step+1)%httpSteps.length)}>继续请求 →</button></div></div>
}

function IndexLab(){
  const [indexed,setIndexed]=useState(false);
  const rows=[12,18,24,31,37,42,48,53,59,64,70,73,79,85,91,97];
  const target=73;
  const checked=indexed?[64,85,73]:rows.slice(0,rows.indexOf(target)+1);
  return <div className='labBody'><div className='indexTop'><div><span>查询</span><strong>WHERE user_id = 73</strong></div><label><input type='checkbox' checked={indexed} onChange={e=>setIndexed(e.target.checked)}/> 使用索引</label></div><div className='dbRows'>{rows.map(v=><span className={v===target?'target':checked.includes(v)?'checked':''} key={v}>{v}</span>)}</div><div className='labExplain'><b>{indexed?'B-Tree 直觉：3 次定位':'全表扫描：12 次比较'}</b><p>{indexed?'索引像有序目录，可以不断缩小范围；代价是每次写入也要维护这份目录。':'没有合适索引时，数据库可能只能逐条检查。数据少时没关系，数据量上百万后差距会被放大。'}</p></div></div>
}

function AiLab(){
  const [step,setStep]=useState(0);
  const items=[['Tokenize','“帮我解释 HTTP” → token ids','文字先被切成模型自己的离散片段。'],['Embed','token id → 向量','每个 token 被映射到一组可计算的数字。'],['Attention','根据上下文混合信息','每个位置对其他位置分配不同注意力权重。'],['Logits','计算下一个 token 的分数','模型输出整个词表上的候选分数。'],['Sample','选择一个 token','temperature 等参数影响选得多确定。'],['Loop','把新 token 加回上下文','重复前向计算，直到结束或达到限制。']];
  return <div className='labBody'><div className='aiPipe'>{items.map((x,i)=><button className={i===step?'active':i<step?'done':''} key={x[0]} onClick={()=>setStep(i)}><span>{i+1}</span><b>{x[0]}</b></button>)}</div><div className='aiCanvas'><div className='promptMini'>帮我解释 <em>HTTP</em></div><div className='arrow'>→</div><div className='tensorMini'>{Array.from({length:12}).map((_,i)=><i key={i} style={{opacity:.22+((i+step*3)%8)/10}}></i>)}</div><div className='arrow'>→</div><div className='nextToken'>“HTTP” <small>p=0.31</small></div></div><div className='labExplain'><b>{items[step][0]} · {items[step][1]}</b><p>{items[step][2]}</p><button onClick={()=>setStep((step+1)%items.length)}>下一步 →</button></div></div>
}

function App(){
  const [domain,setDomain]=useState<DomainId>('network');
  const [activeId,setActiveId]=useState('http-tls');
  const [search,setSearch]=useState('');
  const [lab,setLab]=useState('http');
  const [goal,setGoal]=useState('aiapp');
  const active=nodeById.get(activeId) ?? nodes[0];
  const filtered=useMemo(()=>nodes.filter(n=>n.domain===domain && (`${n.title}${n.en}${n.summary}${n.terms.flat().join('')}`).toLowerCase().includes(search.trim().toLowerCase())),[domain,search]);
  const termResults=useMemo(()=>nodes.flatMap(n=>n.terms.map(t=>({term:t[0],text:t[1],node:n}))).filter(x=>(x.term+x.text+x.node.title).toLowerCase().includes(search.trim().toLowerCase())).slice(0,20),[search]);
  const activeGoal=goalPaths.find(g=>g.id===goal) ?? goalPaths[0];
  const jump=(id:string)=>{const n=nodeById.get(id);if(!n)return;setDomain(n.domain);setActiveId(id);document.getElementById('atlas')?.scrollIntoView({behavior:'smooth'});};

  return <main>
    <nav className='nav'><a className='brand' href='#top'><span className='brandMark'>CF</span><span>Computer Fundamentals</span></a><div className='navLinks'><a href='#atlas'>知识图谱</a><a href='#labs'>机制实验室</a><a href='#paths'>实作路径</a><a href='#resources'>深入资源</a></div><a className='githubBtn' href='https://github.com/VirtualHjz/computer-fundamentals' target='_blank' rel='noreferrer'>GitHub ↗</a></nav>

    <header className='hero' id='top'><div className='heroGrid'></div><div className='heroCopy'><span className='eyebrow'>FOR AI-NATIVE BEGINNERS · V2</span><h1>不是“认识几个术语”。<br/><em>是看懂计算机为什么这样运作。</em></h1><p>从电路和内存，到 HTTP、数据库、部署，再到 Transformer 和 Agent。每个节点都回答：<b>它是什么、为什么出现、内部发生什么、哪里会坏、它怎样连接到 AI 实作。</b></p><div className='heroStats'><div><strong>32</strong><span>关键节点</span></div><div><strong>8</strong><span>知识体系</span></div><div><strong>5</strong><span>交互实验</span></div><div><strong>5</strong><span>造物路径</span></div></div><div className='heroActions'><a href='#atlas' className='primary'>进入知识图谱 ↓</a><a href='#labs' className='secondary'>直接玩机制实验</a></div></div>
      <div className='stackScene'><div className='sceneLabel'>你点击“生成”的 1 秒钟里</div>{[['UI','React / DOM'],['API','HTTP / TLS'],['Runtime','Process / OS'],['Compute','CPU / GPU'],['Model','Token / Attention']].map((x,i)=><div className='sceneLayer' style={{transform:`translateX(${i*8}px)`}} key={x[0]}><span>0{i+1}</span><b>{x[0]}</b><small>{x[1]}</small><i></i></div>)}<p>五层不是五门互不相关的课。<br/>它们是同一次真实操作里的不同视角。</p></div>
    </header>

    <section className='chainSection'><span className='kicker'>ONE ACTION · MANY LAYERS</span><h2>把一次“点击按钮”沿着整条系统链走一遍</h2><div className='chain'>{['浏览器事件','前端状态','HTTP 请求','DNS / 网络','后端路由','数据库查询','模型推理','响应渲染'].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b>{i<7&&<i>→</i>}</div>)}</div></section>

    <section className='section atlas' id='atlas'><div className='sectionHead'><div><span className='kicker'>01 · KNOWLEDGE GRAPH</span><h2>32 个关键节点，不再停留在“一句话解释”</h2></div><p>先选一个体系，再点进节点。每个节点都带机制分解、设计动机、AI 实作用法、排错视角和跨领域连接。</p></div>
      <div className='domainTabs'>{domains.map(d=><button className={domain===d.id?'active':''} onClick={()=>{setDomain(d.id);const n=nodes.find(n=>n.domain===d.id);if(n)setActiveId(n.id)}} key={d.id}><span>{d.icon}</span><b>{d.title}</b><small>{d.en}</small></button>)}</div>
      <div className='atlasThesis'><span>{domains.find(d=>d.id===domain)?.icon}</span><p>{domains.find(d=>d.id===domain)?.thesis}</p><div className='searchMini'>⌕ <input aria-label='搜索当前领域' value={search} onChange={e=>setSearch(e.target.value)} placeholder='搜节点或术语…'/></div></div>
      <div className='atlasGrid'><aside className='nodeList'>{filtered.map((n,i)=><button key={n.id} className={n.id===activeId?'active':''} onClick={()=>setActiveId(n.id)}><span>{String(i+1).padStart(2,'0')}</span><div><b>{n.title}</b><small>{n.en} · {n.depth}</small></div><em>→</em></button>)}{!filtered.length&&<div className='empty'>当前领域没有匹配项。清空搜索继续浏览。</div>}</aside>
        <article className='deepCard'><div className='deepTop'><div><span className='depthTag'>{active.depth}</span><small>{active.en}</small><h3>{active.title}</h3></div><span className='deepIcon'>{domains.find(d=>d.id===active.domain)?.icon}</span></div>
          <div className='summaryBox'><span>先抓住这个直觉</span><p>{active.summary}</p></div>
          <div className='analogy'><span>类比</span><p>{active.analogy}</p></div>
          <div className='deepGrid'><div><h4>为什么它会出现？</h4><p>{active.why}</p></div><div><h4>AI 时代为什么仍要懂？</h4><p>{active.aiUse}</p></div></div>
          <div className='mechanism'><h4>内部到底发生了什么</h4>{active.mechanism.map((m,i)=><div key={m}><span>{i+1}</span><p>{m}</p></div>)}</div>
          <div className='debugBox'><b>⌁ 排错时这样想</b><p>{active.debug}</p></div>
          <div className='termDeck'><h4>核心术语</h4>{active.terms.map(([a,b])=><div key={a}><b>{a}</b><p>{b}</p></div>)}</div>
          <div className='connectDeck'><h4>继续沿图谱跳转</h4><div>{active.connects.map(id=>{const n=nodeById.get(id);return n?<button key={id} onClick={()=>jump(id)}>↗ {n.title}</button>:null})}</div></div>
        </article></div>
    </section>

    <section className='labsSection' id='labs'><div className='sectionHead light'><div><span className='kicker'>02 · MECHANISM LAB</span><h2>不要只“听懂”。亲手拨一下系统。</h2></div><p>这些不是装饰动画，而是把抽象机制压缩成可操作的小模型。先玩，再回到术语，理解会快很多。</p></div><div className='labTabs'><button onClick={()=>setLab('binary')} className={lab==='binary'?'active':''}>01 二进制</button><button onClick={()=>setLab('cpu')} className={lab==='cpu'?'active':''}>02 CPU 指令周期</button><button onClick={()=>setLab('http')} className={lab==='http'?'active':''}>03 HTTP 请求</button><button onClick={()=>setLab('index')} className={lab==='index'?'active':''}>04 数据库索引</button><button onClick={()=>setLab('ai')} className={lab==='ai'?'active':''}>05 LLM 推理</button></div><div className='labPanel'>{lab==='binary'?<BinaryLab/>:lab==='cpu'?<CpuLab/>:lab==='http'?<HttpLab/>:lab==='index'?<IndexLab/>:<AiLab/>}</div></section>

    <section className='section paths' id='paths'><div className='sectionHead'><div><span className='kicker'>03 · BUILD PATHS</span><h2>从“我想做什么”反推应该补哪条知识链</h2></div><p>每条路径不是完整课程，而是一组最能降低 AI 协作盲区的节点。点击步骤可以直接跳回知识图谱。</p></div><div className='pathTabs'>{goalPaths.map(g=><button className={goal===g.id?'active':''} onClick={()=>setGoal(g.id)} key={g.id}><span>{g.icon}</span>{g.title}</button>)}</div><div className='pathBoard'><div className='pathIntro'><span>{activeGoal.icon}</span><small>目标路径</small><h3>{activeGoal.title}</h3><p>{activeGoal.result}</p><div className='pathRule'><b>AI 协作原则</b><p>每次只跨越一个你不理解的抽象层。先让 AI 解释数据流和边界，再让它写代码。</p></div></div><div className='pathSteps'>{activeGoal.nodes.map((id,i)=>{const n=nodeById.get(id)!;return <button key={id} onClick={()=>jump(id)}><span>{i+1}</span><div><small>{domains.find(d=>d.id===n.domain)?.title}</small><b>{n.title}</b><p>{n.summary}</p></div><em>打开节点 ↗</em></button>})}</div></div></section>

    <section className='termsSection'><div className='termsIntro'><span className='kicker'>04 · TERM GRAPH</span><h2>术语不再是孤岛</h2><p>搜索任何词，会同时告诉你它属于哪个知识节点。这样你遇到 AI 抛出的陌生术语时，能先定位“它属于系统哪一层”。</p><div className='bigSearch'>⌕ <input value={search} onChange={e=>setSearch(e.target.value)} placeholder='试试：page、TLS、transaction、attention…'/><kbd>{termResults.length}</kbd></div></div><div className='termResults'>{termResults.map(x=><button key={`${x.node.id}-${x.term}`} onClick={()=>jump(x.node.id)}><span>{x.term}</span><p>{x.text}</p><small>{domains.find(d=>d.id===x.node.domain)?.title} / {x.node.title} ↗</small></button>)}</div></section>

    <section className='section resources' id='resources'><div className='sectionHead'><div><span className='kicker'>05 · GO DEEPER</span><h2>真正感兴趣时，再进入专业资料</h2></div><p>优先选择能建立系统直觉、带项目或由官方/作者长期维护的资料，而不是继续看碎片化术语解释。</p></div><div className='resourceGrid'>{resources.map(r=><a href={r.href} target='_blank' rel='noreferrer' key={r.title}><div><span>{r.tag}</span><em>↗</em></div><h3>{r.title}</h3><small>{r.by}</small><p>{r.note}</p></a>)}</div><div className='githubCallout'><div><span className='brandMark'>GH</span><div><small>OPEN KNOWLEDGE BASE</small><h3>网站源码与全部关键节点已结构化到 GitHub</h3><p>内容不是写死在页面里的散文；每个节点都有稳定 id、领域、机制、术语和连接关系，后续可以持续扩充。</p></div></div><a href='https://github.com/VirtualHjz/computer-fundamentals' target='_blank' rel='noreferrer'>打开 computer-fundamentals ↗</a></div></section>

    <footer><div className='footerBrand'><span className='brandMark'>CF</span><div><b>Computer Fundamentals</b><small>Understand the layers. Then build with AI.</small></div></div><p>给 AI 时代非科班创作者的一张计算机系统底图。</p><a href='#top'>回到顶部 ↑</a></footer>
  </main>
}

export default App;