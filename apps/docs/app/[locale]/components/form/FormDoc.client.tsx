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

import type { FormDoc } from '../../../../i18n/dictionaries/zh-CN/components/form';

// ---------------------------------------------------------------------------
// Demo 1 — native controlled with useState + manual validation
// ---------------------------------------------------------------------------

type NativeErrors = {
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
};

function NativeControlledDemo({ submittedLine }: { submittedLine: string }) {
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
          {submittedLine}{' '}
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
// Page client
// ---------------------------------------------------------------------------

/**
 * `dict.components.form` is widened to `ComponentDoc` by the `Dictionary`
 * type, but actually carries the richer `FormDoc` extension. Re-narrow here.
 */
export function FormDocClient({ t: tBase }: { t: unknown }) {
  const t = tBase as FormDoc;

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Philosophy ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.philosophy}</h2>
        <p>{t.philosophy.intro}</p>
        <ul style={{ paddingLeft: 22, lineHeight: 1.8 }}>
          <li>{t.philosophy.bulletRhf}</li>
          <li>{t.philosophy.bulletNative}</li>
          <li>{t.philosophy.bulletOthers}</li>
        </ul>
        <p>{t.philosophy.outro}</p>
      </section>

      {/* === Demo 1 — native controlled ===================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.nativeControlled}</h2>
        <p className="doc-lede">{t.demos.nativeLede}</p>
        <div className="doc-demo doc-demo--column">
          <NativeControlledDemo submittedLine={t.submittedLine} />
        </div>
      </section>

      {/* === Demo 2 — horizontal layout ===================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.horizontal}</h2>
        <p className="doc-lede">{t.demos.horizontalLede}</p>
        <div className="doc-demo doc-demo--column">
          <HorizontalLayoutDemo />
        </div>
      </section>

      {/* === Demo 3 — error states ========================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.errorStates}</h2>
        <div className="doc-demo doc-demo--column">
          <ErrorStatesDemo />
        </div>
      </section>

      {/* === RHF + zod ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.rhf}</h2>
        <p>{t.rhf.intro}</p>
        <pre className="doc-code">
          <code>{t.installCmd}</code>
        </pre>
        <p>{t.rhf.body}</p>
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
        <p className="doc-note">{t.rhf.footer}</p>
      </section>

      {/* === API — Form ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.apiForm}</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.api.headers.name}</th>
              <th>{t.api.headers.type}</th>
              <th>{t.api.headers.default}</th>
              <th>{t.api.headers.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>layout</code></td>
              <td><code>&apos;vertical&apos; | &apos;horizontal&apos;</code></td>
              <td><code>&apos;vertical&apos;</code></td>
              <td>{t.api.rows.layout?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</code></td>
              <td><code>&apos;md&apos;</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>onSubmit</code></td>
              <td><code>(e) =&gt; void</code></td>
              <td>—</td>
              <td>{t.api.rows.onSubmit?.description}</td>
            </tr>
            <tr>
              <td><code>noValidate</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.noValidate?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === API — Form.Item ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.apiFormItem}</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.apiFormItem.headers.name}</th>
              <th>{t.apiFormItem.headers.type}</th>
              <th>{t.apiFormItem.headers.default}</th>
              <th>{t.apiFormItem.headers.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>{t.apiFormItem.rows.label?.description}</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.apiFormItem.rows.required?.description}</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>{t.apiFormItem.rows.error?.description}</td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>{t.apiFormItem.rows.helperText?.description}</td>
            </tr>
            <tr>
              <td><code>layout</code></td>
              <td><code>&apos;vertical&apos; | &apos;horizontal&apos;</code></td>
              <td>inherit</td>
              <td>{t.apiFormItem.rows.layout?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</code></td>
              <td>inherit</td>
              <td>{t.apiFormItem.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>htmlFor</code></td>
              <td><code>string</code></td>
              <td>auto</td>
              <td>{t.apiFormItem.rows.htmlFor?.description}</td>
            </tr>
            <tr>
              <td>
                <code>labelClassName</code> / <code>controlClassName</code>
              </td>
              <td><code>string</code></td>
              <td>—</td>
              <td>{t.apiFormItem.rows.slotClassName?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === Not does ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.notDoes}</h2>
        <ul style={{ paddingLeft: 22, lineHeight: 1.8 }}>
          <li>{t.notDoes.item1}</li>
          <li>{t.notDoes.item2}</li>
          <li>{t.notDoes.item3}</li>
          <li>{t.notDoes.item4}</li>
          <li>{t.notDoes.item5}</li>
        </ul>
      </section>
    </article>
  );
}
