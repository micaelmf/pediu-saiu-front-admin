import flatpickr from "flatpickr";
import { manageInstances, optionsFromData } from "../utils/component";

/**
 * Instance manager
 */

const { getInstance, createInstance, getOrCreateInstance, destroyInstance } =
  manageInstances({
    create: (targetEl, options) => {
      const formControlled =
        targetEl.parentNode.classList.contains("form-control");
      if (options.time24Hr) {
        delete Object.assign(options, { time_24hr: options.time24Hr }).time24Hr;
      }

      return flatpickr(targetEl, {
        altInputClass: "form-control input datepicker",
        ...(formControlled
          ? {
              altInputClass: "input datepicker",
              positionElement: targetEl.parentNode,
            }
          : {}),
        ...options,
      });
    },
    destroy: (instance) => instance.destroy(),
  });

/**
 * Data API implementation
 */

const dataApi = (wrapperEl) => {
  wrapperEl.querySelectorAll("[data-datepicker]").forEach((targetEl) => {
    createInstance(targetEl, optionsFromData(targetEl, "datepicker"));
  });
};

if (document.readyState && document.readyState !== "loading") {
  dataApi(document);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    dataApi(document);
  });
}

export default {
  getInstance,
  createInstance,
  getOrCreateInstance,
  destroyInstance,
  dataApi,
};
