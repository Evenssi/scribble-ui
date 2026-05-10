'use client';

import { useState, type FormEvent } from 'react';
import {
  Form,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Button,
  NumberInput,
  DatePicker,
} from 'scribble-ui';
// Reuse the Button page's doc-* class set so all component pages share styles.
import '../button/page.css';

// ---------------------------------------------------------------------------
// Demo 1 — native controlled with useState + manual validation
// ---------------------------------------------------------------------------

type NativeErrors = {
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
};

function NativeControlledDemo() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
  });
  const [errors, setErrors] = useState<NativeErrors>({});
  const [submitted, setSubmitted] = useState<typeof values | null>(null);

  function validate(v: typeof values): NativeErrors {
    const next: NativeErrors = {};
    if (v.username.trim().length < 3) {
      next.username = 'Username must be at least 3 characters.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (v.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (v.bio.length > 140) {
      next.bio = 'Keep it under 140 characters.';
    }
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(values);
    } else {
      setSubmitted(null);
    }
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item
        label="Username"
        required
        error={errors.username}
        helperText="3+ characters. Letters, digits, underscores."
      >
        <Input
          id="native-username"
          value={values.username}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, username: e.target.value }))
          }
          error={Boolean(errors.username)}
          placeholder="ada_lovelace"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        required
        error={errors.email}
      >
        <Input
          id="native-email"
          type="email"
          value={values.email}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
          error={Boolean(errors.email)}
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        required
        error={errors.password}
        helperText="8+ characters. Mix it up."
      >
        <Input
          id="native-password"
          type="password"
          value={values.password}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
          error={Boolean(errors.password)}
          placeholder="••••••••"
        />
      </Form.Item>

      <Form.Item
        label="Bio"
        error={errors.bio}
        helperText={`${values.bio.length} / 140 characters`}
      >
        <Textarea
          id="native-bio"
          value={values.bio}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, bio: e.target.value }))
          }
          error={Boolean(errors.bio)}
          placeholder="Tell us something delightful."
          rows={3}
        />
      </Form.Item>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <Button type="submit">Submit</Button>
        <Button
          type="button"
          onClick={() => {
            setValues({ username: '', email: '', password: '', bio: '' });
            setErrors({});
            setSubmitted(null);
          }}
        >
          Reset
        </Button>
      </div>

      {submitted ? (
        <p className="doc-note" style={{ marginTop: 12 }}>
          Submitted payload:{' '}
          <code>{JSON.stringify(submitted)}</code>
        </p>
      ) : null}
    </Form>
  );
}

// ---------------------------------------------------------------------------
// Demo 2 — horizontal layout with a variety of field types
// ---------------------------------------------------------------------------

function HorizontalLayoutDemo() {
  const [settings, setSettings] = useState<{
    displayName: string;
    role: string;
    notifications: boolean;
    marketing: boolean;
    teamSize: number;
    joinDate: Date | null;
  }>({
    displayName: 'Ada',
    role: 'admin',
    notifications: true,
    marketing: false,
    teamSize: 8,
    joinDate: new Date('2025-09-15T00:00:00'),
  });

  return (
    <Form layout="horizontal">
      <Form.Item label="Display name">
        <Input
          id="h-display-name"
          value={settings.displayName}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, displayName: e.target.value }))
          }
        />
      </Form.Item>

      <Form.Item label="Role" helperText="Controls what this account can see and edit.">
        <Select
          value={settings.role}
          onChange={(role) =>
            setSettings((prev) => ({ ...prev, role }))
          }
          options={[
            { value: 'admin', label: 'Administrator' },
            { value: 'editor', label: 'Editor' },
            { value: 'viewer', label: 'Viewer' },
          ]}
        />
      </Form.Item>

      <Form.Item label="Team size">
        <NumberInput
          id="h-team-size"
          value={settings.teamSize}
          onChange={(teamSize) =>
            setSettings((prev) => ({
              ...prev,
              teamSize: teamSize ?? 0,
            }))
          }
          min={1}
          max={200}
        />
      </Form.Item>

      <Form.Item label="Join date">
        <DatePicker
          id="h-join-date"
          value={settings.joinDate}
          onChange={(joinDate) =>
            setSettings((prev) => ({ ...prev, joinDate }))
          }
        />
      </Form.Item>

      <Form.Item label="Notifications">
        <Switch
          checked={settings.notifications}
          onChange={(notifications) =>
            setSettings((prev) => ({ ...prev, notifications }))
          }
        />
      </Form.Item>

      <Form.Item label="Marketing">
        <Checkbox
          checked={settings.marketing}
          onChange={(marketing) =>
            setSettings((prev) => ({ ...prev, marketing }))
          }
        >
          Send me the occasional product update.
        </Checkbox>
      </Form.Item>
    </Form>
  );
}

// ---------------------------------------------------------------------------
// Demo 3 — error states preview
// ---------------------------------------------------------------------------

function ErrorStatesDemo() {
  return (
    <Form layout="vertical">
      <Form.Item label="Default state" helperText="No error, no required mark.">
        <Input defaultValue="hello" />
      </Form.Item>

      <Form.Item
        label="Required field"
        required
        helperText="You'll see the red asterisk next to the label."
      >
        <Input placeholder="(this is required)" />
      </Form.Item>

      <Form.Item
        label="With error"
        required
        error="This field is required."
      >
        <Input error defaultValue="" />
      </Form.Item>

      <Form.Item
        label="JSX error"
        error={
          <>
            Must be between <strong>3</strong> and <strong>16</strong>{' '}
            characters.
          </>
        }
      >
        <Input error defaultValue="x" />
      </Form.Item>
    </Form>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FormDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Form</h1>
      <p className="doc-lede">
        A deliberately thin visual shell: <code>{`<Form>`}</code> sets the
        layout and mounts a <code>{`<form noValidate>`}</code>,{' '}
        <code>{`<Form.Item>`}</code> lays out the label / required mark /
        error / helper around whatever control you drop in. That&apos;s it.
      </p>

      <section className="doc-section">
        <h2 className="doc-h2">Philosophy — bring your own state</h2>
        <p>
          scribble-ui intentionally does <em>not</em> ship its own form engine.
          Every field component in this library (Input, Textarea, Select,
          Checkbox, Switch, NumberInput, Slider, DatePicker, …) already speaks
          the standard controlled <code>value</code> /{' '}
          <code>onChange</code> / <code>error</code> contract, which means
          they snap directly into whichever state library you prefer:
        </p>
        <ul style={{ paddingLeft: 22, lineHeight: 1.8 }}>
          <li>
            <strong>react-hook-form</strong> — wrap any field in a{' '}
            <code>{`<Controller>`}</code> and forward{' '}
            <code>field.value</code> / <code>field.onChange</code> to our
            component. Combine with <code>@hookform/resolvers/zod</code> for
            schema-first validation. (Recommended — this is the same route
            shadcn/ui uses.)
          </li>
          <li>
            <strong>Plain React</strong> — <code>useState</code> +{' '}
            <code>onSubmit</code> work fine for small forms, as Demo 1 shows.
          </li>
          <li>
            <strong>formik / TanStack Form / react-final-form</strong> — same
            story, wire the library&apos;s field prop bag into our components.
          </li>
        </ul>
        <p>
          We skipped the form-engine layer on purpose. Projects that need full
          forms usually already have one, and projects that don&apos;t can
          lean on <code>useState</code>. Either way, <code>Form.Item</code>{' '}
          stays useful.
        </p>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">Native controlled (useState)</h2>
        <p className="doc-lede">
          Zero extra dependencies. Validate on submit, surface errors via the{' '}
          <code>error</code> prop on <code>Form.Item</code>.
        </p>
        <div className="doc-demo doc-demo--column">
          <NativeControlledDemo />
        </div>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">Horizontal layout</h2>
        <p className="doc-lede">
          Set <code>layout=&quot;horizontal&quot;</code> on{' '}
          <code>Form</code> to share label columns across every descendant{' '}
          <code>Form.Item</code>.
        </p>
        <div className="doc-demo doc-demo--column">
          <HorizontalLayoutDemo />
        </div>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">Error &amp; helper states</h2>
        <div className="doc-demo doc-demo--column">
          <ErrorStatesDemo />
        </div>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">With react-hook-form + zod</h2>
        <p>
          react-hook-form and zod are{' '}
          <strong>not</strong> declared as a peer dependency — they&apos;re
          opt-in. Install them only if you want the integration:
        </p>
        <pre className="doc-code">
          <code>{`pnpm add react-hook-form zod @hookform/resolvers`}</code>
        </pre>
        <p>
          Then wire any scribble-ui field with{' '}
          <code>{`<Controller>`}</code>. Here&apos;s the canonical shape:
        </p>
        <pre className="doc-code">
          <code>{`import { Form, Input, Textarea, Button } from 'scribble-ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3, 'At least 3 characters'),
  email:    z.string().email('Please enter a valid email'),
  bio:      z.string().max(140, 'Under 140 characters, please'),
});

type FormValues = z.infer<typeof schema>;

export function ProfileForm() {
  const { control, handleSubmit, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { username: '', email: '', bio: '' },
    });

  const onValid = (values: FormValues) => console.log(values);

  return (
    <Form layout="vertical" onSubmit={handleSubmit(onValid)}>
      <Form.Item
        label="Username"
        required
        error={errors.username?.message}
      >
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              id={field.name}
              {...field}
              error={Boolean(fieldState.error)}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Email" required error={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              id={field.name}
              type="email"
              {...field}
              error={Boolean(fieldState.error)}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Bio" error={errors.bio?.message}>
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              id={field.name}
              {...field}
              error={Boolean(fieldState.error)}
              rows={3}
            />
          )}
        />
      </Form.Item>

      <Button type="submit">Save</Button>
    </Form>
  );
}`}</code>
        </pre>
        <p className="doc-note">
          Every scribble-ui field that exposes <code>value</code> +{' '}
          <code>onChange</code> + <code>error</code> works inside a{' '}
          <code>Controller</code> the same way — Switch, Checkbox,
          NumberInput, Slider, DatePicker, Select, Textarea.
        </p>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">Props — Form</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>layout</code></td>
              <td><code>&apos;vertical&apos; | &apos;horizontal&apos;</code></td>
              <td><code>&apos;vertical&apos;</code></td>
              <td>Inherited by every descendant <code>Form.Item</code>.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</code></td>
              <td><code>&apos;md&apos;</code></td>
              <td>Inherited by every descendant <code>Form.Item</code>. Affects label sizing.</td>
            </tr>
            <tr>
              <td><code>onSubmit</code></td>
              <td><code>(e) =&gt; void</code></td>
              <td>—</td>
              <td>Native <code>form</code> submit handler. With react-hook-form, pass <code>handleSubmit(onValid)</code> here.</td>
            </tr>
            <tr>
              <td><code>noValidate</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Turns off the browser&apos;s built-in validation UI so your library of choice owns that layer.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">Props — Form.Item</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>Rendered inside a <code>&lt;label&gt;</code> with a generated <code>htmlFor</code>.</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Paints a hand-drawn red asterisk next to the label. Purely visual.</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>When truthy, rendered in <code>role=&quot;alert&quot;</code> and hides the helper slot. Supports strings or JSX.</td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>Supplementary copy. Hidden whenever <code>error</code> is present.</td>
            </tr>
            <tr>
              <td><code>layout</code></td>
              <td><code>&apos;vertical&apos; | &apos;horizontal&apos;</code></td>
              <td>inherit</td>
              <td>Overrides the parent <code>Form</code>&apos;s <code>layout</code> for this single item.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</code></td>
              <td>inherit</td>
              <td>Overrides the parent <code>Form</code>&apos;s <code>size</code> for this single item.</td>
            </tr>
            <tr>
              <td><code>htmlFor</code></td>
              <td><code>string</code></td>
              <td>auto</td>
              <td>Explicit label target. Pass your own when you have multiple controls or want a specific id.</td>
            </tr>
            <tr>
              <td><code>labelClassName</code> / <code>controlClassName</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Slot-level class hooks for extra layout overrides.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="doc-section">
        <h2 className="doc-h2">What Form does NOT do</h2>
        <ul style={{ paddingLeft: 22, lineHeight: 1.8 }}>
          <li>No form store, no context beyond <code>layout</code> and{' '}
          <code>size</code>.</li>
          <li>No built-in validators. <em>All</em> validation runs in your chosen library.</li>
          <li>No field arrays, no cross-field subscribe, no conditional fields. Use your form library&apos;s primitives for those.</li>
          <li>No <code>Form.useForm</code>, no <code>FormProvider</code>, no <code>useField</code>.</li>
          <li>No cloning or injecting props onto children beyond{' '}
          <code>htmlFor</code>. We don&apos;t want to fight your Controller.</li>
        </ul>
      </section>
    </article>
  );
}
