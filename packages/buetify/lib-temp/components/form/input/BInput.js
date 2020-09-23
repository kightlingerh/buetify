import '../sass/form.sass';
import { getUseInputPropsDefinition, useInput } from '../../../composables/input/useInput';
import { DefaultThemePropsDefinition, useTheme } from '../../../composables/theme/useTheme';
import { isNumber, isString } from '../../../utils/helpers';
import { constant } from 'fp-ts/lib/function';
import { DEFAULT_INPUT_ICONS } from '../shared/types';
import { defineComponent, shallowRef, h, computed } from 'vue';
export function getBInputPropsDefinition() {
    return {
        ...getUseInputPropsDefinition(),
        ...DefaultThemePropsDefinition,
        isLoading: {
            type: Boolean,
            default: false
        },
        hasCounter: {
            type: Boolean,
            default: true
        },
        customInputClass: {
            type: String,
            default: ''
        },
        inputIcons: {
            type: Object,
            required: false,
            default: constant(DEFAULT_INPUT_ICONS)
        }
    };
}
function getIconPosition(leftIcon, rightIcon) {
    if (leftIcon && rightIcon) {
        return 'has-icons-left has-icons-right';
    }
    else if (rightIcon) {
        return 'has-icons-right';
    }
    else if (leftIcon) {
        return 'has-icons-left';
    }
    else {
        return '';
    }
}
function getRightIcon(icons, variant, usePasswordReveal, passwordIsVisible) {
    if (usePasswordReveal) {
        return passwordIsVisible ? icons.passwordVisible : icons.passwordInvisible;
    }
    else {
        switch (variant) {
            case 'is-danger':
                return icons.isDanger;
            case 'is-info':
                return icons.isInfo;
            case 'is-success':
                return icons.isSuccess;
            case 'is-warning':
                return icons.isWarning;
            default:
                return undefined;
        }
    }
}
function generateLeftIcon(icon, size) {
    return h(icon, {
        class: 'is-left',
        size
    });
}
function generateRightIcon(icon, size, variant, usePasswordReveal, passwordToggle) {
    return h(icon, {
        class: ['is-right', { 'is-clickable': usePasswordReveal }],
        variant,
        size,
        ...passwordToggle.attrs.value,
        ...passwordToggle.listeners
    });
}
function generateCounter(isFocused, valueLength, maxLength) {
    return h('small', {
        class: ['help counter', { 'is-invisible': !isFocused }]
    }, `${valueLength} / ${maxLength}`);
}
function getAutocomplete(autocomplete, type) {
    if (autocomplete && autocomplete.value) {
        return autocomplete.value;
    }
    else {
        switch (type) {
            case 'email':
                return 'email';
            case 'password':
                return 'password';
            default:
                return undefined;
        }
    }
}
function getInputClasses(size, isExpanded, isLoading, hasMessage, leftIcon, rightIcon, themeClasses) {
    return [
        ...themeClasses,
        getIconPosition(leftIcon, rightIcon),
        size,
        {
            'is-expanded': isExpanded,
            'is-loading': isLoading,
            'is-clearfix': !hasMessage
        }
    ];
}
function generateNonTextInput(inputRef, inputData, isLoading, rightIcon, context, themeClasses) {
    const hasMessage = !!inputData.message.value;
    const type = inputData.type ? inputData.type.value : inputData.usePasswordReveal.value ? 'password' : undefined;
    return h('input', {
        ...context.attrs,
        ref: inputRef,
        class: [
            'input',
            ...getInputClasses(inputData.iconSize.value, inputData.isExpanded.value, isLoading, hasMessage, inputData.icon && inputData.icon.value, rightIcon, themeClasses)
        ],
        value: inputData.modelValue.value,
        onInput: inputData.onNativeInput,
        type: inputData.type ? inputData.type.value : undefined,
        autocomplete: getAutocomplete(inputData.autocomplete, type),
        maxlength: inputData.maxlength && inputData.maxlength.value,
        placeholder: inputData.placeholder && inputData.placeholder.value,
        onBlur: inputData.onBlur,
        onFocus: inputData.onFocus,
        required: inputData.isRequired.value,
        readonly: inputData.isReadonly.value,
        disabled: inputData.isDisabled.value,
        tabindex: inputData.isDisabled.value ? -1 : 0,
        id: inputData.id.value
    });
}
function generateTextarea(inputRef, inputData, isLoading, rightIcon, context, themeClasses) {
    const hasMessage = !!inputData.message.value;
    return h('textarea', {
        ...context.attrs,
        ref: inputRef,
        class: [
            'textarea',
            ...getInputClasses(inputData.iconSize.value, inputData.isExpanded.value, isLoading, hasMessage, inputData.icon && inputData.icon.value, rightIcon, themeClasses)
        ],
        value: inputData.modelValue.value,
        onInput: inputData.onNativeInput,
        maxlength: inputData.maxlength && inputData.maxlength.value,
        placeholder: inputData.placeholder && inputData.placeholder.value,
        onBlur: inputData.onBlur,
        onFocus: inputData.onFocus,
        required: inputData.isRequired.value,
        readonly: inputData.isReadonly.value,
        disabled: inputData.isDisabled.value,
        tabindex: inputData.isDisabled.value ? -1 : 0,
        id: inputData.id.value
    });
}
function generateInput(inputRef, inputData, isLoading, rightIcon, context, themeClasses) {
    const type = inputData.type && inputData.type.value;
    return type === 'textarea'
        ? generateTextarea(inputRef, inputData, isLoading, rightIcon, context, themeClasses)
        : generateNonTextInput(inputRef, inputData, isLoading, rightIcon, context, themeClasses);
}
function getValueLength(modelValue) {
    if (isString(modelValue)) {
        return modelValue.length;
    }
    else if (isNumber(modelValue)) {
        return modelValue.toString().length;
    }
    return 0;
}
export function defineInput() {
    return defineComponent({
        name: 'b-input',
        props: getBInputPropsDefinition(),
        setup(props, context) {
            const inputRef = shallowRef(null);
            const inputData = useInput(props, inputRef);
            const rightIcon = computed(() => getRightIcon(props.inputIcons, inputData.messageVariant.value, props.usePasswordReveal, inputData.passwordToggle.isOn.value));
            const useCounter = computed(() => (inputData.type === undefined || (inputData.modelValue && typeof inputData.modelValue.value !== 'number')) &&
                !!inputData.maxlength &&
                props.hasCounter);
            const { themeClasses } = useTheme(props);
            return () => {
                const nodes = [
                    generateInput(inputRef, inputData, props.isLoading, rightIcon.value, context, themeClasses.value)
                ];
                if (inputData.icon && inputData.icon.value) {
                    nodes.push(generateLeftIcon(inputData.icon.value, inputData.iconSize.value));
                }
                if (rightIcon.value) {
                    nodes.push(generateRightIcon(rightIcon.value, inputData.iconSize.value, inputData.messageVariant.value, props.usePasswordReveal, inputData.passwordToggle));
                }
                if (useCounter.value && inputData.maxlength && inputData.maxlength.value !== undefined) {
                    nodes.push(generateCounter(inputData.isFocused.value, getValueLength(inputData.modelValue.value), inputData.maxlength.value));
                }
                return h('div', {
                    class: [
                        'control',
                        getInputClasses(props.size, inputData.isExpanded.value, props.isLoading, !!inputData.message.value, inputData.icon && inputData.icon.value, rightIcon.value, themeClasses.value)
                    ]
                }, nodes);
            };
        }
    });
}
// eslint-disable-next-line
export const BInput = defineInput();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZm9ybS9pbnB1dC9CSW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsMEJBQTBCLEVBQVMsUUFBUSxFQUFpQixNQUFNLHFDQUFxQyxDQUFDO0FBQ2pILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxRQUFRLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUk1RixPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQWEsZUFBZSxFQUFZLFVBQVUsRUFBRSxDQUFDLEVBQU8sUUFBUSxFQUFnQixNQUFNLEtBQUssQ0FBQztBQUV2RyxNQUFNLFVBQVUsd0JBQXdCO0lBQ3RDLE9BQU87UUFDTCxHQUFHLDBCQUEwQixFQUFLO1FBQ2xDLEdBQUcsMkJBQTJCO1FBQzlCLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxPQUE0QjtZQUNsQyxPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQThCO1lBQ3BDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUN2QztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsUUFBK0IsRUFBRSxTQUFnQztJQUN4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SSxDQUFDLEtBQUssRUFDdEMsU0FBUyxDQUFDLEtBQUssRUFDZixZQUFZLENBQUMsS0FBSyxDQUNuQjtxQkFDRjtpQkFDRixFQUNELEtBQUssQ0FDTixDQUFDO1lBQ0osQ0FBQyxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCwyQkFBMkI7QUFDM0IsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsRUFBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zYXNzL2Zvcm0uc2Fzcyc7XG5pbXBvcnQgeyBnZXRVc2VJbnB1dFByb3BzRGVmaW5pdGlvbiwgSW5wdXQsIHVzZUlucHV0LCBVc2VJbnB1dFByb3BzIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9zYWJsZXMvaW5wdXQvdXNlSW5wdXQnO1xuaW1wb3J0IHsgRGVmYXVsdFRoZW1lUHJvcHNEZWZpbml0aW9uLCB1c2VUaGVtZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvc2FibGVzL3RoZW1lL3VzZVRoZW1lJztcbmltcG9ydCB7IFRvZ2dsZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvc2FibGVzL3RvZ2dsZSc7XG5pbXBvcnQgeyBDb2xvclZhcmlhbnQgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9Db2xvclZhcmlhbnRzJztcbmltcG9ydCB7IFNpemVWYXJpYW50IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvU2l6ZVZhcmlhbnRzJztcbmltcG9ydCB7IGlzTnVtYmVyLCBpc1N0cmluZyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nO1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgREVGQVVMVF9JTlBVVF9JQ09OUywgSW5wdXRJY29ucyB9IGZyb20gJy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIGRlZmluZUNvbXBvbmVudCwgUHJvcFR5cGUsIHNoYWxsb3dSZWYsIGgsIFJlZiwgY29tcHV0ZWQsIFNldHVwQ29udGV4dCB9IGZyb20gJ3Z1ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCSW5wdXRQcm9wc0RlZmluaXRpb248VD4oKSB7XG4gIHJldHVybiB7XG4gICAgLi4uZ2V0VXNlSW5wdXRQcm9wc0RlZmluaXRpb248VD4oKSxcbiAgICAuLi5EZWZhdWx0VGhlbWVQcm9wc0RlZmluaXRpb24sXG4gICAgaXNMb2FkaW5nOiB7XG4gICAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGhhc0NvdW50ZXI6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBjdXN0b21JbnB1dENsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sXG4gICAgaW5wdXRJY29uczoge1xuICAgICAgdHlwZTogT2JqZWN0IGFzIFByb3BUeXBlPElucHV0SWNvbnM+LFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVmYXVsdDogY29uc3RhbnQoREVGQVVMVF9JTlBVVF9JQ09OUylcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEljb25Qb3NpdGlvbihsZWZ0SWNvbjogQ29tcG9uZW50IHwgdW5kZWZpbmVkLCByaWdodEljb246IENvbXBvbmVudCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGlmIChsZWZ0SWNvbiAmJiByaWdodEljb24pIHtcbiAgICByZXR1cm4gJ2hhcy1pY29ucy1sZWZ0IGhhcy1pY29ucy1yaWdodCc7XG4gIH0gZWxzZSBpZiAocmlnaHRJY29uKSB7XG4gICAgcmV0dXJuICdoYXMtaWNvbnMtcmlnaHQnO1xuICB9IGVsc2UgaWYgKGxlZnRJY29uKSB7XG4gICAgcmV0dXJuICdoYXMtaWNvbnMtbGVmdCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJpZ2h0SWNvbihcbiAgaWNvbnM6IElucHV0SWNvbnMsXG4gIHZhcmlhbnQ6IENvbG9yVmFyaWFudCxcbiAgdXNlUGFzc3dvcmRSZXZlYWw6IGJvb2xlYW4sXG4gIHBhc3N3b3JkSXNWaXNpYmxlOiBib29sZWFuXG4pIHtcbiAgaWYgKHVzZVBhc3N3b3JkUmV2ZWFsKSB7XG4gICAgcmV0dXJuIHBhc3N3b3JkSXNWaXNpYmxlID8gaWNvbnMucGFzc3dvcmRWaXNpYmxlIDogaWNvbnMucGFzc3dvcmRJbnZpc2libGU7XG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoICh2YXJpYW50KSB7XG4gICAgICBjYXNlICdpcy1kYW5nZXInOlxuICAgICAgICByZXR1cm4gaWNvbnMuaXNEYW5nZXI7XG4gICAgICBjYXNlICdpcy1pbmZvJzpcbiAgICAgICAgcmV0dXJuIGljb25zLmlzSW5mbztcbiAgICAgIGNhc2UgJ2lzLXN1Y2Nlc3MnOlxuICAgICAgICByZXR1cm4gaWNvbnMuaXNTdWNjZXNzO1xuICAgICAgY2FzZSAnaXMtd2FybmluZyc6XG4gICAgICAgIHJldHVybiBpY29ucy5pc1dhcm5pbmc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUxlZnRJY29uKGljb246IENvbXBvbmVudCwgc2l6ZTogU2l6ZVZhcmlhbnQpOiBWTm9kZSB7XG4gIHJldHVybiBoKGljb24gYXMgYW55LCB7XG4gICAgY2xhc3M6ICdpcy1sZWZ0JyxcbiAgICBzaXplXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJpZ2h0SWNvbihcbiAgaWNvbjogQ29tcG9uZW50LFxuICBzaXplOiBTaXplVmFyaWFudCxcbiAgdmFyaWFudDogQ29sb3JWYXJpYW50LFxuICB1c2VQYXNzd29yZFJldmVhbDogYm9vbGVhbixcbiAgcGFzc3dvcmRUb2dnbGU6IFRvZ2dsZVxuKTogVk5vZGUge1xuICByZXR1cm4gaChpY29uIGFzIGFueSwge1xuICAgIGNsYXNzOiBbJ2lzLXJpZ2h0JywgeyAnaXMtY2xpY2thYmxlJzogdXNlUGFzc3dvcmRSZXZlYWwgfV0sXG4gICAgdmFyaWFudCxcbiAgICBzaXplLFxuICAgIC4uLnBhc3N3b3JkVG9nZ2xlLmF0dHJzLnZhbHVlLFxuICAgIC4uLnBhc3N3b3JkVG9nZ2xlLmxpc3RlbmVyc1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb3VudGVyKGlzRm9jdXNlZDogYm9vbGVhbiwgdmFsdWVMZW5ndGg6IG51bWJlciwgbWF4TGVuZ3RoOiBudW1iZXIgfCBzdHJpbmcpOiBWTm9kZSB7XG4gIHJldHVybiBoKFxuICAgICdzbWFsbCcsXG4gICAge1xuICAgICAgY2xhc3M6IFsnaGVscCBjb3VudGVyJywgeyAnaXMtaW52aXNpYmxlJzogIWlzRm9jdXNlZCB9XVxuICAgIH0sXG4gICAgYCR7dmFsdWVMZW5ndGh9IC8gJHttYXhMZW5ndGh9YFxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRBdXRvY29tcGxldGUoYXV0b2NvbXBsZXRlOiB1bmRlZmluZWQgfCBSZWY8c3RyaW5nIHwgdW5kZWZpbmVkPiwgdHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gIGlmIChhdXRvY29tcGxldGUgJiYgYXV0b2NvbXBsZXRlLnZhbHVlKSB7XG4gICAgcmV0dXJuIGF1dG9jb21wbGV0ZS52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgcmV0dXJuICdlbWFpbCc7XG4gICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICAgIHJldHVybiAncGFzc3dvcmQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SW5wdXRDbGFzc2VzKFxuICBzaXplOiBzdHJpbmcsXG4gIGlzRXhwYW5kZWQ6IGJvb2xlYW4sXG4gIGlzTG9hZGluZzogYm9vbGVhbixcbiAgaGFzTWVzc2FnZTogYm9vbGVhbixcbiAgbGVmdEljb246IENvbXBvbmVudCB8IHVuZGVmaW5lZCxcbiAgcmlnaHRJY29uOiBDb21wb25lbnQgfCB1bmRlZmluZWQsXG4gIHRoZW1lQ2xhc3Nlczogc3RyaW5nW11cbikge1xuICByZXR1cm4gW1xuICAgIC4uLnRoZW1lQ2xhc3NlcyxcbiAgICBnZXRJY29uUG9zaXRpb24obGVmdEljb24sIHJpZ2h0SWNvbiksXG4gICAgc2l6ZSxcbiAgICB7XG4gICAgICAnaXMtZXhwYW5kZWQnOiBpc0V4cGFuZGVkLFxuICAgICAgJ2lzLWxvYWRpbmcnOiBpc0xvYWRpbmcsXG4gICAgICAnaXMtY2xlYXJmaXgnOiAhaGFzTWVzc2FnZVxuICAgIH1cbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOb25UZXh0SW5wdXQoXG4gIGlucHV0UmVmOiBSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gIGlucHV0RGF0YTogSW5wdXQsXG4gIGlzTG9hZGluZzogYm9vbGVhbixcbiAgcmlnaHRJY29uOiBDb21wb25lbnQgfCB1bmRlZmluZWQsXG4gIGNvbnRleHQ6IFNldHVwQ29udGV4dCxcbiAgdGhlbWVDbGFzc2VzOiBzdHJpbmdbXVxuKTogVk5vZGUge1xuICBjb25zdCBoYXNNZXNzYWdlID0gISFpbnB1dERhdGEubWVzc2FnZS52YWx1ZTtcbiAgY29uc3QgdHlwZSA9IGlucHV0RGF0YS50eXBlID8gaW5wdXREYXRhLnR5cGUudmFsdWUgOiBpbnB1dERhdGEudXNlUGFzc3dvcmRSZXZlYWwudmFsdWUgPyAncGFzc3dvcmQnIDogdW5kZWZpbmVkO1xuICByZXR1cm4gaCgnaW5wdXQnLCB7XG4gICAgLi4uY29udGV4dC5hdHRycyxcbiAgICByZWY6IGlucHV0UmVmLFxuICAgIGNsYXNzOiBbXG4gICAgICAnaW5wdXQnLFxuICAgICAgLi4uZ2V0SW5wdXRDbGFzc2VzKFxuICAgICAgICBpbnB1dERhdGEuaWNvblNpemUudmFsdWUsXG4gICAgICAgIGlucHV0RGF0YS5pc0V4cGFuZGVkLnZhbHVlLFxuICAgICAgICBpc0xvYWRpbmcsXG4gICAgICAgIGhhc01lc3NhZ2UsXG4gICAgICAgIGlucHV0RGF0YS5pY29uICYmIGlucHV0RGF0YS5pY29uLnZhbHVlLFxuICAgICAgICByaWdodEljb24sXG4gICAgICAgIHRoZW1lQ2xhc3Nlc1xuICAgICAgKVxuICAgIF0sXG4gICAgdmFsdWU6IGlucHV0RGF0YS5tb2RlbFZhbHVlLnZhbHVlLFxuICAgIG9uSW5wdXQ6IGlucHV0RGF0YS5vbk5hdGl2ZUlucHV0LFxuICAgIHR5cGU6IGlucHV0RGF0YS50eXBlID8gaW5wdXREYXRhLnR5cGUudmFsdWUgOiB1bmRlZmluZWQsXG4gICAgYXV0b2NvbXBsZXRlOiBnZXRBdXRvY29tcGxldGUoaW5wdXREYXRhLmF1dG9jb21wbGV0ZSwgdHlwZSksXG4gICAgbWF4bGVuZ3RoOiBpbnB1dERhdGEubWF4bGVuZ3RoICYmIGlucHV0RGF0YS5tYXhsZW5ndGgudmFsdWUsXG4gICAgcGxhY2Vob2xkZXI6IGlucHV0RGF0YS5wbGFjZWhvbGRlciAmJiBpbnB1dERhdGEucGxhY2Vob2xkZXIudmFsdWUsXG4gICAgb25CbHVyOiBpbnB1dERhdGEub25CbHVyLFxuICAgIG9uRm9jdXM6IGlucHV0RGF0YS5vbkZvY3VzLFxuICAgIHJlcXVpcmVkOiBpbnB1dERhdGEuaXNSZXF1aXJlZC52YWx1ZSxcbiAgICByZWFkb25seTogaW5wdXREYXRhLmlzUmVhZG9ubHkudmFsdWUsXG4gICAgZGlzYWJsZWQ6IGlucHV0RGF0YS5pc0Rpc2FibGVkLnZhbHVlLFxuICAgIHRhYmluZGV4OiBpbnB1dERhdGEuaXNEaXNhYmxlZC52YWx1ZSA/IC0xIDogMCxcbiAgICBpZDogaW5wdXREYXRhLmlkLnZhbHVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRleHRhcmVhKFxuICBpbnB1dFJlZjogUmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICBpbnB1dERhdGE6IElucHV0LFxuICBpc0xvYWRpbmc6IGJvb2xlYW4sXG4gIHJpZ2h0SWNvbjogQ29tcG9uZW50IHwgdW5kZWZpbmVkLFxuICBjb250ZXh0OiBTZXR1cENvbnRleHQsXG4gIHRoZW1lQ2xhc3Nlczogc3RyaW5nW11cbik6IFZOb2RlIHtcbiAgY29uc3QgaGFzTWVzc2FnZSA9ICEhaW5wdXREYXRhLm1lc3NhZ2UudmFsdWU7XG4gIHJldHVybiBoKCd0ZXh0YXJlYScsIHtcbiAgICAuLi5jb250ZXh0LmF0dHJzLFxuICAgIHJlZjogaW5wdXRSZWYsXG4gICAgY2xhc3M6IFtcbiAgICAgICd0ZXh0YXJlYScsXG4gICAgICAuLi5nZXRJbnB1dENsYXNzZXMoXG4gICAgICAgIGlucHV0RGF0YS5pY29uU2l6ZS52YWx1ZSxcbiAgICAgICAgaW5wdXREYXRhLmlzRXhwYW5kZWQudmFsdWUsXG4gICAgICAgIGlzTG9hZGluZyxcbiAgICAgICAgaGFzTWVzc2FnZSxcbiAgICAgICAgaW5wdXREYXRhLmljb24gJiYgaW5wdXREYXRhLmljb24udmFsdWUsXG4gICAgICAgIHJpZ2h0SWNvbixcbiAgICAgICAgdGhlbWVDbGFzc2VzXG4gICAgICApXG4gICAgXSxcbiAgICB2YWx1ZTogaW5wdXREYXRhLm1vZGVsVmFsdWUudmFsdWUsXG4gICAgb25JbnB1dDogaW5wdXREYXRhLm9uTmF0aXZlSW5wdXQsXG4gICAgbWF4bGVuZ3RoOiBpbnB1dERhdGEubWF4bGVuZ3RoICYmIGlucHV0RGF0YS5tYXhsZW5ndGgudmFsdWUsXG4gICAgcGxhY2Vob2xkZXI6IGlucHV0RGF0YS5wbGFjZWhvbGRlciAmJiBpbnB1dERhdGEucGxhY2Vob2xkZXIudmFsdWUsXG4gICAgb25CbHVyOiBpbnB1dERhdGEub25CbHVyLFxuICAgIG9uRm9jdXM6IGlucHV0RGF0YS5vbkZvY3VzLFxuICAgIHJlcXVpcmVkOiBpbnB1dERhdGEuaXNSZXF1aXJlZC52YWx1ZSxcbiAgICByZWFkb25seTogaW5wdXREYXRhLmlzUmVhZG9ubHkudmFsdWUsXG4gICAgZGlzYWJsZWQ6IGlucHV0RGF0YS5pc0Rpc2FibGVkLnZhbHVlLFxuICAgIHRhYmluZGV4OiBpbnB1dERhdGEuaXNEaXNhYmxlZC52YWx1ZSA/IC0xIDogMCxcbiAgICBpZDogaW5wdXREYXRhLmlkLnZhbHVlXG4gIH0pO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVJbnB1dChcbiAgaW5wdXRSZWY6IFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgaW5wdXREYXRhOiBJbnB1dCxcbiAgaXNMb2FkaW5nOiBib29sZWFuLFxuICByaWdodEljb246IENvbXBvbmVudCB8IHVuZGVmaW5lZCxcbiAgY29udGV4dDogU2V0dXBDb250ZXh0LFxuICB0aGVtZUNsYXNzZXM6IHN0cmluZ1tdXG4pOiBWTm9kZSB7XG4gIGNvbnN0IHR5cGUgPSBpbnB1dERhdGEudHlwZSAmJiBpbnB1dERhdGEudHlwZS52YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT09ICd0ZXh0YXJlYSdcbiAgICA/IGdlbmVyYXRlVGV4dGFyZWEoaW5wdXRSZWYsIGlucHV0RGF0YSwgaXNMb2FkaW5nLCByaWdodEljb24sIGNvbnRleHQsIHRoZW1lQ2xhc3NlcylcbiAgICA6IGdlbmVyYXRlTm9uVGV4dElucHV0KGlucHV0UmVmLCBpbnB1dERhdGEsIGlzTG9hZGluZywgcmlnaHRJY29uLCBjb250ZXh0LCB0aGVtZUNsYXNzZXMpO1xufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZUxlbmd0aChtb2RlbFZhbHVlOiB1bmtub3duKSB7XG4gIGlmIChpc1N0cmluZyhtb2RlbFZhbHVlKSkge1xuICAgIHJldHVybiBtb2RlbFZhbHVlLmxlbmd0aDtcbiAgfSBlbHNlIGlmIChpc051bWJlcihtb2RlbFZhbHVlKSkge1xuICAgIHJldHVybiBtb2RlbFZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lSW5wdXQ8VD4oKSB7XG4gIHJldHVybiBkZWZpbmVDb21wb25lbnQoe1xuICAgIG5hbWU6ICdiLWlucHV0JyxcbiAgICBwcm9wczogZ2V0QklucHV0UHJvcHNEZWZpbml0aW9uPFQ+KCksXG4gICAgc2V0dXAocHJvcHMsIGNvbnRleHQ6IFNldHVwQ29udGV4dCkge1xuICAgICAgY29uc3QgaW5wdXRSZWYgPSBzaGFsbG93UmVmKChudWxsIGFzIHVua25vd24pIGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xuICAgICAgY29uc3QgaW5wdXREYXRhID0gdXNlSW5wdXQocHJvcHMgYXMgVXNlSW5wdXRQcm9wczxUPiwgaW5wdXRSZWYpO1xuXG4gICAgICBjb25zdCByaWdodEljb24gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgICBnZXRSaWdodEljb24oXG4gICAgICAgICAgcHJvcHMuaW5wdXRJY29ucyxcbiAgICAgICAgICBpbnB1dERhdGEubWVzc2FnZVZhcmlhbnQudmFsdWUsXG4gICAgICAgICAgcHJvcHMudXNlUGFzc3dvcmRSZXZlYWwsXG4gICAgICAgICAgaW5wdXREYXRhLnBhc3N3b3JkVG9nZ2xlLmlzT24udmFsdWVcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHVzZUNvdW50ZXIgPSBjb21wdXRlZChcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICAoaW5wdXREYXRhLnR5cGUgPT09IHVuZGVmaW5lZCB8fCAoaW5wdXREYXRhLm1vZGVsVmFsdWUgJiYgdHlwZW9mIGlucHV0RGF0YS5tb2RlbFZhbHVlLnZhbHVlICE9PSAnbnVtYmVyJykpICYmXG4gICAgICAgICAgISFpbnB1dERhdGEubWF4bGVuZ3RoICYmXG4gICAgICAgICAgcHJvcHMuaGFzQ291bnRlclxuICAgICAgKTtcblxuICAgICAgY29uc3QgeyB0aGVtZUNsYXNzZXMgfSA9IHVzZVRoZW1lKHByb3BzKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZXM6IFZOb2RlW10gPSBbXG4gICAgICAgICAgZ2VuZXJhdGVJbnB1dChpbnB1dFJlZiwgaW5wdXREYXRhIGFzIElucHV0LCBwcm9wcy5pc0xvYWRpbmcsIHJpZ2h0SWNvbi52YWx1ZSwgY29udGV4dCwgdGhlbWVDbGFzc2VzLnZhbHVlKVxuICAgICAgICBdO1xuICAgICAgICBpZiAoaW5wdXREYXRhLmljb24gJiYgaW5wdXREYXRhLmljb24udmFsdWUpIHtcbiAgICAgICAgICBub2Rlcy5wdXNoKGdlbmVyYXRlTGVmdEljb24oaW5wdXREYXRhLmljb24udmFsdWUsIGlucHV0RGF0YS5pY29uU2l6ZS52YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyaWdodEljb24udmFsdWUpIHtcbiAgICAgICAgICBub2Rlcy5wdXNoKFxuICAgICAgICAgICAgZ2VuZXJhdGVSaWdodEljb24oXG4gICAgICAgICAgICAgIHJpZ2h0SWNvbi52YWx1ZSxcbiAgICAgICAgICAgICAgaW5wdXREYXRhLmljb25TaXplLnZhbHVlLFxuICAgICAgICAgICAgICBpbnB1dERhdGEubWVzc2FnZVZhcmlhbnQudmFsdWUsXG4gICAgICAgICAgICAgIHByb3BzLnVzZVBhc3N3b3JkUmV2ZWFsLFxuICAgICAgICAgICAgICBpbnB1dERhdGEucGFzc3dvcmRUb2dnbGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VDb3VudGVyLnZhbHVlICYmIGlucHV0RGF0YS5tYXhsZW5ndGggJiYgaW5wdXREYXRhLm1heGxlbmd0aC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9kZXMucHVzaChcbiAgICAgICAgICAgIGdlbmVyYXRlQ291bnRlcihcbiAgICAgICAgICAgICAgaW5wdXREYXRhLmlzRm9jdXNlZC52YWx1ZSxcbiAgICAgICAgICAgICAgZ2V0VmFsdWVMZW5ndGgoaW5wdXREYXRhLm1vZGVsVmFsdWUudmFsdWUpLFxuICAgICAgICAgICAgICBpbnB1dERhdGEubWF4bGVuZ3RoLnZhbHVlXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICAnY29udHJvbCcsXG4gICAgICAgICAgICAgIGdldElucHV0Q2xhc3NlcyhcbiAgICAgICAgICAgICAgICBwcm9wcy5zaXplLFxuICAgICAgICAgICAgICAgIGlucHV0RGF0YS5pc0V4cGFuZGVkLnZhbHVlLFxuICAgICAgICAgICAgICAgIHByb3BzLmlzTG9hZGluZyxcbiAgICAgICAgICAgICAgICAhIWlucHV0RGF0YS5tZXNzYWdlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGlucHV0RGF0YS5pY29uICYmIGlucHV0RGF0YS5pY29uLnZhbHVlLFxuICAgICAgICAgICAgICAgIHJpZ2h0SWNvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICB0aGVtZUNsYXNzZXMudmFsdWVcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbm9kZXNcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5leHBvcnQgY29uc3QgQklucHV0ID0gZGVmaW5lSW5wdXQ8YW55PigpO1xuIl19