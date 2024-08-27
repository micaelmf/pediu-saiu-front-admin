import "../demo";
import Icon from "@/js/components/icon";

/**
 * BEGIN: Badges Overview
 */
(() => {
  const codeContent = document.getElementById("badgesCodeContent");
  const form = document.getElementById("badgesForm");

  const updateCodeContent = () => {
    const classes = [form.variant.value];

    if (form.soft.checked) {
      classes.push("badge--soft");
    }

    if (form.pill.checked) {
      classes.push(form.pill.value);
    }

    if (form.with.value === "dot") {
      classes.push("badge--dot");
    }

    const joinedClasses = classes.join(" ");

    const renderBadge = (schemeClass, text) => {
      const iconTag = '<i data-icon="feather__check"></i>';

      if (form.with.value === "icon") {
        return `<span class="badge ${joinedClasses} ${schemeClass}">${iconTag}<span>${text}</span></span>`;
      }

      if (form.with.value === "onlyIcon") {
        return `<span class="badge badge--icon ${joinedClasses} ${schemeClass}">${iconTag}</span>`;
      }

      if (form.with.value === "inButton") {
        return `<button class="button${form.soft.checked ? "" : " button--soft"} ${schemeClass} gap-3">
          <span>Inbox</span><span class="button__badge badge ${joinedClasses} ${schemeClass}">2</span>
        </button>`;
      }

      if (form.with.value === "iconBadge") {
        return `<span class="badged-icon">
          <i data-icon="feather__bell"></i>
          <span class="badged-icon__badge badge ${joinedClasses} ${schemeClass}">9</span>
        </span>`;
      }

      return `<span class="badge ${joinedClasses} ${schemeClass}">${text}</span>`;
    };

    const code = `
      ${renderBadge("scheme-primary", "Primary")}
      ${renderBadge("scheme-gray", "Gray")}
      ${renderBadge("scheme-success", "Success")}
      ${renderBadge("scheme-warning", "Warning")}
      ${renderBadge("scheme-danger", "Danger")}
      ${renderBadge("scheme-info", "Info")}
    `;

    codeContent.innerHTML = code;
  };

  form.querySelectorAll("input").forEach((inputEl) => {
    inputEl.addEventListener("change", updateCodeContent);
  });

  updateCodeContent();

  const badgesPreview = document.querySelector("#badgesPreview");
  const badgesCode = document.querySelector("#badgesCode");
  badgesCode.addEventListener("highlight.change", (e) => {
    badgesPreview.innerHTML = e.detail.code;
    Icon.replace(badgesPreview);
  });
})();
