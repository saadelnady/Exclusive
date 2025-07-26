export const attributeConfig = {
  color: {
    fields: [
      { name: "title.ar", label: "اللون (عربي)", type: "text" },
      { name: "title.en", label: "اللون (إنجليزي)", type: "text" },
      { name: "value", label: "درجة اللون", type: "color" },
    ],
  },
  size: {
    fields: [
      { name: "title.ar", label: "وحدة القياس (عربي)", type: "text" },
      { name: "title.en", label: " وحدة القياس (إنجليزي)", type: "text" },
      { name: "value", label: "القيمة", type: "text" },
    ],
  },
  weight: {
    fields: [
      { name: "title.ar", label: "  وحدة الوزن (عربي)", type: "text" },
      { name: "title.en", label: " وحدة الوزن (إنجليزي)", type: "text" },
      { name: "value", label: "قيمة الوزن", type: "number", step: "0.01" },
    ],
  },
  dimensions: {
    fields: [
      { name: "title.ar", label: "الأبعاد (عربي)", type: "text" },
      { name: "title.en", label: "الأبعاد (إنجليزي)", type: "text" },
      { name: "value.length", label: "الطول (سم)", type: "number" },
      { name: "value.width", label: "العرض (سم)", type: "number" },
      { name: "value.height", label: "الارتفاع (سم)", type: "number" },
    ],
  },
};
