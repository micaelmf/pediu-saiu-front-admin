function updateClassName(box, action, classNames) {
  classNames.split(/\s+/).forEach(name => {
    if (name) {
      box.classList[action](name);
    }
  });
}

export const schemePlugin = {
  name: 'scheme',
  defaultValue: '',
  fn(instance) {
    const box = instance.popper.firstElementChild;
    const isDefaultRenderFn = () => !!instance.props.render?.$$tippy;

    function add() {
      if (instance.props.scheme && !isDefaultRenderFn()) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            [
              '@tippyjs/react: Cannot use `className` prop in conjunction with',
              '`render` prop. Place the className on the element you are',
              'rendering.',
            ].join(' '),
          );
        }

        return;
      }

      updateClassName(box, 'add', instance.props.scheme);
    }

    function remove() {
      if (isDefaultRenderFn()) {
        updateClassName(box, 'remove', instance.props.scheme);
      }
    }

    return {
      onCreate: add,
      onBeforeUpdate: remove,
      onAfterUpdate: add,
    };
  },
};
