export default {
    name: "auto-fix-ui",
    description: "Auto fix UI safely (no global break)",

    execute: async ({ element }) => {
        if (!element) return "❌ No element";

        const cls = "auto-" + Date.now();
        element.classList.add(cls);

        const style = document.createElement("style");
        style.innerHTML = `
      .${cls} {
        position: relative !important;
        margin-top: 20px;
      }
    `;
        document.head.appendChild(style);

        return "✅ UI fixed safely";
    }
};