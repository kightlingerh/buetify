import "../../../../src/components/form/autocomplete/autocomplete.sass";
import { StaticUseInputProps } from '../../../composables/input/useInput';
import { useModel } from '../../../composables/model';
import { getUseModelPropsDefinition } from '../../../composables/model/useModel';
import { getEqPropsDefinition } from '../../../composables/shared';
import { getUseThemePropsDefinition } from '../../../composables/theme';
import { alwaysEmptyArray, extractProp, toggleListItem } from '../../../utils/helpers';
import { DropdownThemeMap } from '../../dropdown';
import BDropdown from '../../dropdown/BDropdown';
import { isArrowDownEvent, isArrowUpEvent, isEnterEvent, isEscEvent, isTabEvent } from '../../../utils/eventHelpers';
import { constant, constVoid } from 'fp-ts/lib/function';
import BDropdownDivider from '../../dropdown/BDropdownDivider';
import BDropdownItem from '../../dropdown/BDropdownItem';
import { head, isEmpty, lookup } from 'fp-ts/lib/Array';
import { alt, chain, fold, fromNullable, isSome, map, none, some, toUndefined } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, shallowRef, computed, shallowReactive, onBeforeUpdate, nextTick, h } from 'vue';
import { BInput } from '../input';

function getActiveDescendentId(selectedItems, itemId) {
  return pipe(selectedItems, head, map(item => extractProp(itemId, item)), toUndefined);
}

function getAutocompleteItems(items, selectedItems, itemId, itemText, eq, hoveredItem) {
  return items.map((item, index) => ({
    id: extractProp(itemId, item),
    isSelected: selectedItems.some(i => eq.equals(i, item)),
    isHovered: isSome(hoveredItem) ? hoveredItem.value.id === extractProp(itemId, item) : false,
    text: extractProp(itemText, item),
    value: item,
    index
  }));
}

function getSetSelected(props, closeDropdown, inputModel, selectedItemsModel) {
  const toggle = toggleListItem(props.eq);
  return item => {
    selectedItemsModel.modelValue.value = toggle(item.value, selectedItemsModel.modelValue.value || []);

    if (!item.isSelected) {
      inputModel.set(props.clearOnSelect ? '' : extractProp(props.itemText, item.value));

      if (props.closeOnSelect) {
        nextTick(closeDropdown);
      }
    }
  };
}

function getSetHovered(hoveredItem, templateItems) {
  return item => {
    const newItem = fromNullable(item);

    if (isSome(newItem)) {
      hoveredItem.value = newItem;
      pipe(newItem, map(item => item.index), chain(index => lookup(index, templateItems.value)), fold(constant(constVoid), li => () => li.focus()))();
    }
  };
}

function getOnKeydown(autocompleteItems, hoveredItem, closeDropdown, setSelected, setHovered) {
  function onArrowPress(isUp) {
    pipe(hoveredItem.value, map(item => item.index), alt(() => some(0)), chain(index => lookup(isUp ? Math.max(index - 1, 0) : Math.min(index + 1, autocompleteItems.value.length - 1), autocompleteItems.value)), fold(constant(constVoid), newItem => () => setHovered(newItem)))();
  }

  return function onKeydown(event) {
    if (isEnterEvent(event)) {
      event.preventDefault();

      if (isSome(hoveredItem.value)) {
        setSelected(hoveredItem.value.value);
      }
    } else if (isTabEvent(event)) {
      event.preventDefault();

      if (isSome(hoveredItem.value)) {
        setSelected(hoveredItem.value.value);
      } else {
        nextTick(closeDropdown);
      }
    } else if (isArrowUpEvent(event)) {
      event.preventDefault();
      onArrowPress(true);
    } else if (isArrowDownEvent(event)) {
      event.preventDefault();
      onArrowPress(false);
    } else if (isEscEvent(event)) {
      event.preventDefault();
      nextTick(closeDropdown);
    }
  };
}

function getGenerateItem(itemsRef, length, onKeydown, setSelected, setHovered, slots) {
  return function generateItem(item, index) {
    return h(BDropdownItem, {
      key: item.id,
      ref: el => {
        itemsRef.value[index] = el;
      },
      id: item.id,
      isActive: item.isSelected,
      'aria-selected': item.isSelected,
      'aria-label': `Option ${index + 1} of ${length.value}`,
      class: {
        'is-hovered': item.isHovered
      },
      onClick: () => setSelected(item),
      onMouseenter: () => setHovered(item),
      onKeydown
    }, slots.default ? slots.default({
      option: item,
      index
    }) : item.text);
  };
}

function generateHeaderItem(slots) {
  return h('li', {
    tabindex: -1
  }, [h(BDropdownItem, {
    tag: 'div'
  }, slots.header())]);
}

function generateLoadingItem(slots) {
  return h('li', {
    tabindex: -1
  }, [h(BDropdownItem, {
    tag: 'div'
  }, slots.loading ? slots.loading() : 'Loading results...')]);
}

function generateEmptyItem(modelValue, slots) {
  return h(BDropdownItem, {
    class: 'is-disabled'
  }, slots.empty ? slots.empty() : modelValue ? `No results` : `No results for ${modelValue}`);
}

function defineAutocomplete() {
  defineComponent({
    name: 'b-autocomplete',
    props: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, StaticUseInputProps), getEqPropsDefinition()), getUseThemePropsDefinition(DropdownThemeMap)), getUseModelPropsDefinition('search', 'onUpdate:search')), getUseModelPropsDefinition('selectedItems', 'onUpdate:selectedItems')), {
      selectedItems: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        default: alwaysEmptyArray
      },
      itemFilter: {
        type: Function,
        required: false
      },
      itemId: {
        type: [String, Function],
        default: 'id'
      },
      itemText: {
        type: [String, Function],
        default: 'text'
      },
      closeOnSelect: {
        type: Boolean,
        default: true
      },
      clearOnSelect: {
        type: Boolean,
        default: true
      },
      openOnFocus: {
        type: Boolean,
        default: true
      },
      onSelected: {
        type: Function,
        required: true
      }
    }),

    setup(props, {
      slots
    }) {
      const searchModel = useModel(props, 'search', 'onUpdate:search');
      const selectedItemsModel = useModel(props, 'selectedItems', 'onUpdate:selectedItems');
      const itemsRef = shallowRef([]);
      const filteredItems = computed(() => {
        var _a;

        return props.itemFilter ? props.items.filter(props.itemFilter((_a = searchModel.modelValue.value) !== null && _a !== void 0 ? _a : '')) : props.items;
      });
      onBeforeUpdate(() => itemsRef.value = []);
      const dropdownProps = shallowReactive({
        isExpanded: false,
        hasPopup: true
      });

      function open() {
        dropdownProps.isExpanded = true;
      }

      function close() {
        dropdownProps.isExpanded = false;
      }

      const hoveredItem = shallowRef(none);
      const activeDescendentId = computed(() => getActiveDescendentId(props.selectedItems, props.itemId));
      const autocompleteItems = computed(() => getAutocompleteItems(filteredItems.value, selectedItemsModel.modelValue.value || [], props.itemId, props.itemText, props.eq, hoveredItem.value));
      const numberOfItems = computed(() => autocompleteItems.value.length);
      const setSelected = getSetSelected(props, close, searchModel, selectedItemsModel);
      const setHovered = getSetHovered(hoveredItem, itemsRef);
      const onKeydown = getOnKeydown(autocompleteItems, hoveredItem, close, setSelected, setHovered);
      const generateItem = getGenerateItem(itemsRef, numberOfItems, onKeydown, setSelected, setHovered, slots);
      return () => {
        return h(BDropdown, {
          isMobileModal: false,
          class: ['b-autocomplete', {
            'is-expanded': props.isExpanded
          }],
          slots: {
            trigger: () => {
              return h(BInput, {
                modelValue: searchModel.modelValue.value,
                type: 'text',
                size: props.size,
                isLoading: props.isLoading,
                isRounded: props.isRounded,
                icon: props.icon,
                maxlength: props.maxlength,
                autocomplete: props.autocomplete || 'list',
                placeholder: props.placeholder,
                role: 'searchbox',
                'aria-activedescendant': activeDescendentId.value,
                'onUpdate:modelValue': searchModel.set,
                onFocus: open,
                onBlur: props.onBlur,
                onKeydown
              });
            },
            default: () => {
              let nodes;

              if (props.isLoading) {
                nodes = [generateLoadingItem(slots)];
              } else {
                nodes = isEmpty(autocompleteItems.value) ? [generateEmptyItem(searchModel.modelValue.value, slots)] : autocompleteItems.value.map(generateItem);

                if (slots.header) {
                  nodes.unshift(generateHeaderItem(slots), h(BDropdownDivider));
                }
              }

              return nodes;
            }
          }
        });
      };
    }

  });
}

export const BAutocomplete = defineAutocomplete();
//# sourceMappingURL=BAutocomplete.js.map