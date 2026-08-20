# Knowledge Map · V3

V3 不再以“长页面 + 大量节点”为目标，而采用 **入口 → 目录 → 独立知识页** 的学习结构。

## 信息架构

```text
首页 #/
  ↓
知识目录 #/catalog
  ↓
独立知识页 #/knowledge/<id>
```

首页只说明网站解决什么问题、有哪些知识层以及推荐入口；所有正文都进入独立知识页。

## 发布质量门槛

一个节点只有满足以下条件才进入主目录：

1. 有一个明确、具体的初学者核心问题。
2. 有独立 URL。
3. 有专属交互可视化或足够清晰的机制示意。
4. 同时解释直觉、设计动机与真实内部机制。
5. 有 AI 实作视角和 Debug 视角。
6. 有必要术语，但不堆百科式定义。
7. 有跨节点连接和继续深入资料。
8. 桌面与移动端都可以完整学习。

## 首批结构

### 01 · 信息与机器

| 顺序 | id | 页面 | 可视化 |
|---|---|---|---|
| 01 | `bits-bytes` | 比特、字节与编码 | 8-bit 数值滑块与位权 |
| 02 | `cpu` | CPU、指令与时钟 | Fetch / Decode / Execute / Write back |
| 03 | `memory` | 内存、地址与缓存层级 | Register / Cache / RAM / SSD 层级 |

### 02 · 程序如何运行

| 顺序 | id | 页面 | 可视化 |
|---|---|---|---|
| 04 | `process-thread` | 进程、线程与调度 | CPU 时间片调度 |
| 05 | `callstack` | 函数、调用栈与错误 | Stack frame push / pop |

### 03 · 互联网如何连接

| 顺序 | id | 页面 | 可视化 |
|---|---|---|---|
| 06 | `dns` | DNS：域名怎样找到服务器 | DNS 逐级解析 |
| 07 | `http` | HTTP、TLS 与一次请求 | 完整请求生命周期 |

### 04 · 产品、数据与身份

| 顺序 | id | 页面 | 可视化 |
|---|---|---|---|
| 08 | `database-index` | 数据库索引与查询 | 全表扫描 vs. 索引 |
| 09 | `browser-dom` | 浏览器、DOM 与渲染 | HTML → CSS → Layout → Paint |
| 10 | `auth-secrets` | 认证、授权与密钥 | Browser / Backend / Secret 信任边界 |

### 05 · AI 模型如何工作

| 顺序 | id | 页面 | 可视化 |
|---|---|---|---|
| 11 | `tokens-embeddings` | Token、Embedding 与表示 | 概念向量教学投影 |
| 12 | `llm-generation` | 大模型怎样逐 Token 生成 | Tokenize → Sample 循环 |

## 单知识页固定结构

```text
Breadcrumb
标题 + 核心问题
本页目录
↓
01 Visual First
02 Intuition / Why
03 Mechanism
04 Debug Mindset
05 Vocabulary
06 Connect the Map
Optional Resource
上一个 / 下一个
```

## 内容数据模型

网站仍然由 `src/knowledge.ts` 驱动，每个节点拥有稳定 `id`：

```ts
{
  id,
  group,
  order,
  title,
  en,
  question,
  oneLine,
  analogy,
  why,
  mechanism,
  aiUse,
  debug,
  terms,
  connects,
  visual,
  resource
}
```

`src/VisualExplainer.tsx` 根据 `visual` 类型渲染该知识点的专属教学模型。

## 扩展原则

新增节点不以“数量”为 KPI。每新增一个知识页，都必须先回答：

- 这是不是 AI 时代初学者高频遇到的真实困惑？
- 有没有办法先让用户看到机制，而不是先读定义？
- 它和当前 12 页之间的依赖关系是什么？
- 它能否帮助用户实际排错、判断 AI 给出的方案？

不能回答这些问题的节点，先留在草稿区，不进入正式目录。