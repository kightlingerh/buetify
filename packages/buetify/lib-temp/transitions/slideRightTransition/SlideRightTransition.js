import './slide-right-transition.sass';
import { h, Transition } from 'vue';
export default function SlideRightTransition(_, { attrs, slots }) {
    return h(Transition, { ...attrs, name: 'slide-right', css: true }, slots.default);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVSaWdodFRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNpdGlvbnMvc2xpZGVSaWdodFRyYW5zaXRpb24vU2xpZGVSaWdodFRyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTywrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQWdCLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFbEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQyxDQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFnQjtJQUNqRixPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zbGlkZS1yaWdodC10cmFuc2l0aW9uLnNhc3MnO1xuaW1wb3J0IHsgU2V0dXBDb250ZXh0LCBoLCBUcmFuc2l0aW9uIH0gZnJvbSAndnVlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2xpZGVSaWdodFRyYW5zaXRpb24oXzogYW55LCB7IGF0dHJzLCBzbG90cyB9OiBTZXR1cENvbnRleHQpIHtcbiAgcmV0dXJuIGgoVHJhbnNpdGlvbiwgeyAuLi5hdHRycywgbmFtZTogJ3NsaWRlLXJpZ2h0JywgY3NzOiB0cnVlIH0sIHNsb3RzLmRlZmF1bHQpO1xufVxuIl19