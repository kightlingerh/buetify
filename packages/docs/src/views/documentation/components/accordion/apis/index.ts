import { ComponentApiDescription } from '../../../../../components/apiView';
import { getUseToggleEventsApi, getUseTogglePropsApi } from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Accordion',
		props: getUseTogglePropsApi('is-expanded', false),
		events: getUseToggleEventsApi('is-expanded'),
		slots: [
			{
				name: 'default',
				description: 'Content to display inside accordion',
				props: '-'
			},
			{
				name: 'title',
				description: 'Title',
				props: '-'
			},
			{
				name: 'trigger',
				description: 'Accordion open / close button, has default icon',
				props: '<code>isExpanded: boolean</code>'
			}
		]
	}
];
