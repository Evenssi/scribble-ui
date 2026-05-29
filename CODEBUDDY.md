# CODEBUDDY.md

> 面向 AI 编码助手（CodeBuddy、Claude Code、Cursor 等）的项目级指南。
> 给人看的常规文档放在 [README.md](./README.md) / [README.zh-CN.md](./README.zh-CN.md)。
> 本文件会进入 git 仓库。**`.codebuddy/`、`.workbuddy/`、`.claude/`、`.cursor/` 这几个目录都是本地工作区、已被 gitignore，永远不要把它们里面的内容当作仓库的一部分来引用。**

---

## 1. 这是个什么仓库

`scribble-ui` 是一个**手绘风 React 组件库**（便利贴配色 + 不对称圆角 + 硬阴影偏移 + SVG `feTurbulence` 抖动滤镜）。仓库本体是一个 **pnpm workspace monorepo**，包含两个成员：

| 路径 | 包名 | 角色 |
|---|---|---|
| `packages/core` | `scribble-ui` | 真正发布到 npm 的库（终端用户唯一会 `npm install` 的东西）。 |
| `apps/docs` | `docs`（私有） | Next.js 14 App Router 文档站，**已接入 i18n**（`en-US` / `zh-CN`），路由位于 `app/[locale]/`。通过 workspace 协议直接引用 `packages/core` 源码。 |

库本身对外提供：

- React 组件（目前 `packages/core/src/components/*` 下大约 30+ 个）。
- 三个 CSS 入口：`styles/tokens.css`、`styles/reset.css`、`styles/components.css`。
- 一个**必须**在应用根节点挂载一次的 `<HandDrawnFilters />` SVG defs 组件——抖动滤镜的 `url(#...)` 引用要靠它解析。

支持 tree-shaking，**没有运行时 CSS-in-JS**，没有 Tailwind，peer deps 仅 `react` + `react-dom`。

---

## 2. 工具链与版本（必须严格匹配）

| 工具 | 版本来源 | 说明 |
|---|---|---|
| Node | `.nvmrc` | 干任何事之前先 `nvm use`。`package.json#engines.node` 要求 `>=20.0.0`。 |
| pnpm | `package.json#packageManager`（`pnpm@10.23.0`） | **不要**用 npm/yarn —— workspace 协议只认 pnpm。 |
| TypeScript | `tsconfig.base.json` 共享 | `strict`、`noUncheckedIndexedAccess`、`noImplicitOverride`、`moduleResolution: Bundler`。 |
| 库的打包器 | `tsup`（`packages/core/tsup.config.ts`） | 输出 ESM + CJS + DTS，**并通过 `cssFiles` 复制各组件 CSS**。 |
| 文档站打包器 | Next.js 14 App Router | i18n 路由通过 `middleware.ts` + `app/[locale]/` 实现。 |
| 测试 | `vitest`（`packages/core/vitest.config.ts`） | setup 文件：`packages/core/test/setup.ts`；测试用例统一放在 `packages/core/test/unit/<Name>.test.tsx`。 |
| 覆盖率 | `@vitest/coverage-v8` | 通过 `pnpm test:coverage` 触发，输出 `text` / `html` / `lcov`，HTML 报告落在 `packages/core/coverage/`（已 gitignore）。 |

---

## 3. 你真正会跑的命令

下面所有命令都从**仓库根目录**执行，除非另有说明。`--filter` 用来定位某个 workspace 子包。

```bash
# 安装依赖
pnpm install

# 开发模式 —— 在 http://localhost:3000 启文档站，热更新指向 packages/core 源码
pnpm dev                       # === pnpm --filter docs dev

# 构建全部（先构建库，文档站再消费已构建好的库）
pnpm build                     # === pnpm -r build

# 仅构建库（ESM/CJS/DTS + 把组件 CSS 复制进 dist）
pnpm build:core                # === pnpm --filter scribble-ui build

# 仅构建文档站（静态导出）
pnpm build:docs                # === pnpm --filter docs build

# 整个 workspace 类型检查
pnpm typecheck                 # === pnpm -r typecheck

# lint —— 目前还没接入，是个 echo no-op，永远 exit 0。
# 不要把 `pnpm lint` 当成校验通过的依据，请用 `read_lints` / 编辑器诊断。
pnpm lint
```

测试（根目录已挂上 alias，也支持按子包跑）：

```bash
pnpm test                                  # === pnpm --filter scribble-ui test
pnpm test:coverage                         # vitest --coverage（v8 provider）

pnpm --filter scribble-ui test             # vitest run（一次性）
pnpm --filter scribble-ui test:watch       # vitest（watch 模式）
pnpm --filter scribble-ui test:coverage    # 同上 + coverage 报告
```

所有用例都集中在 `packages/core/test/unit/<Name>.test.tsx`，**不要**散落到组件目录里。

### 3.1 dev 与 build 的冲突 —— 跑 `build:docs` 之前务必看一眼

`pnpm --filter docs dev` 与 `pnpm --filter docs build` 共用同一个 `apps/docs/.next/` 目录。如果在 dev server 还活着的时候直接跑 build，build 会用 production 的 hash chunk 把 dev 模式的 manifest 覆盖掉，但 dev server 进程还在内存里照旧按 dev 模式给浏览器返 HTML（CSS link 还指向原来的 dev 路径）—— 结果就是每个 CSS 请求都 404，页面瞬间裸奔。

任何 `build:docs` / `pnpm build` 之前：

```bash
# 要么先把 dev server 杀掉
lsof -t -iTCP:3000 -sTCP:LISTEN | xargs kill 2>/dev/null

# …要么直接清掉 .next，让 dev/build 不共享状态
rm -rf apps/docs/.next
```

build 验证完之后再 `pnpm dev` 重启。

---

## 4. 仓库目录结构

```
scribble-ui/
├── CODEBUDDY.md                  ← 你正在看的这份
├── README.md / README.zh-CN.md   ← 给人看的常规文档
├── package.json                  ← 根级脚本 + pnpm@10.23.0 + node>=20
├── pnpm-workspace.yaml           ← packages/* + apps/*
├── tsconfig.base.json            ← 共享的 strict TS 配置
├── .nvmrc / .npmrc
├── .gitignore                    ← 忽略 .codebuddy/ .workbuddy/ .claude/ .cursor/
│
├── packages/
│   └── core/                     ← 发布为 `scribble-ui`
│       ├── src/
│       │   ├── index.ts          ← 公共 barrel；每个组件都从这里 re-export
│       │   ├── styles/
│       │   │   ├── tokens.css    ← CSS 变量（颜色、圆角、阴影）
│       │   │   ├── reset.css
│       │   │   └── components.css ← 把每个组件的 CSS 用 @import 串起来
│       │   └── components/
│       │       └── <Name>/
│       │           ├── <Name>.tsx
│       │           ├── <Name>.css
│       │           ├── index.ts
│       │           └── （可选：<Name>Group.tsx、<Name>Context.ts）
│       ├── test/                 ← 单元测试统一放这里
│       │   ├── setup.ts          ← jest-dom 等全局 setup
│       │   └── unit/
│       │       └── <Name>.test.tsx
│       ├── tsup.config.ts        ← cssFiles 名单必须列全所有组件
│       ├── tsconfig.test.json    ← test 专用 tsconfig（包含 vitest globals）
│       └── vitest.config.ts
│
├── apps/
│   └── docs/                     ← Next.js 14 i18n 文档站（不发布）
│       ├── middleware.ts         ← locale 协商
│       ├── i18n/
│       │   ├── config.ts
│       │   ├── getDictionary.ts
│       │   └── dictionaries/{en-US,zh-CN}/components/<name>.ts
│       ├── components/           ← 仅文档站使用的外壳（DocsTopbar、LocaleSwitcher 等）
│       └── app/
│           ├── layout.tsx        ← 根 html/body 外壳
│           └── [locale]/
│               ├── layout.tsx    ← 侧边栏 + dictionary provider
│               ├── page.tsx      ← 首页
│               └── components/<name>/
│                   ├── page.tsx                  ← server 边界，加载字典
│                   └── <Name>Doc.client.tsx     ← 真正的 demo 展示（client 组件）
│
└── （以下是 gitignore 的本地 AI 工作区 —— 不要当作仓库真实状态来读）
    ├── .codebuddy/   ← 本助手的规则、agent、计划、状态笔记
    ├── .workbuddy/
    ├── .claude/
    └── .cursor/
```

> **注意 —— 文档站的路由位置已经迁移过。** 较旧的笔记（包括 `.codebuddy/` 里的部分内容）描述的还是 `apps/docs/app/layout.tsx` + `apps/docs/app/page.tsx` + `apps/docs/app/components/<name>/page.tsx` 这套老结构。当前的目录结构是**带 i18n 的**，那些文件已经全部迁到 `apps/docs/app/[locale]/...` 下面。新增组件文档页时，记得同步在 `apps/docs/i18n/dictionaries/{en-US,zh-CN}/components/<name>.ts` 添加字典，并在对应 locale 的 `index.ts` 注册。

---

## 5. 新增组件清单 ——「聚合 5+2」

一个组件**没全部走完下面这些点就不算做完**。漏掉任意一处，构建、公共 API、样式或文档站会有一个悄悄裂掉。

**`packages/core` 里的 5 处：**

1. `packages/core/src/components/<Name>/<Name>.tsx` —— 实现。
2. `packages/core/src/components/<Name>/<Name>.css` —— 样式（不用 CSS Modules，用普通 class 名 + 约定的 `sui-` 前缀做命名空间）。
3. `packages/core/src/components/<Name>/index.ts` —— 局部 barrel。
4. `packages/core/src/index.ts` —— `export * from './components/<Name>';`（或与既有风格一致的 named re-export）。
5. `packages/core/src/styles/components.css` —— `@import './components/<Name>/<Name>.css';`。
6. `packages/core/tsup.config.ts` 的 `cssFiles` 数组 —— **必须把 `<Name>` 加进去**，否则 build 后的 `dist/styles/components.css` 里会 `@import` 一个不存在的路径（这是只在 prod 静默坏掉的那种 bug）。

**`apps/docs` 里（每个 locale 都要）：**

7. `apps/docs/app/[locale]/components/<name>/page.tsx`（server 边界，加载字典并渲染 client doc）。
8. `apps/docs/app/[locale]/components/<name>/<Name>Doc.client.tsx`（真正的 demo gallery）。
9. `apps/docs/i18n/dictionaries/en-US/components/<name>.ts` + `apps/docs/i18n/dictionaries/zh-CN/components/<name>.ts`，并在两边的 `index.ts` 都注册一次。
10. 侧边栏导航（`apps/docs/app/[locale]/layout.tsx`）—— 加上链接。
11. 首页（`apps/docs/app/[locale]/page.tsx`）—— 加一项条目，并视情况更新「N components shipped」之类的文案。

漏掉第 6 步或第 9 步，`pnpm dev` 看上去一切正常，但 `pnpm build` 或另一个 locale 会立刻翻车。

### 硬性验证关卡（四条全绿才算过）

```bash
pnpm --filter scribble-ui test     # 单元测试全绿
pnpm --filter scribble-ui build    # ESM + CJS + DTS + CSS 复制；复制的 CSS 数量 == 组件数
pnpm --filter docs build           # 静态页数 == 1（首页） + N 个组件，每个 locale 各一份
# 编辑器 / agent 诊断扫一遍改动文件（CodeBuddy 里就是 read_lints）
```

如果新增的组件本身比较有逻辑（受控/非受控、键盘交互、portal、focus trap 之类），**强烈建议**顺手加一份 `packages/core/test/unit/<Name>.test.tsx`，参考 `Modal` / `Drawer` / `Tabs` 的写法。

---

## 6. 风格与代码约定

- **源码与 UI 文案的语言：** 一律英文。允许出现中文的文档**白名单**仅限三处：`README.zh-CN.md`、本文件 `CODEBUDDY.md`、以及 `apps/docs/i18n/dictionaries/zh-CN/**` 下的中文字典。其余位置 commit 前必须扫一次：

  ```bash
  rg -n '[\u4e00-\u9fff]' apps/docs packages -g '!*.md' \
                          -g '!apps/docs/i18n/dictionaries/zh-CN/**'
  rg -n '[\u4e00-\u9fff]' packages/*/package.json apps/*/package.json
  ```

  有命中就停下，先清理再继续。

- **TypeScript：** 全程 `strict`，没有充分理由不要写 `any`，组件 props 优先用 `interface`，导出的 props 类型属于公共 API。

- **ref / 受控-非受控：** 当组件同时支持两种模式时，必须通过 `value` / `defaultValue` 这一对配合实现，并 `forwardRef` 转发 ref。

- **可访问性是硬性要求：** 优先用原生语义（`<button>`、`<input>`），原生元素覆盖不到时再上 `role` / `aria-*`。`:focus-visible` 样式始终要给。

- **CSS：**
  - class 名统一加 `sui-` 前缀（单一命名空间，不做 module hash）。
  - 使用 `tokens.css` 里定义的 CSS 变量，绝不硬编码 hex。
  - 不对称的 `border-radius`、不带模糊的硬偏移 `box-shadow` —— 这是品牌识别度。

- **不要随意往顶层加新依赖**。库的 peer deps 永远只有 `react` + `react-dom`。

---

## 7. Git 与 commit 政策（强约束）

完整的规范文本放在：

- [`.codebuddy/rules/commit-conventions.md`](./.codebuddy/rules/commit-conventions.md) —— Conventional Commits、纯英文、8 个允许的 type、scope 规则、长度限制、原子 commit 原则。
- [`.codebuddy/rules/main-agent-workflow.md`](./.codebuddy/rules/main-agent-workflow.md) —— 何时自动 commit、何时等用户、怎么 push。

> 这两个文件刻意 gitignore 掉（属于本地 AI 工作区状态）。但它们仍然是本仓库 commit 政策的**唯一权威源**——每个会话动 commit 之前都要重新读一次。

下面这几条**绝对不能动**，怕被忽略所以在这里再列一遍：

1. **Conventional Commits**，subject + body 全英文，subject ≤ 72 字符，body 单行 ≤ 100 字符，允许的 type 仅 8 个：`feat | fix | docs | chore | build | refactor | test | ci`。涉及 workspace 子包必须带 scope：`feat(core): …` 或 `feat(docs): …`。
2. **永远不**用 `git add .` / `git add -A` / `git commit -a`，**始终**显式列文件路径。
3. **永远不**用 `--force`、`--force-with-lease`、`--no-verify`、`--amend`（除非用户明确发话）。
4. commit message 里**永远不**带 AI 署名（`Co-Authored-By: Claude`、`Generated by CodeBuddy`、机器人 emoji 等都禁止）。
5. commit 之前 `git status` 必须不含与本次任务无关的脏文件；有就停下问用户。
6. 一个批次里**每一个** commit 都要 build + lint +（已配置时）测试全绿之后才能 push。push 失败立刻停下报告 —— 不要自动 pull、不要自动 rebase、不要 force push。

默认分支：`main`。默认远端：`origin`（`git@github.com:Evenssi/scribble-ui.git`）。

---

## 8. 容易踩坑的地方（攒下来的伤疤）

- **`tsup cssFiles` 漂移。** 新增组件时忘了在这里登记，构建出来的 `dist/styles/components.css` 里会留一个 404 的 `@import`，使用方装包后才会发现。新增/重命名组件后，`src/styles/components.css` 和 `tsup.config.ts` 这两处都要 grep 确认。
- **跑 `build:docs` 时 dev server 还活着。** 见 §3.1，要么 kill，要么清掉 `.next/`。
- **某个 locale 的字典漏写。** SSR 不会在 build 时报错，而是会在该 locale 真正被访问时才抛 —— 另一个 locale 还能正常 build 蒙混过关。永远两个 locale 同时加。
- **旧笔记里写的还是 `apps/docs/app/layout.tsx` / `apps/docs/app/components/<name>/page.tsx`。** 那套路径已经过时，当前路由全部在 `app/[locale]/...` 下。看到旧指引要么改要么忽略。
- **把 `.codebuddy/` 里的内容当成仓库状态来引用。** 它是 gitignore 的，协作者根本拿不到。任何需要共享的内容都必须落到 `CODEBUDDY.md`、`README.md` 或真实代码里。
- **样式里出现纯黑 `#000` / 纯白 `#fff`。** 不符合品牌色，要用 `tokens.css` 里的 `--sui-ink` / `--sui-canvas`。
- **测试文件位置漂移。** 早期版本把 `<Name>.test.tsx` 放在组件目录里；现在统一搬到 `packages/core/test/unit/<Name>.test.tsx`，import 路径走 `../../src/components/<Name>/<Name>`。新增测试时不要再回到老路径。
- **`Select` displayLabel 的初始时序问题。** Trigger 上显示的 label 依赖 `Option` 通过 `useEffect` 注册到 registry；刚 mount 时 trigger 会先渲染 raw `value`（例如 `"a"`）一帧，下一次 commit 才换成对应 `Option` 的 label。写测试时不要把 trigger 的可见文本当作选中状态的真值，改用 `aria-selected` 或 hidden input 的 `value` 来断言。
- **`jsdom` 没有 `Element.scrollIntoView`。** Listbox / Modal 等会 `el.scrollIntoView({...})`，jsdom 里默认抛 `not a function`。`packages/core/test/setup.ts` 已经把它 polyfill 成 no-op，新写的测试不需要再补；但**写新组件**时如果用了别的 jsdom 不实现的 DOM API，记得在 setup 里补上。

---

## 9. 排查问题先看哪里

| 想做的事 | 入口 |
|---|---|
| 看某个组件的对外 API | `packages/core/src/components/<Name>/<Name>.tsx`（顶部的 props interface）。 |
| 看活的 demo | `apps/docs/app/[locale]/components/<name>/<Name>Doc.client.tsx`。 |
| 改 token（颜色、阴影、圆角） | `packages/core/src/styles/tokens.css`。 |
| 加一个抖动滤镜 id | `packages/core/src/components/HandDrawnFilters/HandDrawnFilters.tsx`。 |
| 修复 `dist/styles/components.css` 坏掉的 import | `packages/core/tsup.config.ts`（`cssFiles`）和 `packages/core/src/styles/components.css`。 |
| 改文档站侧边栏 / 首页文案 | `apps/docs/app/[locale]/layout.tsx`、`apps/docs/app/[locale]/page.tsx`。 |
| 调 i18n 文案 | `apps/docs/i18n/dictionaries/{en-US,zh-CN}/...`。 |

---

## 10. AI 助手不要擅自做的事（除非用户明确要求）

- 在已有文档之外创建新的顶层文档（`*.md`）。
- 改写 commit 历史（`rebase -i`、`amend`、对共享分支 `reset --hard`）。
- 给 `packages/core` 加新依赖或 peer deps。
- 重命名 `packages/core/src/index.ts` 里的公共导出（破坏性变更）。
- 改动 `.codebuddy/`、`.workbuddy/`、`.claude/`、`.cursor/` 里的任何东西，并把它当作仓库内容来用。

不确定就问。
