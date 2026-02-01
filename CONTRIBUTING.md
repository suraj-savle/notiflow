# 🤝 Contributing to Notiflow

First off — **thank you for even considering contributing** 🙌
Notiflow is an open-source toast notification library, and every contribution (big or small) matters.

This guide explains **how to contribute properly** without breaking things.

## 🚀 Ways You Can Contribute

You don’t need to be a wizard. You can help by:

* 🐞 Fixing bugs
* ✨ Improving UI / animations
* 🎨 Enhancing themes (light/dark/gradients)
* 🧠 Improving TypeScript types
* 🧪 Adding tests or examples
* 📚 Improving documentation
* ⚡ Performance improvements

If you’re unsure, open an **Issue** first — we’ll guide you.

## 🧱 Project Structure (Important)

Before touching code, understand this:

```
src/
├── index.ts                    # Public API exports ONLY
│
├── core/                       # Core logic (NO UI)
│   ├── notify.ts
│   ├── storeBridge.ts
│   ├── timeoutManager.ts
│   ├── animations.ts
│   └── constants.ts
│
├── store/                      # State management
│   └── toastStore.tsx
│
├── components/                 # UI components ONLY
│   ├── NotifyContainer.tsx
│   └── Toast.tsx
│
├── styles/                     # Styling system
│   ├── notiflow.css            # Static base styles (optional import)
│   ├── variables.css           # CSS variables (colors, fonts)
│   └── injectStyles.ts         # 🚨 ONLY FILE THAT MUTATES UI AT RUNTIME
│
├── internal/                   # Pure logic helpers (NO JSX)
│   ├── resolveIcon.ts
│   ├── resolveTheme.ts
│   └── resolvePosition.ts
│
├── types/                      # Shared TypeScript types
│   └── types.ts
│
├── utils/
│   └── generateId.ts

```
🔥 **Important Rule (this answers your concern)**

❗ **ONLY `injectStyles.ts` is allowed to:**
- Inject CSS  
- Modify UI styles  
- Define default look & feel  
- Control fonts, spacing, colors  

✅ **Everything else exists for:**
- Type safety  
- Auto-completion  
- Logic reuse  
- Separation of concerns  

### Meaning:
- `Toast.tsx` ❌ should **NOT** define styles  
- `NotifyContainer.tsx` ❌ should **NOT** inject CSS  
- `notiflow.css` ✅ optional fallback / manual import  
- `injectStyles.ts` ✅ single source of UI truth  

⚠️ **Rules**

* ❌ No UI logic in `core/`
* ❌ No business logic inside JSX
* ✅ UI stays in `components/`
* ✅ Helpers go in `internal/`

## 🛠️ Local Setup

1.Fork & Clone
```bash
git clone https://github.com/suraj-savle>/notiflow.git
```
```bash
cd notiflow
```

2.Install & Run

```bash
npm npm install
```

3.Local Linking (Testing in your own app)

```bash
# Inside the notiflow directory
npm link
```
```bash
# Inside your test project
npm link notiflow
```

## 🧪 Testing Your Changes

Before opening a PR, make sure:

* Toasts render correctly
* Icons work (default + custom)
* Light / Dark mode works
* Feedback toast works
* No TypeScript errors
* No console errors

If you add a feature → **add an example**.

## 🧩 Coding Guidelines

### TypeScript

* Prefer **explicit types**
* Avoid `any`
* Update `types/types.ts` if you add new options

### CSS

* Styles must live in **injectStyles.ts**
* Do NOT rely on global CSS
* Use CSS variables:

  * `--toast-bg`
  * `--toast-text`
  * `--toast-progress`

### React

* Functional components only
* No unnecessary re-renders
* Keep components clean & readable


## 📝 Commit Message Format

Use clear commits:

```text
feat: add gradient themes for dark mode
fix: close icon not visible in dark mode
docs: improve README usage examples
refactor: move icon logic to internal resolver
```

## 📦 Pull Request Rules

Before opening a PR:

* ✅ Code builds without errors
* ✅ Feature is documented
* ✅ No unrelated changes
* ✅ One feature or fix per PR

PR title example:

```
feat: improve feedback toast UI
```


## 💬 Questions / Ideas?

* Open a **GitHub Issue**
* Describe what you want to change
* Screenshots / GIFs are welcome


## ❤️ Final Note

Notiflow is built to be:

* simple
* flexible
* developer-friendly

If something feels confusing — that itself is a bug.
Thanks for helping make it better 🚀
