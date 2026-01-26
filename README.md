# notiflow
currently working on this 🙂

src/
├── index.ts                      # Public API exports ONLY
│
├── core/
│   ├── notify.ts                 # notify(), notify.update(), notify.promise()
│   ├── storeBridge.ts            # Bridge between core API & React store
│   ├── timeoutManager.ts         # Centralized toast lifecycle timers
│   └── constants.ts              # Animation + system constants
│
├── store/
│   └── toastStore.tsx             # ToastProvider, reducer, context
│
├── components/
│   ├── NotifyContainer.tsx        # Position-based containers & stacking
│   └── Toast.tsx                  # Toast UI, animations, themes
│
├── types/
│   └── types.ts                   # ALL shared TypeScript types
│
├── utils/
│   └── generateId.ts              # Toast ID generator
│
└── styles/                        # (Optional / future)
    └── README.md                  # Placeholder for future CSS theming
