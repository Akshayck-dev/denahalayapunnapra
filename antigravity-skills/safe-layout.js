export default {
    name: "safe-layout",
    description: "Convert layout to flex (no break)",

    execute: async ({ element }) => {
        if (!element) return "❌ No element";

        element.style.display = "flex";
        element.style.gap = "20px";
        element.style.alignItems = "center";

        return "✅ Layout converted to flex";
    }
};