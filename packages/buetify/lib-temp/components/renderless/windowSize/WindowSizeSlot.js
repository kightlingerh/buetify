import { defineComponent } from 'vue';
import { useWindowSize } from '../../../composables/windowSize';
export const WindowSizeSlot = defineComponent({
    name: 'window-size',
    setup(_, { slots }) {
        const windowSize = useWindowSize();
        return () => slots.default && slots.default(windowSize.value);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2luZG93U2l6ZVNsb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9yZW5kZXJsZXNzL3dpbmRvd1NpemUvV2luZG93U2l6ZVNsb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUN0QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQztJQUM1QyxJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBQ25DLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHVzZVdpbmRvd1NpemUgfSBmcm9tICcuLi8uLi8uLi9jb21wb3NhYmxlcy93aW5kb3dTaXplJztcblxuZXhwb3J0IGNvbnN0IFdpbmRvd1NpemVTbG90ID0gZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ3dpbmRvdy1zaXplJyxcbiAgc2V0dXAoXywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IHVzZVdpbmRvd1NpemUoKTtcbiAgICByZXR1cm4gKCkgPT4gc2xvdHMuZGVmYXVsdCAmJiBzbG90cy5kZWZhdWx0KHdpbmRvd1NpemUudmFsdWUpO1xuICB9XG59KTtcbiJdfQ==