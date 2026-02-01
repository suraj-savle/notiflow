# 🔔 Notiflow

A modern, lightweight, **fully customizable notification (toast) library for React**.  
Built to be flexible, themeable, and developer-friendly — without forcing opinions.

> Notiflow is designed for developers who want **full control**, clean APIs, and a solid base to build their own notification experience.

## ✨ Features

- ⚡ **Simple API** — `notify()`, `notify.success()`, `notify.error()`, etc.
- 🎨 **Light & Dark mode** support
- 🧩 **Fully customizable themes**
- 🔄 **Promise-based toasts** (loading → success → error)
- 📝 **Feedback toast** (collect user input easily)
- 📍 **Multiple positions** (top/bottom, left/middle/right)
- 🎬 **Smooth animations** (slide, bounce, zoom)
- 🧠 **Type-safe (TypeScript first)**
- 🧱 **No external CSS dependency required**
- 🧼 **Zero global CSS pollution**
- 🪶 Lightweight

## 🤔 Why Notiflow?

We didn’t build Notiflow to replace other libraries.  
We built it because we wanted:

- Our **own theming system**
- A **clean internal architecture**
- Better control over **icons, animations, and feedback UI**
- A toast system that feels **hackable**, not locked-in

Notiflow is for developers who enjoy building and customizing — not just installing and forgetting.

##Local Linking (Testing in your own app)

```bash
# Inside the notiflow directory
npm link
```
```bash
# Inside your test project
npm link notiflow
```

## 🚀 Basic Usage

### 1️⃣ Mount the container (once)

```tsx
import { NotifyContainer } from "notiflow";

function App() {
  return (
    <>
      <NotifyContainer />
      {/* your app */}
    </>
  );
}
```

---

### 2️⃣ Trigger a toast

```tsx
import { notify } from "notiflow";

notify("Hello Notiflow 👋");
```

---

## ✅ Preset Helpers

```tsx
notify.success("Saved successfully");
notify.error("Something went wrong");
notify.warning("Be careful!");
notify.info("Just so you know");
```

## ⏳ Promise Toasts

Perfect for API calls.

```tsx
notify.promise(
  fetch("/api/save"),
  {
    loading: "Saving...",
    success: "Saved successfully 🎉",
    error: "Failed to save ❌",
  }
);
```


## 🔄 Update a Toast

```tsx
const id = notify("Uploading...", { status: "loading", duration: 0 });

setTimeout(() => {
  notify.update(id, {
    message: "Upload complete 🚀",
    status: "success",
    duration: 3000,
  });
}, 2000);
```

## 📝 Feedback Toast

Collect user feedback with minimal setup.

```tsx
notify.feedback({
  title: "Quick feedback",
  placeholder: "Tell us what went wrong...",
  onSubmit: async (text) => {
    await sendToServer(text);
    return "Thanks for the feedback 💙";
  },
});
```

* Includes helper text
* Input validation
* Async submit support
* Clean UI with close (X) button


## 🎨 Theme & Mode

```tsx
notify("Dark mode toast", {
  mode: "dark",
  theme: "success",
});
```

Supports:

* `light` / `dark`
* Preset themes: `default`, `success`, `error`, `warning`, `info`
* Custom theme objects


## 📂 Examples

More advanced and real-world examples are available in:


> /examples


Including:

* Promise flows
* Feedback usage
* Custom icons
* Position testing
* Long & draggable toasts


## 🛠 Architecture (High level)

* **core/** → logic only (no UI)
* **components/** → React UI
* **internal/** → pure resolvers (icon, theme, position)
* **styles/** → styling & runtime injection
* **types/** → shared TypeScript contracts

Clean separation. Easy to extend.

## 🌱 Future Scope

* 🎯 Custom toast layouts
* 🌈 More animation presets
* 🧩 Plugin system (icons / themes)
* ♿ Accessibility improvements
* 🧪 Better testing utilities
* 🌍 i18n-friendly feedback UI

## 🤝 Contributing

Contributions are welcome ❤️
Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening a PR.

Whether it’s:

* Bug fixes
* New features
* Docs improvements
* Examples

You’re welcome here.
