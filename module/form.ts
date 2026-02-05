export const NAMEForm = {
	formId: 'NAME',
	title: 'CNAME',
	components: [
		{
			name: 'Input',
			key: 'name',
			props: {
				label: 'Name',
				placeholder: 'Enter NAME name...',
				focused: true,
			},
		},
		{
			name: 'Input',
			key: 'description',
			props: {
				label: 'Description',
				placeholder: 'Enter NAME description...',
				type: 'textarea',
			},
		},
	],
};
