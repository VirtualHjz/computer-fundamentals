# Knowledge Map

这份文档是网站 V2 的人类可读知识索引。机器可读、驱动网站渲染的完整内容位于 [`src/knowledge.ts`](../src/knowledge.ts)。

## 内容模型

每个节点必须同时回答六件事：

1. **直觉**：一句话到底在说什么。
2. **类比**：用已有经验建立第一层模型。
3. **Why**：这个技术为什么会被发明出来。
4. **Mechanism**：内部按步骤究竟发生什么。
5. **AI Use**：它如何影响 AI 协作开发或 AI 产品。
6. **Debug**：当东西坏掉时，怎样用这个知识定位问题。

节点之间通过 `connects` 形成图，而不是章节目录。

## 01 · Hardware & Computation

| id | 节点 | 核心问题 |
|---|---|---|
| `bits-bytes` | 比特、字节与编码 | 为什么所有文字、图片、声音最终都能变成字节？ |
| `cpu` | CPU、指令与时钟 | 高级程序怎样落到取指、译码、执行？ |
| `memory` | 内存、地址与缓存层级 | 为什么“数据在哪里”会决定速度？ |
| `gpu` | GPU 与并行计算 | 为什么 GPU 特别适合图形与 AI？ |

## 02 · Operating Systems

| id | 节点 | 核心问题 |
|---|---|---|
| `process-thread` | 进程、线程与调度 | 多个程序怎样共享 CPU 又互不踩坏？ |
| `virtual-memory` | 虚拟内存与分页 | 为什么程序看到的地址不是物理 RAM 地址？ |
| `filesystem` | 文件系统与路径 | 原始磁盘块怎样变成文件和目录？ |
| `permissions` | 权限、用户与隔离 | 系统怎样决定“谁能做什么”？ |

## 03 · Networking

| id | 节点 | 核心问题 |
|---|---|---|
| `ip-routing` | IP、路由与分组 | 数据包怎样跨很多网络找到目的地？ |
| `dns` | DNS | 域名怎样变成真正可连接的地址？ |
| `tcp-udp` | TCP、UDP 与可靠性 | 不可靠网络上怎样得到可靠连接？ |
| `http-tls` | HTTP、TLS 与一次请求 | 浏览器发一个请求时到底穿过了哪些层？ |

## 04 · Programming

| id | 节点 | 核心问题 |
|---|---|---|
| `data-structures` | 变量、类型与数据结构 | 程序怎样组织和约束状态？ |
| `control-flow` | 条件、循环与状态机 | 复杂流程怎样从“很多 if”变成可推理系统？ |
| `functions-modules` | 函数、模块与抽象边界 | 大软件怎样把复杂性藏在稳定接口后面？ |
| `runtime-errors` | 运行时、调用栈与错误 | stack trace 为什么能告诉你错误从哪里来？ |

## 05 · Data & Databases

| id | 节点 | 核心问题 |
|---|---|---|
| `data-model` | 数据模型与 Schema | 现实世界应该怎样切成实体、字段和关系？ |
| `sql` | SQL 与关系代数直觉 | 数据库为什么能自己决定查询执行计划？ |
| `index-transaction` | 索引、事务与一致性 | 如何同时解决“查得快”和“写不坏”？ |
| `cache` | 缓存与失效 | 用缓存提速后，怎样处理旧数据？ |

## 06 · Web & Apps

| id | 节点 | 核心问题 |
|---|---|---|
| `browser-dom` | 浏览器、HTML/CSS 与 DOM | HTML/CSS/JS 最后怎样变成屏幕像素？ |
| `frontend-state` | 前端状态与渲染 | 为什么现代前端强调 state → UI？ |
| `backend-api` | 后端、API 与请求生命周期 | 一个 API 请求在服务器内部怎样被处理？ |
| `auth-security` | 身份认证、授权与密钥 | “你是谁”和“你能做什么”为什么是两件事？ |

## 07 · Cloud & Reliability

| id | 节点 | 核心问题 |
|---|---|---|
| `server-linux` | 服务器、Linux 与进程环境 | “部署到服务器”究竟部署了什么？ |
| `container` | 容器与镜像 | 容器为什么不是一个小虚拟机？ |
| `deployment-ci` | 构建、部署与 CI/CD | 代码怎样变成可验证、可回滚的线上版本？ |
| `observability` | 日志、指标与可观测性 | 分布式系统出错时怎样找到证据链？ |

## 08 · AI & LLMs

| id | 节点 | 核心问题 |
|---|---|---|
| `tokens-embeddings` | Token、Embedding 与表示 | 模型怎样把文字变成可以计算的数字？ |
| `transformer` | Transformer 与注意力 | attention 到底在计算什么？ |
| `inference-training` | 训练、推理与概率生成 | 训练和你每次聊天时发生的推理有什么区别？ |
| `rag-agents` | RAG、工具调用与 Agent | 模型怎样连接私有资料和真实外部动作？ |

## 跨层示例：一次 AI 请求

`browser-dom` → `frontend-state` → `http-tls` → `backend-api` → `auth-security` → `tokens-embeddings` → `transformer` → `inference-training` → 返回 HTTP 响应 → UI 重新渲染。

这条链体现了本项目的核心观点：**所谓“AI 产品”，仍然是一整套计算机系统。模型只是其中一层。**
