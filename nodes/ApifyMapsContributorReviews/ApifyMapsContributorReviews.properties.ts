import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		contributorId: context.getNodeParameter('contributorId', itemIndex),
		hl: context.getNodeParameter('hl', itemIndex),
		maxResultsPerContributor: context.getNodeParameter('maxResultsPerContributor', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Review',
				value: 'review',
			},
		],
		default: 'review',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['review'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get reviews by a contributor',
				description: 'Get all reviews written by a contributor, one item per review',
			},
		],
		default: 'get',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Contributor ID',
		name: 'contributorId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 107022004965696773221',
		description: 'The Google Maps contributor ID to fetch reviews for',
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
	},
	{
		displayName: 'Language Code',
		name: 'hl',
		type: 'string',
		default: 'en',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
	},
	{
		displayName: 'Maximum Reviews per Contributor',
		name: 'maxResultsPerContributor',
		type: 'number',
		default: 10,
		typeOptions: { minValue: 1 },
		description: 'How many reviews to return',
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['review'], operation: ['get'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each review',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful review fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each review',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['review'], operation: ['get'], output: ['selected'] },
		},
		options: [
			{ name: 'Contributor Contributions', value: 'contributor_contributions' },
			{ name: 'Contributor ID', value: 'contributor_id' },
			{ name: 'Contributor Level', value: 'contributor_level' },
			{ name: 'Contributor Local Guide', value: 'contributor_local_guide' },
			{ name: 'Contributor Name', value: 'contributor_name' },
			{ name: 'Contributor Points', value: 'contributor_points' },
			{ name: 'Contributor Thumbnail', value: 'contributor_thumbnail' },
			{ name: 'Date', value: 'date' },
			{ name: 'Details', value: 'details' },
			{ name: 'Images', value: 'images' },
			{ name: 'Likes', value: 'likes' },
			{ name: 'Link', value: 'link' },
			{ name: 'Place Info', value: 'place_info' },
			{ name: 'Position', value: 'position' },
			{ name: 'Rating', value: 'rating' },
			{ name: 'Response', value: 'response' },
			{ name: 'Review ID', value: 'review_id' },
			{ name: 'Snippet', value: 'snippet' },
		],
		default: ['contributor_name', 'rating', 'snippet', 'date', 'place_info'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
