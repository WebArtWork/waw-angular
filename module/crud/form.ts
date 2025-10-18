export const NAMEForm = {
	formId: 'NAME',
	title: 'CNAME',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Label',
					value: 'Title',
				},
				{
					name: 'Placeholder',
					value: 'fill NAME title',
				},
			],
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Label',
					value: 'Description',
				},
				{
					name: 'Placeholder',
					value: 'fill NAME description',
				},
				{
					name: 'Textarea',
					value: true,
				},
			],
		},
	],
};
