export const NAMEFormComponent = {
	formId: 'NAME',
	title: 'CNAME',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill NAME title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill NAME description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
