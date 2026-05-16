import type { FormDoc } from '../../zh-CN/components/form';

export const formEn: FormDoc = {
  title: 'Form',
  lede:
    "A deliberately thin visual shell: `<Form>` sets the layout and mounts a `<form noValidate>`, `<Form.Item>` lays out the label / required mark / error / helper around whatever control you drop in. That's it.",
  sections: {
    philosophy: 'Philosophy — bring your own state',
    nativeControlled: 'Native controlled (useState)',
    horizontal: 'Horizontal layout',
    errorStates: 'Error & helper states',
    rhf: 'With react-hook-form + zod',
    apiForm: 'Props — Form',
    apiFormItem: 'Props — Form.Item',
    notDoes: 'What Form does NOT do',
  },
  notes: {},
  philosophy: {
    intro:
      'scribble-ui intentionally does *not* ship its own form engine. Every field component in this library (Input, Textarea, Select, Checkbox, Switch, NumberInput, Slider, DatePicker, …) already speaks the standard controlled `value` / `onChange` / `error` contract, which means they snap directly into whichever state library you prefer:',
    bulletRhf:
      '**react-hook-form** — wrap any field in a `<Controller>` and forward `field.value` / `field.onChange` to our component. Combine with `@hookform/resolvers/zod` for schema-first validation. (Recommended — this is the same route shadcn/ui uses.)',
    bulletNative:
      "**Plain React** — `useState` + `onSubmit` work fine for small forms, as Demo 1 shows.",
    bulletOthers:
      "**formik / TanStack Form / react-final-form** — same story, wire the library's field prop bag into our components.",
    outro:
      "We skipped the form-engine layer on purpose. Projects that need full forms usually already have one, and projects that don't can lean on `useState`. Either way, `Form.Item` stays useful.",
  },
  rhf: {
    intro:
      "react-hook-form and zod are **not** declared as a peer dependency — they're opt-in. Install them only if you want the integration:",
    body: "Then wire any scribble-ui field with `<Controller>`. Here's the canonical shape:",
    footer:
      'Every scribble-ui field that exposes `value` + `onChange` + `error` works inside a `Controller` the same way — Switch, Checkbox, NumberInput, Slider, DatePicker, Select, Textarea.',
    install: '',
  },
  notDoes: {
    item1: 'No form store, no context beyond `layout` and `size`.',
    item2: 'No built-in validators. *All* validation runs in your chosen library.',
    item3:
      "No field arrays, no cross-field subscribe, no conditional fields. Use your form library's primitives for those.",
    item4: 'No `Form.useForm`, no `FormProvider`, no `useField`.',
    item5:
      "No cloning or injecting props onto children beyond `htmlFor`. We don't want to fight your Controller.",
  },
  demos: {
    nativeLede: 'Zero extra dependencies. Validate on submit, surface errors via the `error` prop on `Form.Item`.',
    horizontalLede:
      'Set `layout="horizontal"` on `Form` to share label columns across every descendant `Form.Item`.',
  },
  installCmd: 'pnpm add react-hook-form zod @hookform/resolvers',
  submittedLine: 'Submitted payload:',
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      layout: { description: 'Inherited by every descendant `Form.Item`.' },
      size: { description: 'Inherited by every descendant `Form.Item`. Affects label sizing.' },
      onSubmit: {
        description:
          'Native `form` submit handler. With react-hook-form, pass `handleSubmit(onValid)` here.',
      },
      noValidate: {
        description:
          "Turns off the browser's built-in validation UI so your library of choice owns that layer.",
      },
    },
  },
  apiHeadings: {
    form: 'Form',
    formItem: 'Form.Item',
  },
  apiFormItem: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      label: { description: 'Rendered inside a `<label>` with a generated `htmlFor`.' },
      required: {
        description: 'Paints a hand-drawn red asterisk next to the label. Purely visual.',
      },
      error: {
        description:
          'When truthy, rendered in `role="alert"` and hides the helper slot. Supports strings or JSX.',
      },
      helperText: { description: 'Supplementary copy. Hidden whenever `error` is present.' },
      layout: { description: "Overrides the parent `Form`'s `layout` for this single item." },
      size: { description: "Overrides the parent `Form`'s `size` for this single item." },
      htmlFor: {
        description:
          'Explicit label target. Pass your own when you have multiple controls or want a specific id.',
      },
      slotClassName: {
        description: 'Slot-level class hooks for extra layout overrides.',
      },
    },
  },
};
