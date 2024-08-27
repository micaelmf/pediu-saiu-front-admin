import { mapKeys } from "./object";
import { camelize } from "./string";

/**
 * This function is commonly used by class components to manage it's instances
 *
 * @param {
 *  name?: string
 *  create: (HTMLElement, Object) => ClassComponentInstance
 *  destroy: (ClassComponentInstance) => void
 *  iterable: Boolean
 * } options
 *
 * @returns {Object}
 */
export function manageInstances({
  key = "instance",
  create,
  destroy = () => {},
  iterable = false,
}) {
  const instances = iterable ? new Map() : new WeakMap();

  const getInstance = (targetEl) => instances.get(targetEl);

  const createInstance = (targetEl, options) => {
    const instance = create(targetEl, options);

    instances.set(targetEl, instance);
    targetEl.dispatchEvent(new Event(`${key}.created`));

    return instance;
  };

  const getOrCreateInstance = (targetEl, options) => {
    if (instances.has(targetEl)) return getInstance(targetEl);

    return createInstance(targetEl, options);
  };

  const destroyInstance = (targetEl) => {
    if (!instances.has(targetEl)) return;

    const instance = getInstance(targetEl);
    destroy(instance);

    instances.delete(targetEl);
    targetEl.dispatchEvent(new Event(`${key}.destroyed`));
  };

  return {
    instances,
    getInstance,
    createInstance,
    getOrCreateInstance,
    destroyInstance,
  };
}

/**
 * Used to convert element data attributes to options object
 *
 * @param {HTMLElement} element
 * @param {string} prefix
 *
 * @returns {object}
 */
export const optionsFromData = (element, prefix) => {
  const dataset = Object.assign({}, element.dataset);
  Object.keys(dataset).map((key) => {
    if (!key.includes(prefix)) {
      delete dataset[key];
    } else {
      const value = dataset[key];
      try {
        const parsedValue = JSON.parse(value);
        dataset[key] = parsedValue;
      } catch (e) {
        // sstt
      }
    }
  });

  return mapKeys(dataset, (val, key) =>
    key == prefix ? key : camelize(key.replace(prefix, "")),
  );
};
