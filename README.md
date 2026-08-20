# Computer Fundamentals

面向计算机小白、非科班创作者，以及想在 AI 时代真正做出东西的人的交互式计算机基础网站。

> 核心目标：不是背术语，而是建立一张能支撑 AI 协作开发的系统地图——知道一个概念为什么存在、内部怎么工作、哪里会坏，以及它和其他层怎样连接。

## 在线网站

**Latest:** https://ai-ny8erj.v2.appdeploy.ai/

当前版本：**V3 · 入口 / 目录 / 独立知识页架构**。

## V3 为什么重构

V2 把大量知识放在一个长页面里，虽然信息很多，但不利于初学者建立层级，也不方便收藏、分享和继续扩展。

V3 改成三层信息架构：

1. **首页 `#/`**：只负责定位、入口和推荐起点，不再承载大量正文。
2. **知识目录 `#/catalog`**：按知识层级组织所有已发布内容，并提供搜索与筛选。
3. **独立知识页 `#/knowledge/<id>`**：一个知识点一个 URL，一个核心问题一页解决。

例如：

- `#/knowledge/cpu`
- `#/knowledge/http`
- `#/knowledge/tokens-embeddings`

## 先少而精

V3 首批只发布 **12 个精品知识页**。旧版更多节点并没有删除，而是暂时不进入主目录；只有达到同样的内容质量与可视化标准后才重新发布。

### 01 · 信息与机器
- 比特、字节与编码
- CPU、指令与时钟
- 内存、地址与缓存层级

### 02 · 程序如何运行
- 进程、线程与调度
- 函数、调用栈与错误

### 03 · 互联网如何连接
- DNS：域名怎样找到服务器
- HTTP、TLS 与一次请求

### 04 · 产品、数据与身份
- 数据库索引与查询
- 浏览器、DOM 与渲染
- 认证、授权与密钥

### 05 · AI 模型如何工作
- Token、Embedding 与表示
- 大模型怎样逐 Token 生成

## 每个知识页的质量标准

每一页固定回答：

1. **核心问题**：这一页究竟要解决什么困惑。
2. **可视化 / 交互模型**：先看见，再解释。
3. **直觉与类比**：先建立不容易忘的心智模型。
4. **Why**：为什么这个技术会被发明出来。
5. **Mechanism**：内部按步骤到底发生什么。
6. **AI Use**：它如何影响 AI 协作开发或 AI 产品。
7. **Debug**：东西坏掉时先怀疑哪一层。
8. **核心术语**：只保留当前页面真正需要记的词。
9. **知识连接**：跳到前置、后续或跨领域知识。
10. **继续深入**：给真正感兴趣的人专业资料入口。

## 首批 12 个可视化

每个已发布知识点都有自己的教学模型，而不是共用几张装饰图：

- 二进制数值滑块与 8-bit 权重
- CPU Fetch → Decode → Execute → Write back
- 寄存器 / Cache / RAM / SSD 存储层级
- 线程调度时间片
- 函数调用栈 push / pop
- DNS 逐级解析
- HTTP / TLS 完整请求链
- 全表扫描 vs. 数据库索引
- 浏览器 HTML → CSS → Layout → Paint → JS state
- 登录 / Session / Authorization / Secret 边界
- Embedding 概念相似度二维教学投影
- LLM Tokenize → Embed → Attention → Logits → Sample → Loop

## 项目结构

```text
src/
├── App.tsx               # Hash 路由、首页、目录页、知识页
├── knowledge.ts         # 首批知识节点结构化内容
├── VisualExplainer.tsx  # 每个知识点对应的交互可视化
├── index.css            # 全站响应式样式
└── main.tsx

docs/
└── KNOWLEDGE_MAP.md     # 人类可读的结构化目录与内容标准

tests/
└── tests.txt            # 首页→目录→知识页与移动端核心流程测试
```

## 路由设计

项目使用 Hash Routing，避免静态托管环境在刷新子路由时返回 404：

```text
#/                         首页
#/catalog                  结构化目录
#/knowledge/bits-bytes     比特、字节与编码
#/knowledge/cpu            CPU、指令与时钟
#/knowledge/http           HTTP、TLS 与一次请求
#/knowledge/llm-generation 大模型生成
```

## 技术栈

- React 19
- TypeScript
- Vite
- CSS / 响应式布局
- 纯前端，无账号、数据库和外部密钥依赖

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 内容原则

- **首页不教学，只做入口。**
- **一个知识点，一个独立页面。**
- **先用视觉建立直觉，再进入文字机制。**
- **内容宁可少，不为“看起来丰富”而堆术语。**
- **每一页都必须能帮助实际 AI 开发或排错。**
- **专业资料是下一层，不是开工前置作业。**

## 后续扩展顺序

只有现有 12 页质量稳定后再继续扩：

- 文件系统与权限
- 虚拟内存
- TCP / UDP
- SQL 与事务
- API 与后端生命周期
- Linux、容器与部署
- 编译器与语言实现
- 图形学与游戏引擎
- 密码学与 Web 安全
- Transformer 更深入机制
- RAG、工具调用与 Agent

---

**Understand first. Build next.**