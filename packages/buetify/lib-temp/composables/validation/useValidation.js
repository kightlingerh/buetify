import { constant, constVoid } from 'fp-ts/lib/function';
import { shallowRef, watch } from 'vue';
import { isString } from '../../utils/helpers';
import { useDisable, UseDisablePropsDefinition } from '../disable';
import { useFieldData } from '../fieldData';
export const UseValidationPropsDefinition = {
    useNativeValidation: {
        type: Boolean,
        default: true
    },
    isValid: {
        type: Boolean,
        default: true
    },
    'onUpdate:isValid': {
        type: Function,
        default: constant(constVoid)
    },
    ...UseDisablePropsDefinition
};
function isHtmlInputElement(el) {
    const newEl = el;
    return typeof newEl.checkValidity === 'function' && isString(newEl.validationMessage);
}
export function useValidation(props, ref) {
    const { setters } = useFieldData();
    const isDisabled = useDisable(props);
    const isValid = shallowRef(props.isValid);
    watch(isValid, newValue => {
        props['onUpdate:isValid'](newValue);
    });
    function validate() {
        if (!isDisabled.value && props.useNativeValidation) {
            if (isHtmlInputElement(ref.value)) {
                const el = ref.value;
                if (!el.checkValidity()) {
                    setters.onNewVariant('is-danger');
                    setters.onNewMessage(el.validationMessage);
                    isValid.value = false;
                }
                else {
                    setters.onNewVariant('');
                    setters.onNewMessage('');
                    isValid.value = true;
                }
            }
        }
    }
    return {
        isDisabled,
        isValid,
        validate
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb3NhYmxlcy92YWxpZGF0aW9uL3VzZVZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRSxPQUFPLEVBQXlCLFVBQVUsRUFBWSxLQUFLLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1QyxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRztJQUMxQyxtQkFBbUIsRUFBRTtRQUNuQixJQUFJLEVBQUUsT0FBNEI7UUFDbEMsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxPQUE0QjtRQUNsQyxPQUFPLEVBQUUsSUFBSTtLQUNkO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsSUFBSSxFQUFFLFFBQWdEO1FBQ3RELE9BQU8sRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDO0tBQzdCO0lBQ0QsR0FBRyx5QkFBeUI7Q0FDN0IsQ0FBQztBQUlGLFNBQVMsa0JBQWtCLENBQUMsRUFBZTtJQUN6QyxNQUFNLEtBQUssR0FBSSxFQUFrQyxDQUFDO0lBQ2xELE9BQU8sT0FBTyxLQUFLLENBQUMsYUFBYSxLQUFLLFVBQVUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDeEYsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBeUIsRUFBRSxHQUFxQjtJQUM1RSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDbkMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRTtRQUN4QixLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNILFNBQVMsUUFBUTtRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtZQUNsRCxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDakMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDbEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDM0MsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUN0QjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBQ0QsT0FBTztRQUNMLFVBQVU7UUFDVixPQUFPO1FBQ1AsUUFBUTtLQUNULENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnQsIGNvbnN0Vm9pZCwgRnVuY3Rpb25OIH0gZnJvbSAnZnAtdHMvbGliL2Z1bmN0aW9uJztcbmltcG9ydCB7IFJlZiwgRXh0cmFjdFByb3BUeXBlcywgc2hhbGxvd1JlZiwgUHJvcFR5cGUsIHdhdGNoIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvaGVscGVycyc7XG5pbXBvcnQgeyB1c2VEaXNhYmxlLCBVc2VEaXNhYmxlUHJvcHNEZWZpbml0aW9uIH0gZnJvbSAnLi4vZGlzYWJsZSc7XG5pbXBvcnQgeyB1c2VGaWVsZERhdGEgfSBmcm9tICcuLi9maWVsZERhdGEnO1xuXG5leHBvcnQgY29uc3QgVXNlVmFsaWRhdGlvblByb3BzRGVmaW5pdGlvbiA9IHtcbiAgdXNlTmF0aXZlVmFsaWRhdGlvbjoge1xuICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBpc1ZhbGlkOiB7XG4gICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gICdvblVwZGF0ZTppc1ZhbGlkJzoge1xuICAgIHR5cGU6IEZ1bmN0aW9uIGFzIFByb3BUeXBlPEZ1bmN0aW9uTjxbYm9vbGVhbl0sIHZvaWQ+PixcbiAgICBkZWZhdWx0OiBjb25zdGFudChjb25zdFZvaWQpXG4gIH0sXG4gIC4uLlVzZURpc2FibGVQcm9wc0RlZmluaXRpb25cbn07XG5cbmV4cG9ydCB0eXBlIFVzZVZhbGlkYXRpb25Qcm9wcyA9IEV4dHJhY3RQcm9wVHlwZXM8dHlwZW9mIFVzZVZhbGlkYXRpb25Qcm9wc0RlZmluaXRpb24+O1xuXG5mdW5jdGlvbiBpc0h0bWxJbnB1dEVsZW1lbnQoZWw6IEhUTUxFbGVtZW50KTogZWwgaXMgSFRNTElucHV0RWxlbWVudCB7XG4gIGNvbnN0IG5ld0VsID0gKGVsIGFzIHVua25vd24pIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHJldHVybiB0eXBlb2YgbmV3RWwuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc1N0cmluZyhuZXdFbC52YWxpZGF0aW9uTWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VWYWxpZGF0aW9uKHByb3BzOiBVc2VWYWxpZGF0aW9uUHJvcHMsIHJlZjogUmVmPEhUTUxFbGVtZW50Pikge1xuICBjb25zdCB7IHNldHRlcnMgfSA9IHVzZUZpZWxkRGF0YSgpO1xuICBjb25zdCBpc0Rpc2FibGVkID0gdXNlRGlzYWJsZShwcm9wcyk7XG4gIGNvbnN0IGlzVmFsaWQgPSBzaGFsbG93UmVmKHByb3BzLmlzVmFsaWQpO1xuICB3YXRjaChpc1ZhbGlkLCBuZXdWYWx1ZSA9PiB7XG4gICAgcHJvcHNbJ29uVXBkYXRlOmlzVmFsaWQnXShuZXdWYWx1ZSk7XG4gIH0pO1xuICBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgICBpZiAoIWlzRGlzYWJsZWQudmFsdWUgJiYgcHJvcHMudXNlTmF0aXZlVmFsaWRhdGlvbikge1xuICAgICAgaWYgKGlzSHRtbElucHV0RWxlbWVudChyZWYudmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGVsID0gcmVmLnZhbHVlO1xuICAgICAgICBpZiAoIWVsLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgIHNldHRlcnMub25OZXdWYXJpYW50KCdpcy1kYW5nZXInKTtcbiAgICAgICAgICBzZXR0ZXJzLm9uTmV3TWVzc2FnZShlbC52YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgICAgaXNWYWxpZC52YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldHRlcnMub25OZXdWYXJpYW50KCcnKTtcbiAgICAgICAgICBzZXR0ZXJzLm9uTmV3TWVzc2FnZSgnJyk7XG4gICAgICAgICAgaXNWYWxpZC52YWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIGlzVmFsaWQsXG4gICAgdmFsaWRhdGVcbiAgfTtcbn1cbiJdfQ==