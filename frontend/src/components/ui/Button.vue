<script lang="ts" setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  type: { type: String as () => "button" | "submit" | "reset", default: "button" },
  variant: { type: String as () => "primary" | "secondary" | "outline" | "ghost" | "danger", default: "primary" },
  size: { type: String as () => "sm" | "md" | "lg", default: "md" },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
});

const emits = defineEmits(["click"]);

function onClick(e: MouseEvent) {
  if (props.disabled || props.loading) {
    e.preventDefault();
    return;
  }
  emits("click", e);
}

const classes = computed(() => [
  "base-button",
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  { "is-disabled": props.disabled, "is-loading": props.loading, "is-block": props.block },
]);
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="classes" @click="onClick">
    <span v-if="loading" class="base-button__spinner" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, opacity 0.2s;
}
.base-button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}
.base-button--sm {
  font-size: 0.85rem;
  padding: 4px 10px;
}
.base-button--md {
  font-size: 1rem;
  padding: 6px 14px;
}
.base-button--lg {
  font-size: 1.1rem;
  padding: 10px 18px;
}

/* Variants */
.base-button--primary {
  background: var(--primary);
  color: #fff;
}
.base-button--primary:hover:not(.is-disabled):not(.is-loading) {
  background: #1e40af;
}

.base-button--secondary {
  background: #e5e7eb;
  color: #111827;
}
.base-button--secondary:hover:not(.is-disabled):not(.is-loading) {
  background: #d1d5db;
}

.base-button--outline {
  background: transparent;
  border: 1px solid #d1d5db;
  color: #111827;
}
.base-button--outline:hover:not(.is-disabled):not(.is-loading) {
  background: #f3f4f6;
}

.base-button--ghost {
  background: transparent;
  color: #111827;
}
.base-button--ghost:hover:not(.is-disabled):not(.is-loading) {
  background: #f9fafb;
}

.base-button--danger {
  background: #ef4444;
  color: #fff;
}
.base-button--danger:hover:not(.is-disabled):not(.is-loading) {
  background: #b91c1c;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.is-block {
  display: flex;
  width: 100%;
}

/* Spinner */
.base-button__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
