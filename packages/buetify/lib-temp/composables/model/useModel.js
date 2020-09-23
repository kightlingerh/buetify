import { constant, constVoid } from 'fp-ts/lib/function';
import { shallowRef, watch, toRef } from 'vue';
import { exists, isObject } from '../../utils/helpers';
export function getUseModelPropsDefinition(valueKey = 'modelValue', updateKey = 'onUpdate:modelValue') {
    // eslint-disable-line
    return {
        [valueKey]: null,
        [updateKey]: {
            type: Function,
            default: constant(constVoid)
        }
    };
}
export function useModel(props, valueKey = 'modelValue', updateKey = 'onUpdate:modelValue') {
    const internalValue = shallowRef(props[valueKey]);
    watch(toRef(props, valueKey), newVal => {
        internalValue.value = newVal;
    });
    watch(internalValue, newVal => props[updateKey](newVal));
    function onUpdate(e) {
        // eslint-disable-next-line
        // @ts-ignore-next-line
        if (isObject(e.target) && exists(e.target.value)) {
            // eslint-disable-next-line
            // @ts-ignore-next-line
            internalValue.value = e.target.value;
        }
    }
    function set(val) {
        internalValue.value = val;
    }
    return {
        modelValue: internalValue,
        set,
        onNativeInput: onUpdate
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9zYWJsZXMvbW9kZWwvdXNlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUFZLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFPLE1BQU0sS0FBSyxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUEyQnZELE1BQU0sVUFBVSwwQkFBMEIsQ0FJeEMsV0FBcUIsWUFBd0IsRUFBRSxZQUF1QixxQkFBa0M7SUFDeEcsc0JBQXNCO0lBQ3RCLE9BQU87UUFDTCxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUk7UUFDaEIsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUM7U0FDN0I7S0FDRixDQUFDO0FBQ0osQ0FBQztBQWNELE1BQU0sVUFBVSxRQUFRLENBQ3RCLEtBQTRDLEVBQzVDLFdBQXFCLFlBQXdCLEVBQzdDLFlBQXVCLHFCQUFrQztJQUV6RCxNQUFNLGFBQWEsR0FBdUIsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ3JDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFXLENBQUMsQ0FBQyxDQUFDO0lBRTlELFNBQVMsUUFBUSxDQUFDLENBQVE7UUFDeEIsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2QixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEQsMkJBQTJCO1lBQzNCLHVCQUF1QjtZQUN2QixhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUNELFNBQVMsR0FBRyxDQUFDLEdBQU07UUFDakIsYUFBYSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU87UUFDTCxVQUFVLEVBQUUsYUFBYTtRQUN6QixHQUFHO1FBQ0gsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25zdGFudCwgY29uc3RWb2lkLCBGdW5jdGlvbk4sIExhenkgfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nO1xuaW1wb3J0IHsgUHJvcFR5cGUsIHNoYWxsb3dSZWYsIHdhdGNoLCB0b1JlZiwgUmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IGV4aXN0cywgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy9oZWxwZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZU1vZGVsUHJvcHNEZWZpbml0aW9uPFQ+KCk6IHtcbiAgbW9kZWxWYWx1ZToge1xuICAgIHR5cGU6IFByb3BUeXBlPFQ+O1xuICAgIHJlcXVpcmVkOiBmYWxzZTtcbiAgfTtcbiAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiB7XG4gICAgdHlwZTogUHJvcFR5cGU8RnVuY3Rpb25OPFtUXSwgdm9pZD4+O1xuICAgIGRlZmF1bHQ6IExhenk8RnVuY3Rpb25OPFtUXSwgdm9pZD4+O1xuICB9O1xufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VNb2RlbFByb3BzRGVmaW5pdGlvbjxULCBWYWx1ZUtleSBleHRlbmRzIHN0cmluZywgVXBkYXRlS2V5IGV4dGVuZHMgc3RyaW5nPihcbiAgdmFsdWVLZXk6IFZhbHVlS2V5LFxuICB1cGRhdGVLZXk6IFVwZGF0ZUtleVxuKToge1xuICBbSyBpbiBWYWx1ZUtleV06IHtcbiAgICB0eXBlOiBQcm9wVHlwZTxUPjtcbiAgICByZXF1aXJlZDogZmFsc2U7XG4gIH07XG59ICZcbiAge1xuICAgIFtLIGluIFVwZGF0ZUtleV06IHtcbiAgICAgIHR5cGU6IFByb3BUeXBlPEZ1bmN0aW9uTjxbVF0sIHZvaWQ+PjtcbiAgICAgIGRlZmF1bHQ6IExhenk8RnVuY3Rpb25OPFtUXSwgdm9pZD4+O1xuICAgIH07XG4gIH07XG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlTW9kZWxQcm9wc0RlZmluaXRpb248XG4gIFQsXG4gIFZhbHVlS2V5IGV4dGVuZHMgc3RyaW5nID0gJ21vZGVsVmFsdWUnLFxuICBVcGRhdGVLZXkgZXh0ZW5kcyBzdHJpbmcgPSAnb25VcGRhdGU6bW9kZWxWYWx1ZSdcbj4odmFsdWVLZXk6IFZhbHVlS2V5ID0gJ21vZGVsVmFsdWUnIGFzIFZhbHVlS2V5LCB1cGRhdGVLZXk6IFVwZGF0ZUtleSA9ICdvblVwZGF0ZTptb2RlbFZhbHVlJyBhcyBVcGRhdGVLZXkpOiBhbnkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIHJldHVybiB7XG4gICAgW3ZhbHVlS2V5XTogbnVsbCxcbiAgICBbdXBkYXRlS2V5XToge1xuICAgICAgdHlwZTogRnVuY3Rpb24sXG4gICAgICBkZWZhdWx0OiBjb25zdGFudChjb25zdFZvaWQpXG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVc2VNb2RlbFByb3BzPFxuICBULFxuICBWYWx1ZUtleSBleHRlbmRzIHN0cmluZyA9ICdtb2RlbFZhbHVlJyxcbiAgVXBkYXRlS2V5IGV4dGVuZHMgc3RyaW5nID0gJ29uVXBkYXRlOm1vZGVsVmFsdWUnXG4+ID0geyBbSyBpbiBWYWx1ZUtleV0/OiBUIHwgdW5kZWZpbmVkIH0gJiB7IFtLIGluIFVwZGF0ZUtleV06IEZ1bmN0aW9uTjxbVF0sIHZvaWQ+IH07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb2RlbDxUPihwcm9wczogVXNlTW9kZWxQcm9wczxUPik6IE1vZGVsPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1vZGVsPFQsIFZhbHVlS2V5IGV4dGVuZHMgc3RyaW5nLCBVcGRhdGVLZXkgZXh0ZW5kcyBzdHJpbmc+KFxuICBwcm9wczogVXNlTW9kZWxQcm9wczxULCBWYWx1ZUtleSwgVXBkYXRlS2V5PixcbiAgdmFsdWVLZXk6IFZhbHVlS2V5LFxuICB1cGRhdGVLZXk6IFVwZGF0ZUtleVxuKTogTW9kZWw8VD47XG5leHBvcnQgZnVuY3Rpb24gdXNlTW9kZWw8VCwgVmFsdWVLZXkgZXh0ZW5kcyBzdHJpbmcgPSAnbW9kZWxWYWx1ZScsIFVwZGF0ZUtleSBleHRlbmRzIHN0cmluZyA9ICdvblVwZGF0ZTptb2RlbFZhbHVlJz4oXG4gIHByb3BzOiBVc2VNb2RlbFByb3BzPFQsIFZhbHVlS2V5LCBVcGRhdGVLZXk+LFxuICB2YWx1ZUtleTogVmFsdWVLZXkgPSAnbW9kZWxWYWx1ZScgYXMgVmFsdWVLZXksXG4gIHVwZGF0ZUtleTogVXBkYXRlS2V5ID0gJ29uVXBkYXRlOm1vZGVsVmFsdWUnIGFzIFVwZGF0ZUtleVxuKTogTW9kZWw8VD4ge1xuICBjb25zdCBpbnRlcm5hbFZhbHVlOiBSZWY8VCB8IHVuZGVmaW5lZD4gPSBzaGFsbG93UmVmKHByb3BzW3ZhbHVlS2V5XSk7XG4gIHdhdGNoKHRvUmVmKHByb3BzLCB2YWx1ZUtleSksIG5ld1ZhbCA9PiB7XG4gICAgaW50ZXJuYWxWYWx1ZS52YWx1ZSA9IG5ld1ZhbDtcbiAgfSk7XG4gIHdhdGNoKGludGVybmFsVmFsdWUsIG5ld1ZhbCA9PiBwcm9wc1t1cGRhdGVLZXldKG5ld1ZhbCBhcyBUKSk7XG5cbiAgZnVuY3Rpb24gb25VcGRhdGUoZTogRXZlbnQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAvLyBAdHMtaWdub3JlLW5leHQtbGluZVxuICAgIGlmIChpc09iamVjdChlLnRhcmdldCkgJiYgZXhpc3RzKGUudGFyZ2V0LnZhbHVlKSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAvLyBAdHMtaWdub3JlLW5leHQtbGluZVxuICAgICAgaW50ZXJuYWxWYWx1ZS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBzZXQodmFsOiBUKSB7XG4gICAgaW50ZXJuYWxWYWx1ZS52YWx1ZSA9IHZhbDtcbiAgfVxuICByZXR1cm4ge1xuICAgIG1vZGVsVmFsdWU6IGludGVybmFsVmFsdWUsXG4gICAgc2V0LFxuICAgIG9uTmF0aXZlSW5wdXQ6IG9uVXBkYXRlXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIE1vZGVsPFQ+ID0ge1xuICBtb2RlbFZhbHVlOiBSZWY8VCB8IHVuZGVmaW5lZD47XG4gIHNldDogRnVuY3Rpb25OPFtUXSwgdm9pZD47XG4gIG9uTmF0aXZlSW5wdXQ6IEZ1bmN0aW9uTjxbRXZlbnRdLCB2b2lkPjtcbn07XG4iXX0=