<script lang="ts" setup>
import { ref, computed, watch, toRefs, defineProps, defineEmits, onMounted, nextTick } from "vue";

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  type: { type: String as () => "text" | "password" | "email" | "number" | "textarea", default: "text" },
  id: { type: String, default: undefined },
  name: { type: String, default: undefined },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
  size: { type: String as () => "sm" | "md" | "lg", default: "md" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  autosize: { type: Boolean, default: false }, // only for textarea
  maxlength: { type: [Number, String], default: undefined },
  autocomplete: { type: String, default: undefined },
});

const emits = defineEmits(["update:modelValue", "input", "focus", "blur", "clear"]);

const { modelValue, type, autosize } = toRefs(props);

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
const internalValue = ref(modelValue.value as string | number);

watch(modelValue, (v) => (internalValue.value = v as any));
watch(internalValue, (v) => emits("update:modelValue", v));

const computedId = computed(() => props.id ?? `input-${Math.random().toString(36).slice(2, 9)}`);
const describedBy = computed(() => (props.error ? `${computedId.value}-error` : undefined));

function onInput(e: Event) {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  internalValue.value = target.value as any;
  emits("input", e);
  if (props.type === "textarea" && props.autosize) {
    nextTick(() => autosizeTextarea());
  }
}

function onFocus(e: FocusEvent) {
  emits("focus", e);
}
function onBlur(e: FocusEvent) {
  emits("blur", e);
}

function clear() {
  if (props.disabled || props.readonly) return;
  internalValue.value = "";
  emits("clear");
  // focus after clearing
  nextTick(() => inputRef.value?.focus());
}

function autosizeTextarea() {
  if (!inputRef.value || props.type !== "textarea") return;
  const ta = inputRef.value as HTMLTextAreaElement;
  ta.style.height = "auto";
  ta.style.height = `${ta.scrollHeight}px`;
}

onMounted(() => {
  if (props.type === "textarea" && props.autosize) autosizeTextarea();
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "base-input--sm";
    case "lg":
      return "base-input--lg";
    default:
      return "base-input--md";
  }
});
</script>

<template>
  <div class="base-input">
    <label v-if="label" :for="computedId" class="base-input__label"
      >{{ label }}<span v-if="required" aria-hidden="true"> *</span></label
    >

    <div :class="['base-input__control', sizeClass, { 'is-disabled': disabled, 'is-error': !!error }]">
      <slot name="prefix" />

      <template v-if="type !== 'textarea'">
        <input
          :id="computedId"
          :name="name"
          :type="type"
          ref="inputRef"
          class="base-input__input"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :autocomplete="autocomplete"
          :aria-invalid="!!error"
          :aria-describedby="describedBy"
          :value="internalValue"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"

          
        />
      </template>

      <template v-else>
        <textarea
          :id="computedId"
          :name="name"
          ref="inputRef"
          class="base-input__input base-input__textarea"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :autocomplete="autocomplete"
          :aria-invalid="!!error"
          :aria-describedby="describedBy"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          >{{ internalValue }}</textarea
        >
      </template>

      <slot name="suffix" />

      <button
        v-if="clearable && internalValue && !disabled && !readonly"
        type="button"
        class="base-input__clear"
        @click="clear"
        aria-label="Clear input"
      >
        ×
      </button>
    </div>

    <p v-if="error" :id="`${computedId}-error`" class="base-input__error" role="alert">{{ error }}</p>
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  display: flex;
  flex-direction: column;
}
.base-input:focus-within .base-input__control {
  outline: 2px solid var(--ring);
}

.base-input__label {
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--foreground);
}
.base-input__control {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  padding: 6px 8px;
  border-radius: var(--radius);
  background: #fff;
}
.base-input__input {
  border: none;
  outline: none;
  font-size: 1rem;
  flex: 1 1 auto;
  background: transparent;
}
.base-input__textarea {
  resize: none;
  min-height: 80px;
}
.base-input--sm {
  padding: 4px 6px;
}
.base-input--md {
  padding: 6px 8px;
}
.base-input--lg {
  padding: 10px 12px;
}
.base-input__clear {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px;
}
.base-input.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}
.base-input.is-error .base-input__control {
  border-color: var(--destructive);
}
.base-input__error {
  margin-top: 2px;
  color: var(--destructive);
  font-size: 0.75rem;
}
</style>
