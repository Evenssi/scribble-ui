import type { ComponentDoc } from '../index';

/** Form 有 2 张 API 表（Form / Form.Item） */
export type FormDoc = ComponentDoc & {
  apiHeadings: {
    form: string;
    formItem: string;
  };
  apiFormItem: ComponentDoc['api'];
  /** 内嵌的几个段落需要单独承载（包括 ul 列表项） */
  philosophy: {
    intro: string;
    bulletRhf: string;
    bulletNative: string;
    bulletOthers: string;
    outro: string;
  };
  rhf: {
    intro: string;
    install: string;
    body: string;
    footer: string;
  };
  notDoes: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
  };
  demos: {
    nativeLede: string;
    horizontalLede: string;
  };
  installCmd: string;
  submittedLine: string;
};

export const formZh: FormDoc = {
  title: 'Form',
  lede:
    '一层刻意保持极薄的视觉外壳：`<Form>` 设定布局并挂载 `<form noValidate>`，`<Form.Item>` 在你放进去的任何控件周围排布 label / 必填标记 / 错误 / 帮助文案。仅此而已。',
  sections: {
    philosophy: '设计哲学——状态自带',
    nativeControlled: '原生受控（useState）',
    horizontal: '横向布局',
    errorStates: '错误与帮助态',
    rhf: '配合 react-hook-form + zod',
    apiForm: 'Props — Form',
    apiFormItem: 'Props — Form.Item',
    notDoes: 'Form 不做什么',
  },
  notes: {},
  philosophy: {
    intro:
      'scribble-ui 刻意 *不* 自带表单引擎。本库内的每个字段组件（Input、Textarea、Select、Checkbox、Switch、NumberInput、Slider、DatePicker……）都已遵循受控的 `value` / `onChange` / `error` 标准契约，因此可直接接入你偏好的任意状态库：',
    bulletRhf:
      '**react-hook-form** —— 把任意字段包进 `<Controller>`，把 `field.value` / `field.onChange` 转交给我们的组件。配合 `@hookform/resolvers/zod` 即可获得 schema-first 校验。（推荐——shadcn/ui 也是这条路线。）',
    bulletNative:
      '**纯 React** —— 对小表单，`useState` + `onSubmit` 完全够用，下方 Demo 1 即是示例。',
    bulletOthers:
      '**formik / TanStack Form / react-final-form** —— 同理，把这些库的 field prop bag 接到我们的组件上即可。',
    outro:
      '我们刻意跳过了表单引擎层。已经做完整表单的项目通常都已有自己的状态方案；规模较小的项目则可借助 `useState`。无论哪种情况，`Form.Item` 都依然有用。',
  },
  rhf: {
    intro:
      'react-hook-form 与 zod **不是** peer 依赖——它们是 opt-in。仅当你需要这套集成时再安装：',
    body: '然后用 `<Controller>` 接入任意 scribble-ui 字段。这是规范写法：',
    footer:
      '只要 scribble-ui 字段同时支持 `value` + `onChange` + `error`，都可用同样的方式放进 `Controller`——Switch、Checkbox、NumberInput、Slider、DatePicker、Select、Textarea。',
    install: '',
  },
  notDoes: {
    item1: '没有表单 store，没有超出 `layout` 与 `size` 的 context。',
    item2: '没有内置校验器。*所有* 校验都在你选用的库里执行。',
    item3:
      '没有字段数组、跨字段订阅、条件字段。这些请用你的表单库提供的原语。',
    item4: '没有 `Form.useForm`，没有 `FormProvider`，没有 `useField`。',
    item5:
      '不会克隆或注入除 `htmlFor` 之外的任何 prop 到子组件上。我们不想跟你的 Controller 抢戏。',
  },
  demos: {
    nativeLede: '零额外依赖。提交时校验，通过 `Form.Item` 的 `error` prop 暴露错误。',
    horizontalLede:
      '在 `Form` 上设置 `layout="horizontal"`，所有后代 `Form.Item` 都会共用 label 列宽。',
  },
  installCmd: 'pnpm add react-hook-form zod @hookform/resolvers',
  submittedLine: '已提交载荷：',
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      layout: { description: '所有后代 `Form.Item` 都会继承该值。' },
      size: { description: '所有后代 `Form.Item` 都会继承该值。影响 label 尺寸。' },
      onSubmit: {
        description:
          '原生 `form` 提交处理器。配合 react-hook-form 时，把 `handleSubmit(onValid)` 传到这里。',
      },
      noValidate: {
        description:
          '关闭浏览器内置校验 UI，由你选用的库接管校验层。',
      },
    },
  },
  apiHeadings: {
    form: 'Form',
    formItem: 'Form.Item',
  },
  apiFormItem: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      label: { description: '渲染在带自动 `htmlFor` 的 `<label>` 内。' },
      required: {
        description: '在 label 旁画一颗手绘风红色星号。仅视觉提示。',
      },
      error: {
        description:
          '为真值时以 `role="alert"` 渲染并隐藏 helper 槽位。支持字符串或 JSX。',
      },
      helperText: { description: '辅助文案。`error` 存在时被隐藏。' },
      layout: { description: '为该单项覆盖父 `Form` 的 `layout`。' },
      size: { description: '为该单项覆盖父 `Form` 的 `size`。' },
      htmlFor: {
        description:
          '显式指定 label 关联的目标。当一项含多个控件或需要特定 id 时手动传入。',
      },
      slotClassName: {
        description: 'slot 级 class 钩子，用于额外的布局覆盖。',
      },
    },
  },
};
