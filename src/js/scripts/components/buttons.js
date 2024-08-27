import "../demo";
import Icon from "@/js/components/icon";

/**
 * BEGIN: Buttons Overview
 */
(() => {
  const codeContent = document.getElementById("buttonsCodeContent");
  const form = document.getElementById("buttonsForm");

  const updateCodeContent = () => {
    const classes = [form.variant.value, form.size.value];

    if (form.soft.checked) {
      classes.push("button--soft");
    }

    if (form.pill.checked) {
      classes.push(form.pill.value);
    }

    const joinedClasses = classes.join(" ");

    const renderButton = (schemeClass, text, icon = "") => {
      const iconTag = `<i data-icon="${icon}"></i>`;

      if (form.icon.value === "withIcon") {
        return `<button type="button" class="button ${joinedClasses} ${schemeClass}">${iconTag}<span>${text}</span></button>`;
      }

      if (form.icon.value === "iconOnly") {
        return `<button type="button" class="button button--icon ${joinedClasses} ${schemeClass}">${iconTag}</button>`;
      }

      return `<button type="button" class="button ${joinedClasses} ${schemeClass}">${text}</button>`;
    };

    const code = `
      ${renderButton("scheme-primary", "Send", "feather__send")}
      ${renderButton("scheme-gray", "Back", "feather__chevronLeft")}
      ${renderButton("scheme-success", "Accept", "feather__check")}
      ${renderButton("scheme-warning", "Low Battery", "feather__chevronsDown")}
      ${renderButton("scheme-danger", "Delete", "feather__trash")}
      ${renderButton("scheme-info", "Need a hand?", "feather__helpCircle")}
    `;

    codeContent.innerHTML = code;
  };

  form.querySelectorAll("input").forEach((inputEl) => {
    inputEl.addEventListener("change", updateCodeContent);
  });

  updateCodeContent();

  const buttonsPreview = document.querySelector("#buttonsPreview");
  const buttonsCode = document.querySelector("#buttonsCode");
  buttonsCode.addEventListener("highlight.change", (e) => {
    buttonsPreview.innerHTML = e.detail.code;
    Icon.replace(buttonsPreview);
  });
})();
