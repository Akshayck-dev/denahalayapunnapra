export default {
    name: "protect-global",
    description: "Detect global conflicts",

    execute: async ({ element }) => {
        if (!element) return "❌ No element";

        const classes = [...element.classList];
        let warning = false;

        classes.forEach(cls => {
            if (document.querySelectorAll("." + cls).length > 1) {
                warning = true;
            }
        });

        if (warning) {
            return "⚠️ Global conflict detected! Use auto-fix-ui";
        }

        return "✅ No conflict";
    }
};